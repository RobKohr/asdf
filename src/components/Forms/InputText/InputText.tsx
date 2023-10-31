import { useContext, useEffect, useState } from "react";
import toId from "../../../utils/toId";
import { FormContext } from "../Form/Form";
import "./InputText.scss";
interface InputTextProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  "data-testid"?: string;
}

interface ErrorDetail {
  context: {
    key: string;
  };
  message: string;
}

// function useTraceUpdate(props) {
//   const prev = useRef(props);
//   useEffect(() => {
//     const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
//       if (prev.current[k] !== v) {
//         ps[k] = [prev.current[k], v];
//       }
//       return ps;
//     }, {});
//     if (Object.keys(changedProps).length > 0) {
//       console.log("Changed props:", changedProps);
//     }
//     prev.current = props;
//   });
// }

export default function InputText({ label, name, type, "data-testid": dataTestId, ...htmlProps }: InputTextProps) {
  // useTraceUpdate({ label, name, type, "data-testid": dataTestId, ...htmlProps });
  const [focused, setFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState<string | undefined>("");
  const [error, setError] = useState("");
  const form = useContext(FormContext);
  useEffect(() => {
    if (!form) return;
    if (!form.validationResult?.value) return;

    let updatedError = "";
    const errorDetails = form.validationResult.value.error?.details;
    if (!errorDetails || !errorDetails.length) {
      setError("");
    } else {
      errorDetails.forEach((error) => {
        if (error.context && error.context.key === name) {
          updatedError = error.message;
        }
      });
      setError(updatedError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.validationResult?.value]);

  useEffect(() => {
    setCurrentValue(form.data?.value[name]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.touched?.value?.[name]]);

  const showPlaceholder = (currentValue && !focused) || (!currentValue && focused) || focused || !currentValue;
  const id = toId(form.id + "-" + name);

  return (
    <div className="input-text-component">
      <input
        type={type}
        name={name}
        id={id}
        value={form.data?.value[name]}
        data-testid={dataTestId || id}
        onInput={form.inputChangeHandler}
        onKeyUp={form.inputChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...htmlProps}
      />
      {showPlaceholder && <div className={`placeholder ${focused || form.data?.value[name] ? "focused" : ""}`}>{label}</div>}
      <div className="error">{form.touched && form.touched.value?.[name] && error}&nbsp;</div>
    </div>
  );
}
