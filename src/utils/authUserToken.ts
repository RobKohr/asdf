import { signal } from '@preact/signals-react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";



export const authUserToken = signal("");

export function saveAuthUserToken(token: string) {
    const set = Cookies.set("authUserToken", token);
    authUserToken.value = token;
    const get = Cookies.get("authUserToken");
    console.log("get", get, "set", set);
}

export function setAuthUserTokenFromCookie() {
    const token = Cookies.get("authUserToken");
    if (token) {
        authUserToken.value = (token);
        getTokenData();
    }
}

export function getTokenData() {
    const token = authUserToken.value;
    const decoded = jwtDecode(token);
    return decoded;
}

export function logout() {
    Cookies.remove("authUserToken");
    authUserToken.value = "";
}