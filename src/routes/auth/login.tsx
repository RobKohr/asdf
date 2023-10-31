import { useState } from "react";
import { redirect } from "react-router-dom";
import { loginValidation } from "../../../server/validation/auth.validation";
import { ServerErrors, handleSubmission } from "../../components/ApiUtils/ApiUtils";
import Form from "../../components/Forms/Form/Form";
import InputSubmit from "../../components/Forms/InputSubmit/InputSubmit";
import InputText from "../../components/Forms/InputText/InputText";
import { closeMenuModal } from "../../components/MenuModal/MenuModalState";
import { authUserToken } from "../../utils/authUserToken";

export default function Login() {
  const [serverErrors, setServerErrors] = useState<string[] | undefined>();
  const apiPath = "auth/login";
  const initialData = {
    emailOrUsername: "",
    password: "",
  };

  async function onSubmit(data: FormData) {
    const response = await handleSubmission({
      data,
      apiPath,
      setServerErrors,
    });
    if (response?.success === true && response.token) {
      authUserToken.value = response.token;
      const loginMessage = "User logged in successfully.";
      closeMenuModal();
      redirect("/?notification=" + encodeURIComponent(loginMessage));
    }
  }

  return (
    <div className="narrow-content page-auth-login">
      Login form
      <Form initialData={initialData} validation={loginValidation} onSubmit={onSubmit} id="login-form">
        <ServerErrors serverErrors={serverErrors} />
        <InputText label="Username" name="emailOrUsername" type="text" />
        <InputText label="Password" name="password" type="password" />
        <InputSubmit value="Login" />
      </Form>
    </div>
  );
}
