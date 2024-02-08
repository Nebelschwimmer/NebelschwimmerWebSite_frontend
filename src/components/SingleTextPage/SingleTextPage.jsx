
import { useState, useEffect } from 'react';
import { SingleText } from '../SigleText/SingleText';
import './textCard.css'
import { useParams } from 'react-router-dom';
import { getTextByID } from '../../utils/api_texts';


export const SingleTextPage = ({langEn, setLangEn, showModal, setShowModal, currentUser}) => {

const [singleText, setSingleText] = useState(undefined)  
const id = useParams()
const textID = id?.textID



// Getting text by ID
useEffect(()=>  { 
  getTextByID(textID)
  .then((res) => {
    setSingleText(res);
  });
}, [])




  return (
    
          singleText !== undefined ?
            <SingleText
            singleText={singleText}
            setLangEn={setLangEn}
            key={textID}
            _id={textID}
            setSingleText={setSingleText}
            langEn={langEn}
            showModal={showModal}
            setShowModal={setShowModal}
            currentUser={currentUser}
            />
          :
          "Loading"
        )
      

  
}