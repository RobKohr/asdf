import UserIcon from "../../assets/icons/user.svg";
import { menuModalActive } from "../MenuModal/MenuModalState";
import "./AccountImage.scss";
export default function AccountImage() {
  return (
    <div className="account-image-component">
      <img
        src={UserIcon}
        className="user-icon clickable"
        data-testid="toggle-account-menu"
        onClick={() => (menuModalActive.value = menuModalActive.value === "account" ? "" : "account")}
      />
    </div>
  );
}
