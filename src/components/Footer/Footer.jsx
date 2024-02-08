import './footer.css'
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Footer = () => {
  return (
    <>
    <div className="footer_container">
      <span>© Andrew Dyakov, 2023.</span>
      <div className='footer_socials'>
        <TelegramIcon color='white'/>
        <WhatsAppIcon/>
        <YouTubeIcon/>
      </div>
    </div>
    
    </>
  )
}