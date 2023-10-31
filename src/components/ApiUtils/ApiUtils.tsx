import { apiBaseUrl } from "../../config";
import { setLoading } from "../Loading/Loading";

export interface HandleSubmissionProps {
  data: FormData;
  apiPath: string;
  setServerErrors: (value: string[] | undefined) => void;
}

export async function handleSubmission({ data, apiPath, setServerErrors }: HandleSubmissionProps) {
  setLoading(true);
  const response = await postData(apiPath, data);
  setLoading(false);
  if (response.success === false) {
    setServerErrors(createserverErrors(response));
    return false;
  } else {
    setServerErrors(undefined);
    return response;
  }
}

export interface ServerErrorsProps {
  serverErrors: string[] | undefined;
}

export function ServerErrors({ serverErrors }: ServerErrorsProps) {
  return (
    <>
      {serverErrors && (
        <div className="error-message">
          {serverErrors?.map((error) => (
            <div>{error}</div>
          ))}
        </div>
      )}
    </>
  );
}

export async function postData(apiPath: string, data: any) {
  const response = await fetch(apiBaseUrl + apiPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getData(apiPath: string) {
  const response = await fetch(apiBaseUrl + apiPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.body;
  try {
    return await response.json();
  } catch (e) {
    console.error(e, response.body);
  }
}

export function createserverErrors(response: any) {
  if (response.message !== "Validation failed" || !response?.data?.details?.length) {
    return [response.message];
  }
  return response.data.details.map((detail: any) => {
    return `${detail.message} `;
  });
}
