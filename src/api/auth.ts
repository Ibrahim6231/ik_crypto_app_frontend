import toast from "react-hot-toast";
import { Axios } from "./axios";
import { LocalStorageKeys } from "../enums/appEnum";
import { errorToastOptions } from "../helpers/toastHelpers";

const AUTH_URL = "auth";
const END_POINT = {
    register: `${AUTH_URL}/register`,
    login: `${AUTH_URL}/login`,
}

const registerApi = async ({ newUser }: any) => {

    try {
        const data = await Axios.post(END_POINT.register, { user: newUser });
        if (data) {
            const dataObj = data?.data?.data
            const { user: savedUser, token } = dataObj;
            if (savedUser && token) {
                localStorage.setItem(LocalStorageKeys.USER, savedUser);
                localStorage.setItem(LocalStorageKeys.JWT, token);
                return { user: savedUser, token };
            }
        }
    } catch (err: any) {
        toast.error(err?.response?.data?.message || err.message, errorToastOptions)
    }
}

const loginApi = async ({ loginInfo }: any) => {

    try {
        const data = await Axios.post(END_POINT.login, { user: loginInfo });
        if (data) {
            const dataObj = data?.data?.data
            const { user: savedUser, token } = dataObj;
            if (savedUser && token) {
                localStorage.setItem(LocalStorageKeys.USER, savedUser);
                localStorage.setItem(LocalStorageKeys.JWT, token);
                toast.success("Login successful !")
                return { user: savedUser, token };
            }
        }
    } catch (err: any) {
        toast.error(err?.response?.data?.message || err.message, errorToastOptions)
    }
}

export {
    registerApi,
    loginApi,
}