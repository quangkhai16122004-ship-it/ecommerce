import axios from "axios";
import { axiosJwt } from "./UserService";

export const getAllProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`,
      {},
      {
        
        withCredentials: true   // QUAN TRỌNG
      }
    );
    return res.data;

}

export const crateProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`,data,
      {},
      {
        
        withCredentials: true   // QUAN TRỌNG
      }
    );
    return res.data;

}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/details/${id}`,
      {},
      {
        
        withCredentials: true   // QUAN TRỌNG
      }
    );
    return res.data;

}

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJwt.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`,data,
      {},
      {
        withCredentials: true,
        headers: {
        token: `Bearer ${access_token}`,   // nhớ sửa Beare → Bearer
      }
      }
    );
    return res.data;

}

