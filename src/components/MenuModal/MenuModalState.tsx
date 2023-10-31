import { signal } from "@preact/signals-react";

export const menuModalActive = signal("");
export function closeMenuModal() {
  menuModalActive.value = "";
}
