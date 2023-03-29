import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addItem: (state, action) => {
      const contains = state.cartItems.find(
        item => item.id == action.payload.id,
      );

      if (contains) {
        contains.total += 1;
      } else {
        state.cartItems.push({...action.payload, total: 1});
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id != action.payload,
      );
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id == action.payload);

      cartItem.total += 1;
      state.totalItems += 1;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id == action.payload);

      cartItem.total -= 1;
      state.totalItems -= 1;
    },
    calculateSubtotal: state => {
      let amount = 0;
      let items = 0;
      state.cartItems.map(item => {
        items += item.total;
        amount += item.total * parseInt(item.price);
      });
      state.totalItems = items;
      state.totalAmount = amount;
    },
  },
});

export const {
  clearCart,
  setCartItems,
  addItem,
  removeItem,
  increase,
  decrease,
  calculateSubtotal,
} = cartSlice.actions;

export default cartSlice.reducer;
