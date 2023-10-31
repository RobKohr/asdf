import { useState } from "react";
import { useNavigation } from "react-router-dom";
import { registrationValidation } from "../../../server/validation/auth.validation";
import { ServerErrors, handleSubmission } from "../../components/ApiUtils/ApiUtils";
import Form from "../../components/Forms/Form/Form";
import InputSubmit from "../../components/Forms/InputSubmit/InputSubmit";
import InputText from "../../components/Forms/InputText/InputText";
import { closeMenuModal } from "../../components/MenuModal/MenuModalState";

export default function Register() {
  const navigate = useNavigation();
  const [serverErrors, setServerErrors] = useState<string[] | undefined>();
  const apiPath = "auth/register";
  const initialData = {
    email: "testfish@gmail.com",
    username: "testfish",
    password: "asdfasdfasdf",
    retype_password: "testfish",
  };

  async function onSubmit(data: FormData) {
    const success = await handleSubmission({
      data,
      apiPath,
      setServerErrors,
    });
    if (success) {
      const loginMessage = "Registration successful. Please login.";
      closeMenuModal();
      navigate("/auth/login?notification=" + encodeURIComponent(loginMessage));
    }
  }
  const id = "register-form";
  return (
    <div className="narrow-content page-auth-register">
      <Form initialData={initialData} validation={registrationValidation} onSubmit={onSubmit} id={id}>
        <ServerErrors serverErrors={serverErrors} />
        <InputText label="Username" name="username" type="text" />
        <InputText label="Email" name="email" type="email" />
        <InputText label="Password" name="password" type="password" />
        <InputText label="Retype Password" name="retype_password" type="password" />
        <InputSubmit value="Register" />
      </Form>
    </div>
  );
}
