import { useContext } from "react";
import toId from "../../../utils/toId";
import { FormContext } from "../Form/Form";
import "./InputSubmit.scss";
interface InputSubmitProps extends React.HTMLAttributes<HTMLInputElement> {}

export default function InputSubmit(props: InputSubmitProps) {
  const form = useContext(FormContext);

  if (form === undefined) {
    return <div>FormContextProvider not found</div>;
  }
  const id = toId(form.id + "-" + props.value);
  return <input type="submit" value="Submit" className="input-submit" data-testid={id} />;
}
