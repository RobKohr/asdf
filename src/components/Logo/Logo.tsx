import { Link } from "react-router-dom";
import LogoIcon from "../../assets/icons/logo.png";
import MenuIcon from "../../assets/icons/menu.svg";
import "./Logo.scss";
export default function Logo() {
  return (
    <div className="logo-component">
      <Link to="/">
        <img src={MenuIcon} />
        <h1 className="logo-text inline-block">
          <span className="big-letter">A</span>tlantis<span className="big-letter">G</span>at
        </h1>
        <img className="top-icon logo-image" src={LogoIcon} />
      </Link>
    </div>
  );
}
