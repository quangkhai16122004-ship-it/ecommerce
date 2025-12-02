import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems:[],
    shippingAddress:{},
    paymentMethod:'',
    itemsPrice:0,
    shippingPrice:0,
    taxPrice:0,
    totalPrice:0,
    user:'',
    isPaid: false,
    paidAt:'',
    isDelivered: false,
    deliveredAt:'',
}

const calculateTotals = (state) => {
    const itemsPrice = state.orderItems.reduce((sum, item) => sum + (item.price || 0) * (item.amount || 0), 0);
    
    const shippingPrice = itemsPrice > 5000000 ? 0 : 30000;
    const taxPrice = itemsPrice * 0.1;
    
    state.itemsPrice = itemsPrice;
    state.shippingPrice = shippingPrice;
    state.taxPrice = taxPrice;
    state.totalPrice = itemsPrice + shippingPrice + taxPrice;
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct:(state, action)=>{
            const { orderItem } = action.payload
            const itemOrder = state.orderItems.find((item) => item.product === orderItem.product) 
            
            if(itemOrder){
                itemOrder.amount += orderItem.amount
            }else{
                state.orderItems.push(orderItem)
            }
            calculateTotals(state);
        },

        updateOrderQuantity: (state, action) => {
            const { productId, quantity } = action.payload; 
            const itemIndex = state.orderItems.findIndex((item) => item.product === productId);

            if (itemIndex > -1) {
                state.orderItems[itemIndex].amount = quantity;
                calculateTotals(state); 
            }
        },

        removeOrderProduct:(state, action)=>{
            const { idProduct } = action.payload
            
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct)
            calculateTotals(state); 
        }
    },
})

export const { addOrderProduct, updateOrderQuantity, removeOrderProduct } = orderSlice.actions

export default orderSlice.reducer