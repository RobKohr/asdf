import { signal } from "@preact/signals-react";
import { useNavigate } from "react-router-dom";
import { authUserToken } from "../../utils/authUserToken";
import AccountImage from "../AccountImage/AccountImage";
import ActionButton from "../Forms/ActionButton/ActonButton";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import "./Header.scss";

export const belowHeader = signal("");

function toggleSearch() {
  if (belowHeader.value !== "search") {
    belowHeader.value = "search";
    document?.getElementById("search")?.focus();
  } else {
    belowHeader.value = "";
  }
}
export default function Header() {
  const navigate = useNavigate();

  return (
    <div id="header">
      <div className="header-sub">
        <Logo />
      </div>
      <div className="header-sub">
        <span onClick={toggleSearch}>Search</span>
      </div>
      <div className="header-sub">
        {!authUserToken.value && (
          <>
            <ActionButton
              data-testid="action-button-navigate-to-login"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </ActionButton>
            <ActionButton
              data-testid="action-button-navigate-to-register"
              onClick={() => {
                navigate("/auth/register");
              }}
            >
              Register
            </ActionButton>
          </>
        )}
        {authUserToken.value && (
          <>
            <AccountImage />
          </>
        )}
      </div>
      {belowHeader.value && (
        <div className="header-sub below hidden">
          <Search />
        </div>
      )}
    </div>
  );
}
