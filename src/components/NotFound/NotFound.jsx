import './not_found.scss'
import { useSelector } from 'react-redux';

export const NotFound = () => {
  const langEn = useSelector((state) => state.langEn);
  return (
    <>
    <div className='not_found_page'>
          <span>{langEn ? '404 Page Not Found' : '404 Cтраница не найдена'}</span>
          <img alt='not-found' src='https://em-content.zobj.net/source/twitter/348/frowning-face_2639-fe0f.png'></img>
    </div>
    </>
  )
}