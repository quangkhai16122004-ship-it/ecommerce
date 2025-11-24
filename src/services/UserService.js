import axios from "axios"

export const loginUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-in`,  // ✅ URL ĐẦY ĐỦ
        data,                                      // ✅ TRUYỀN DATA
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
}