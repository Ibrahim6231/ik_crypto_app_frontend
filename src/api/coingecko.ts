import toast from "react-hot-toast";
import { errorToastOptions } from "../helpers/toastHelpers";
import { Axios } from "./axios";


const reqAllCoinsDetailsLive = async () => {
    try {
        const data = await Axios.get("/user/all-coins")
        return data?.data?.data;
    } catch (err: any) {
        toast.error(err.message || "Coingecko cyrpto request failed", errorToastOptions)
    }
} 



const reqBuyCrypto = async ({crypto, quantity}: any) => {   //skipping detailed type for now, as I have less time for assignment
    try {
        const data = await Axios.post("/user/buy-coin", {crypto, quantity})
        toast.success("Coins Added")
        return data?.data?.data;
    } catch (err: any) {
        toast.error(err.message || "Coingecko cyrpto request failed", errorToastOptions)
    }
} 

const reqUserWallet = async () => {
    try {
        const data = await Axios.get("/user/my-coins-wallet"); //no need to send user id, as it will taken from user authentication middleware
        return data?.data?.data;
    } catch (err: any) {
        toast.error(err.message || "Coingecko cyrpto request failed", errorToastOptions)
    }
} 



export {
    reqAllCoinsDetailsLive,
    reqBuyCrypto,
    reqUserWallet
}