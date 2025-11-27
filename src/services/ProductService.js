import axios from "axios";

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

