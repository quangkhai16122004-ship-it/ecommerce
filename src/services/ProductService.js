import axios from "axios";
import { axiosJwt } from "./UserService";

export const getAllProduct = async (search, limit) => {
    let url = `${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`;

    if (search && search.trim() !== '') {
        url += `&filter=name&search=${search}`;
    }
    console.log("API Request URL:", url); 
    
    const res = await axios.get(url);
    return res.data;
};

export const getProductType = async (type, page, limit) => {
    let url = `${process.env.REACT_APP_API_URL}/product/get-all?`;

    if (type) {
        url += `&filter=type&search=${type}&limit=${limit}&page=${page}`;
    }
    console.log("API Request URL:", url); 
    
    const res = await axios.get(url);
    return res.data;
};

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

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJwt.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`,
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

export const deleteManyProduct = async (ids, access_token) => {
  const res = await axiosJwt.delete(
    `${process.env.REACT_APP_API_URL}/product/delete-many`,
    {
      data: { ids },
      withCredentials: true,
      headers: {
        token: `Bearer ${access_token}`,
      }
    }
  );
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};





