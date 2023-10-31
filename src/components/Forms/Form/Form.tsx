import { Signal, useSignal } from "@preact/signals-react";
import Joi from "joi";
import { createContext } from "react";
import { Validator } from "../../../../server/common/validation";

export type FormValue = string;

export interface FormData {
  [key: string]: FormValue;
}

export interface TouchedData {
  [key: string]: boolean;
}
export interface FormContextProperties {
  data: undefined | Signal<FormData>;
  touched: undefined | Signal<TouchedData>;
  inputChangeHandler: (e) => void;
  validationResult: undefined | Joi.ValidationResult<any>;
  id: string;
}

export const FormContext = createContext<FormContextProperties>({
  data: undefined,
  touched: undefined,
  // set: () => {},
  validationResult: undefined,
  // touched: {},
  // setFieldValue: () => {},
  inputChangeHandler: () => () => {},
  id: "",
});

// example form props:
// initialData={initialData} validation={loginValidation} onSubmit={onSubmit} id="login-form"

export interface FormProps {
  children: React.ReactNode;
  initialData: FormData;
  validation?: Validator;
  onSubmit: (data: FormData) => void;
  id: string;
}

export default function Form({ children, initialData, validation, id, onSubmit }: FormProps) {
  const data = useSignal<FormData>(initialData);
  const touched = useSignal<TouchedData>({});
  const validationResult = useSignal<Joi.ValidationResult<any> | undefined>(undefined);

  async function validate(): Promise<boolean> {
    return new Promise(function (resolve) {
      if (!validation || !validationResult) {
        return resolve(true);
      }
      validation(data.value).then((result) => {
        validationResult.value = result;
        console.log("test", result);
        if (result.error) {
          return resolve(false);
        } else {
          return resolve(true);
        }
      });
    });
  }

  const inputChangeHandler = (e): void => {
    const { name, value } = e.target;
    form.data.value = { ...form.data.value, [name]: value };
    form.touched.value = { ...form.touched.value, [name]: true };
    validate();
  };

  const form = {
    data,
    touched,
    inputChangeHandler,
    validationResult,
    // touched: {},
    // setFieldValue: () => {},
    // inputChangeHandler: () => () => {},
    id: "",
  };
  validate();

  function markAllFieldsAsTouched(): void {
    const touchedData: TouchedData = {};
    for (const key in initialData) {
      touchedData[key] = true;
    }
    form.touched.value = touchedData;
  }

  async function initalSubmissionManager(e): Promise<void> {
    e.preventDefault();
    markAllFieldsAsTouched();
    console.log("before validate");
    validate().then((result) => {
      console.log("after validate", result);
      if (result) {
        onSubmit(form.data.value);
      }
    });
  }
  return (
    <FormContext.Provider value={form}>
      <form id={`form-${id}`} onSubmit={initalSubmissionManager}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
