import music from "/src/assets/media/Tsundere_Head_Empty.mp3";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <audio controls className="footer__audio" src={music} />
      <p className="footer__text">
        &copy; 2025 Amyxylu Innovations | All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
