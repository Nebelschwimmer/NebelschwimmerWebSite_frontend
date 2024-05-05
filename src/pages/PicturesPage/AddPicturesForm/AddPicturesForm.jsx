import { useState } from "react";
import { Spinner } from "../../../components/Spinner/Spinner";
import { useForm } from "react-hook-form";
import cn from "classnames";
import './addPictures.scss'
import CloseIcon from '@mui/icons-material/Close';


export const AddPicturesForm = ({langEn}) => {

const [showSpinner, setShowSpinner] = useState(false);
const [previews, setPreviews] = useState([])
const [selectedFiles, setSelectedFiles] = useState([]);

const [, addPicturesMutation] = useMutation(ADD_PICTURES);


const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

const picturesFileRegister = register("file__pictures", {
  required: 'Выберите файл'
});



const onImgFileAdding = (e) => {
  const findImgFiles = e.target.files;
  const filesArray = Array.from(findImgFiles); // Convert FileList to array

  setSelectedFiles((prevSelectedFiles) => [
    ...prevSelectedFiles,
    ...filesArray,
  ]);
  
  


  Promise.all(filesArray.map(file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (e) => {
        reject(e);
      };
      reader.readAsDataURL(file);
    });
  })).then(newPictures => {
    setPreviews([...previews, ...newPictures]);
  }).catch(error => {
    console.error("Error reading file:", error);
  });
};



const onPicturesSend = async (data) => {
  setShowSpinner(true); // Show spinner while processing

  const formData = new FormData();
  formData.append("author", data.author);
  formData.append("name", data.name);
  selectedFiles.forEach((file, index) => {
    formData.append(`file__pictures_${index}`, file);
  });
  formData.append("tags", data.tags);

  console.log(formData)
  try {
    const { data } = await addPicturesMutation({
      variables: {
        files: formData.getAll("file__pictures"), // Pass the files array directly
        author: data.author,
        name: data.name,
        tags: data.tags,
      },
    });


    console.log("Picture added:", data);
  } catch (error) {
    console.error("Error adding picture:", error);
  } finally {
    setShowSpinner(false); // Hide spinner after processing
  }
};
  console.log(selectedFiles)

  return(
    <>
    <div className="add__music__container">
      <h1>{langEn ? 'Add New Picture' : 'Добавить картинку'}</h1>
          {/*Cекция для добавления музыки из файла  */}
        <form onSubmit={handleSubmit(onPicturesSend)}>
          <section className="add__music__file__input__container">
                <div className="add__music__file__input__top">
                  <span>
                    {langEn ? 'Choose file(s) ' : 'Выберите файл(ы)'}<span className='auth_req'> *</span></span>
                  <span>{langEn ? 'Your file must be in .jpg, .png or .webp  extension and not exceed 5 MB' 
                  : 'Ваш файл должен быть в формате .jpg, .png or .webp и не превышать размером 5 Мб'}</span>
                </div>
                <div className="add__music__file__input__bottom">
                  <label className="add__music__file__input__label">
                    {langEn ? 'Add file(s)' : 'Добавить файл(ы)'}
                      <input
                      type="file"   
                      multiple="multiple"
                      {...picturesFileRegister}
                      onInput={onImgFileAdding}
                      accept="image/*"/>
                  </label>
                </div>
              
                <div>
                  <div className="add__pictures__previews__container"> 
                  {previews.length !==0 && previews.map((pr, i) => {
                      const handleRemovePreview = () => {
                        const newPreviews = previews.filter((_, f) => f !== i);
                        setPreviews([...newPreviews]);
                        setSelectedFiles((prevSelectedFiles) =>
                        prevSelectedFiles.filter((_, f) => f !== i)
                      );
                        
                      }
                      return(
                        <>
                        <div onClick={()=>{handleRemovePreview()}} className="add__pictures__preview__wrapper">
                          
                            <img key={i} src={pr}/>
                        </div>
                        </>
                      )
                    })
                  }

                  </div>
                  <div className="add__music__submit__btn__wrapper">
                    {!showSpinner ?
                      <button type="submit"
                        
                        className="add__music__submit__btn"
                        >{langEn ? 'Send' : "Отправить"}
                      </button>
                      :
                        <span><Spinner/></span>
                      }
                  </div>
                </div>
            </section>
          </form>
    </div>
    </>
  )
}