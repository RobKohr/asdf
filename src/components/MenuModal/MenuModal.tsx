import "./MenuModal.scss";
import { menuModalActive } from "./MenuModalState";
import X from "./x.svg";
export function MenuModal() {
  return (
    <>
      {/* <div id="menu-modal">hello {menuModalActive.value}</div> */}
      {menuModalActive.value && (
        <div id="menu-modal" className={menuModalActive.value}>
          <div
            className="x-container clickable"
            onClick={() => {
              menuModalActive.value = "";
            }}
          >
            <X />
          </div>
          {/* <Show when={menuModalActive() === "account"}>
          <MenuModalAccount />
        </Show> */}
          {/* {menuModalActive.value === "login" && <Register />}
          {menuModalActive.value === "signin" && <SignIn />} */}
        </div>
      )}
    </>
  );
}
