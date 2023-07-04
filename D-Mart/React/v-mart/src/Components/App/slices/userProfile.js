import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const prefredStore = JSON.parse(localStorage.getItem("d_preferstore"));

export const addressAsync = createAsyncThunk("addressAsync", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_DOMAIN}/address`
  );
  return response.data;
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    value: {
      user: "vasu",
      isLogin: prefredStore ? prefredStore.isLogin : false,
      store: prefredStore ? prefredStore : null,
      AllStore: [],
      address: [],
      loader: true,
      deliveryData: { timeslot: "", address: "" },
    },
  },
  reducers: {
    setStore: (state, action) => {
      state.value.store = action.payload;
    },
    setIsLogin: (state, action) => {
      state.value.isLogin = action.payload;
    },
    setUserDeatils: (state, action) => {
      state.value.user = action.payload;
    },
    setUserAddress: (state, action) => {
      state.value.address.push(action.payload);
      console.log(state.value.address, "setuser");
    },
    setAllStore: (state, action) => {
      console.log(state, "state");
      state.value.AllStore = action.payload;
    },
    deleteUserAddress: (state, action) => {
      const index = state.value.address.findIndex(
        (address) => address._id === action.payload
      );
      state.value.address.splice(index, 1);
    },
    updateAddress: (state, action) => {
      const index = state.value.address.findIndex(
        (address) => address._id === action.payload._id
      );
      state.value.address[index] = action.payload;
    },
    setLoader: (state, action) => {
      console.log(state.value.loader, "its setLoader");
      state.value.loader = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.value.deliveryData.address = action.payload;
    },
    setDeliveryTimeslot: (state, action) => {
      state.value.deliveryData.timeslot = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addressAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addressAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value.address = action.payload;
      console.log(state.value.address);
    });
    builder.addCase(addressAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  setStore,
  setIsLogin,
  setUserAddress,
  setUserDeatils,
  setAllStore,
  updateAddress,
  deleteUserAddress,
  setLoader,
  setDeliveryAddress,
  setDeliveryTimeslot,
} = profileSlice.actions;

export const getisLogin = (state) => state.profile.value.isLogin;
export const getStore = (state) => state.profile.value.store;
export const getuser = (state) => state.profile.value.user;
export const ProductById = (state, id) => {
  return state.product.value[id];
};

export const getAddress = (state) => {
  const primaryAddress = state.profile.value.user.primaryAddress;
  const addressArray = [...state.profile.value.address];
  const index = state.profile.value.address.findIndex(
    (address) => address._id === primaryAddress
  );
  console.log(index);
  if (index !== -1) {
    let address = addressArray[0];
    addressArray[0] = addressArray[index];
    addressArray[index] = address;
  }
  // state.profile.value.address = addressArray;
  return addressArray;
};
export const getAddressById = (state, id) => {
  const address = state.profile.value.address.find(
    (address) => address._id === id
  );
  return address;
};

export const getAllStore = (state) => state.profile.value.AllStore;
export const getLoader = (state) => state.profile.value.loader;
export const getDeliveryData = (state) => state.profile.value.deliveryData;

export default profileSlice.reducer;
