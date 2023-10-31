import { logout } from "../../utils/authUserToken";

export default function Logout() {
  logout();
  return (
    <>
      <h3>User logged out</h3>
      <p>
        Click <a href="/auth/login">here</a> to login again.
      </p>
    </>
  );
}
