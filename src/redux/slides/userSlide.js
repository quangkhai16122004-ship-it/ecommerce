import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone:'',
    address:'',
    avatar:'',
    access_token: '',
    id: '',
    isAdmin: false,
    city:''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            // Destructure các trường từ payload. 
            // KHÔNG ĐẶT giá trị mặc định ('') cho các trường này.
            const { name, email, access_token, phone, address, avatar, _id, isAdmin, city } = action.payload
            
            // Logic HỢP NHẤT (Merge): Chỉ gán nếu giá trị mới tồn tại (khác undefined)
            
            if (name !== undefined) state.name = name;
            if (email !== undefined) state.email = email;
            if (phone !== undefined) state.phone = phone;
            if (address !== undefined) state.address = address;
            if (_id !== undefined) state.id = _id;
            if (avatar !== undefined) state.avatar = avatar;
            if (city !== undefined) state.city = city;
            
            // RẤT QUAN TRỌNG: Chỉ cập nhật token khi nó được truyền vào
            if (access_token !== undefined) state.access_token = access_token;
            if (isAdmin !== undefined) state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.id= '';
            state.avatar = '';
            state.access_token = '';
            state.isAdmin=false;
            state.city=''
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer