import './footer.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const Footer = () => {
  const langEn = useSelector((state) => state.langEn);
  return (
    <>
    <div className="footer__container">
      <span>{langEn ? 'Development - © Andrew Dyakov, 2023-2024' : 'Разработка - © Андрей Дьяков, 2023-2024'}</span>
      <div>
        <Link to='/about'>{langEn ? 'About project' : 'О проекте'}</Link>
        <Link to='/privacy-policy'>{langEn ? 'Privacy Policy and Rules' : 'Политика конфидециальности и правила'}</Link>
      </div>
    </div>
    
    </>
  )
}