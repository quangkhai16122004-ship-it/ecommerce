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
