import classes from "./style.module.css";
import logo from "../../img/logo.png"

export default function Header() {
  return (
    <header>
      <h1 className={classes.title}>
        <a /*className={classes.}*/>
          <img className={classes.logo} src={logo} al="logo" />
        </a>
      </h1>
      <nav>
        <ul>
          <li>Accueil</li>
          <li>Profil</li>
          <li>Réglages</li>
          <li>Communauté</li>
        </ul>
      </nav>
    </header>
  );
}
