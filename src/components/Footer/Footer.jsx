import './footer.scss'
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

export const Footer = ({lanEn}) => {
  return (
    <>
    <div className="footer__container">
      <span>{lanEn ? 'Development - © Andrew Dyakov, 2023-2024' : 'Разработка - © Андрей Дьяков, 2023-2024'}</span>
      <div>
        <Link to='/about'>{lanEn ? 'About project and its creator' : 'О проекте и создателе'}</Link>
        <Link to='/privacy-policy'>{lanEn ? 'Privacy Policy and Rules' : 'Политика конфидециальности и правила'}</Link>
      </div>
    </div>
    
    </>
  )
}