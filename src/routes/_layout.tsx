import { Outlet } from "react-router-dom";
import Header, { belowHeader } from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import { MenuModal } from "../components/MenuModal/MenuModal";

export default function Layout() {
  return (
    <div id="app">
      <Loading />
      <MenuModal />
      <Header />
      <div id="content-container" className={`${belowHeader.value ? "headerBelowShown" : ""}`}>
        <div id="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
