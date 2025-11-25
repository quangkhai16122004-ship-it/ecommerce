import axios from "axios"

export const axiosJwt = axios.create({
    withCredentials: true
});


export const loginUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-in`,  // ✅ URL ĐẦY ĐỦ
        data,                                      // ✅ TRUYỀN DATA
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
}

export const signupUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-up`,  // ✅ URL ĐẦY ĐỦ
        data,                                      // ✅ TRUYỀN DATA
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJwt.get(
        `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,{
            headers: {
                token: `Bearer ${access_token}`,
            }
        }
    );
    return res.data;
}

export const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/refresh-token`,
      {},
      {
        withCredentials: true   // QUAN TRỌNG
      }
    );
    return res.data;
  } catch (error) {
    console.log("Refresh token error:", error.response?.data);
  }
};

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`,
      {},
      {
        
        withCredentials: true   // QUAN TRỌNG
      }
    );
    return res.data;

}

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJwt.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    data,
    {
      withCredentials: true,
      headers: {
        token: `Bearer ${access_token}`,   // nhớ sửa Beare → Bearer
      }
    }
  );
  return res.data;
};

