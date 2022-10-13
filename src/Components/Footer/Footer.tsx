import styles from "./Footer.module.css";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
interface ifooterIcons {
   anchor: string,
   icon: any,
}
const footerIcons: ifooterIcons[] = [
   {
      anchor: "https://github.com/Balkov94",
      icon: <GitHubIcon />
   },
   {
      anchor: "https://www.linkedin.com/in/nikola-balkov-413010162/",
      icon: <LinkedInIcon />
   },
   {
      anchor: "tel:+359899197487",
      icon: <LocalPhoneIcon />
   },
   {
      anchor: "mailto:balkov_94@abv.bg",
      icon: <EmailIcon />
   },

]

function Footer() {
   return (
      <div className={styles.footer}>
         <p className={styles.footerTextContainer}>
            &copy; webpage created with  &#9825; by  Nikola Balkov 2022
         </p>
         <div className={styles.iconsContainer}>
            {
               footerIcons.map(item => {
                  return (
                     <a key={item.anchor} className={styles.iconsStyles}
                        href={item.anchor}
                        target="_blank" rel="noreferrer">
                        {item.icon}</a>
                  )
               })
            }

         </div>
      </div>
   );
}

export default Footer;