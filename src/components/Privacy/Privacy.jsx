import { Link } from "react-router-dom"
import { Backbutton } from "../BackButton/BackButton"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';


export const Privacy = () => {

  const langEn = useSelector((state) => state.langEn);

  const navigate = useNavigate()
  return(
    <>
    <span onClick={()=>{navigate(-1)}}>
      <Backbutton></Backbutton>
    </span>
    <h1>{langEn ? 'Privacy Policy and Rules of Use' : "Политика конфиденциальности и правила пользования"}</h1>
    { langEn ?
    <div>
    <b>1. Data collection upon registration</b>
      <div>
        <p>We use Firebase Authentication platform, a product of Google, for registration on this website. </p>
        <p>You can view the privacy policy of this platform <Link style={{color:'darkorange'}} to='https://firebase.google.com/support/privacy?hl=ru'>here.</Link></p>
        <p>Since the information entered during registration (email address and password) does not allow the user to be identified as an individual or legal entity, this information does not constitute the collection of personal data.
        </p>
        <p>However, we undertake not to use your email to send promotional messages or pass it on to third parties.</p>
      </div>
      <b>2. ЗCopyright protection</b>
      <div>
        <p>When posting texts and musical works, the user undertakes to indicate reliable information related to their authorship, namely:</p>
        <p>indicate the real title of the musical work and/or text, as well as the real name of the author.
        </p>
      </div>
      <b>3.Content restrictions</b>
      <div>
        <p>Posting content related to nudity is prohibited; the use of obscene language in the titles of works, their content and in comments, as well as insults in comments, placement of advertising and illegal content.
        </p>
        <p>If these rules are not followed, the site administrator will be forced to delete the content that does not comply with the rules, or, in case of numerous violations, the user account</p>
      </div>
    </div>
    :
    <div>
      <b>1. Сбор данных при регистрации</b>
      <div>
        <p>Для регистрации на сайте используется платформа Firebase Authentication, продукт компании Google. </p>
        <p>С политикой конфиденциальности данной платформы Вы можете ознакомиться по <Link style={{color:'darkorange'}} to='https://firebase.google.com/support/privacy?hl=ru'>ссылке.</Link ></p>
        <p>Поскольку вводимая при регистрации информация (адрес электронной почты и пароль) не позволяют идентифицировать пользователя как физическое или юридическое лицо,
        данная информация не является сбором персональных данных.
        </p>
        <p>Тем не менее, мы обязуемся не использовать вашу электронную почту для рассылки рекламных сообщений либо передавать ее третьим лицам.</p>
      </div>
      <b>2. Защита авторских прав</b>
      <div>
        <p>При размещении текстов и музыкальных произведений пользователь обязуется указывать достоверные сведения, относящиеся к их авторству, а именно: </p>
        <p>указывать реальное название музыкального произведния и/или текста, а также подлинное имя автора.
        </p>
      </div>
      <b>3. Содержание публикуемых материалов</b>
      <div>
        <p>Запрещено размещение контента, связанного с демонстрацией наготы; использование обсценной лексики в названиях произведений, их содержании и в комментариях, 
          а также оскорбления в комментариях, размещение рекламного и нелегального контента.
        </p>
        <p>При несоблюдении данных правил администратор сайта будет вынужден удалить несоответствующий правилам контент, либо, при многочисленных наружениях, учетную запись пользователя</p>
      </div>
    </div>
    }
    </>
  )
}