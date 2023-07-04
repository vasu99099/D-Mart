import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const location = JSON.parse(localStorage.getItem("d_preferstore"));

export const cartAsync = createAsyncThunk("cartAsync", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/cart`);
console.log(response.data)
  return response.data;
});

export const AddtoCartAsync = createAsyncThunk(
  "AddtoCartAsync",
  async (data) => {
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_API_DOMAIN}/cart`,
      headers: {
        ContentType: "application/json",
      },
      data: data.API,
    };

    const response = await axios(config);
    return data.product;
  }
);

export const updateCartAsync = createAsyncThunk(
  "updateCartAsync",
  async (data) => {
    const config = {
      method: "PUT",
      url: `${process.env.REACT_APP_API_DOMAIN}/cart`,
      headers: {
        ContentType: "application/json",
      },
      data: data.API,
    };
    const response = await axios(config);
    return data.product;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      cart: [],
    },
  },
  reducers: {
    resetCart: (state) => {
      console.log(state.value, "before");
      state.value = [];
      console.log(state.value, "after");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cartAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });
    builder.addCase(cartAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // update to cart

    builder.addCase(updateCartAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCartAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.value.findIndex(
        (product) =>
          product.storeProduct.Product_id ===
          action.payload.storeProduct.Product_id
      );
      if (action.payload.quantity === 0) {
        state.value.splice(index, 1);
      } else {
        state.value[index].quantity = action.payload.quantity;
      }
    });
    builder.addCase(updateCartAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //add to cart

    builder.addCase(AddtoCartAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddtoCartAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value.push(action.payload);
    });
    builder.addCase(AddtoCartAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { resetCart } = cartSlice.actions;

export const getCart = (state) => state.cart.value;
export const getCartCount = (state) => {
  let count = 0;
  let total = 0;
  let saving = 0;
  if (state.cart.value.length > 0) {
    state.cart.value.map((product) => {
      count += product.quantity;
      total +=
        parseInt(product.quantity) *
        parseFloat(product.storeProduct.D_mart_Price);
      saving +=
        parseInt(product.quantity) *
        parseFloat(
          product.storeProduct.MRP - product.storeProduct.D_mart_Price
        );
    });
  }
  return { count, total, saving };
};
export const cartItemQty = (state, id) => {
  if (state.cart.value.length > 0) {
    const qty = state.cart.value.find(
      (product) => product.storeProduct.Product_id === id
    );
    if (qty !== undefined) {
      return qty.quantity;
    }
  }
  return 0;
};
export default cartSlice.reducer;
