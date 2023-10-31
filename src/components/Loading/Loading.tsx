import { signal } from "@preact/signals-react";
import { useEffect, useState } from "react";
import "./Loading.scss";
export const loading = signal(false);
export const loadingDelay = signal(1000);

export function setLoading(state: boolean, delay = 1000) {
  loading.value = state;
  loadingDelay.value = delay;
}

export default function Loading() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!loading.value) {
      return setShowLoading(false);
    }
    setTimeout(() => {
      setShowLoading(loading.value);
    }, loadingDelay.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading.value]);
  return (
    <>
      {showLoading && (
        <div className="loading-component">
          <div className="loading"></div>
        </div>
      )}
    </>
  );
}

// interface Inputs extends NodeListOf<HTMLInputElement> {}

// export function setLoadingState(state: boolean) {
//   const inputs: Inputs = document.querySelectorAll("input, button, textarea, select");

//   // disable all inputs, buttons, textareas, etc when loading
//   // this prevents the user from interacting with the page while loading
//   if (state === true) {
//     inputs.forEach((input) => {
//       input.disabled = state;
//     });
//   } else {
//     inputs.forEach((input) => {
//       input.disabled = state;
//     });
//   }

//   setLoading(state);
// }
