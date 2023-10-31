import { useNavigate } from "@solidjs/router";
import ActionButton from "../../Forms/ActionButton/ActonButton";
import { menuModalActive } from "../MenuModalState";

export default function MenuModalAccount() {
  const navigate = useNavigate();
  return (
    <>
      {/* <ActionButton
        data-testid="header-sub-register"
        onClick={() => {
          setMenuModalActive("login");
        }}
      >
        Register
      </ActionButton>
      <ActionButton
        data-testid="header-sub-login"
        onClick={() => {
          setMenuModalActive("signin");
        }}
      >
        Login
      </ActionButton> */}
      <ActionButton
        data-testid="header-sub-navigate-to-logout"
        onClick={() => {
          navigate("/auth/logout");
          menuModalActive.value = "";
        }}
      >
        Logout
      </ActionButton>
    </>
  );
}
