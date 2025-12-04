import axios from "axios";
import { axiosJwt } from "./UserService";

export const createOrder = async ( data, access_token) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/create`,
        data, 
        {     
            withCredentials: true,
            headers: {
                token: `Bearer ${access_token}`, 
            }
        }
    );
    return res.data;
}

export const getAllOrder = async (access_token) => {
    const res = await axiosJwt.get(
        `${process.env.REACT_APP_API_URL}/order/getAll`,
        { 
            headers: {
                token: `Bearer ${access_token}`,
            }
        }
    );
    return res.data;
}