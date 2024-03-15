import { useState } from "react";
import { Spinner } from "../../../components/Spinner/Spinner";
import { useForm } from "react-hook-form";
import cn from "classnames";
import './addPictures.scss'
import CloseIcon from '@mui/icons-material/Close';

export const AddPicturesForm = ({langEn}) => {

const [showSpinner, setShowSpinner] = useState(false);
const [previews, setPreviews] = useState([])



const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

const picturesFileRegister = register("file__pictures", {
  required: 'Выберите файл'
});

let reader = new FileReader();
const filesArray = [];


const onImgFileAdding = (e) => {
  const findImgFiles = e.target.files;
  console.log(findImgFiles)
  filesArray.push(findImgFiles);
  
  for (let i = 0; i < filesArray[0].length; i++) {
    reader.readAsDataURL(filesArray[0][i]);
    reader.onload = e => {
    previews.push(e.target.result);
    setPreviews([...previews]);
    } 
  }
}



const onPicturesSend = async (data) => {

}


  return(
    <>
    <div className="add__music__container">
      <h1>{langEn ? 'Add New Track' : 'Добавить музыку'}</h1>
          {/*Cекция для добавления музыки из файла  */}
        <form onSubmit={handleSubmit(onPicturesSend)}>
          <section className="add__music__file__input__container">
                <div className="add__music__file__input__top">
                  <span>
                    {langEn ? 'Choose file(s) ' : 'Выберите файл(ы)'}<span className='auth_req'> *</span></span>
                  <span>{langEn ? 'Your file must be in .mp3 extension and not exceed 20 MB' 
                  : 'Ваш файл должен быть в формате mp3 и не превышать размером 20 Мб'}</span>
                </div>
                <div className="add__music__file__input__bottom">
                  <label className="add__music__file__input__label">
                    {langEn ? 'Add file(s)' : 'Добавить файл(ы)'}
                      <input
                      type="file"   
                      multiple
                      {...picturesFileRegister}
                      onInput={onImgFileAdding}
                      accept="image/*"/>
                  </label>
                </div>
              
                <div>
                  <div className="add__pictures__previews__container"> 
                  {previews.length !==0 && previews.map((pr, i) => {
                      const handleRemovePreview = () => {
                        const newPreviews = previews.filter((f, j) => j !== i);
                        setPreviews([...newPreviews]);
                        console.log(filesArray)
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