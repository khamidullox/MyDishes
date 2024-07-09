import { createSlice } from "@reduxjs/toolkit";

let dataFromLoclaStore = () => {
  return (
    JSON.parse(localStorage.getItem("product")) || {
      amout: 0,
      price: 0,
      product: [],
    }
  );
};
let productSlice = createSlice({
  name: "product",
  initialState: dataFromLoclaStore,
  reducers: {
    addProduct: (state, { payload }) => {
      let findProduct = state.product.find((item) => item.id == payload.id);
      if (findProduct) {
        findProduct.amout += payload.amout;
        state.amout += payload.amout;
      } else {
        state.product.push(payload);
        state.amout += payload.amout;
      }
      productSlice.caseReducers.setLocal(state);
      productSlice.caseReducers.calculatTotal(state);
    },
    plusAmout: (state, { payload }) => {
      let findProduct = state.product.find((item) => {
        return item.id == payload.id;
      });
      findProduct.amout += 1;
      productSlice.caseReducers.calculatTotal(state);
    },
    minusAmout: (state, { payload }) => {
      let findProduct = state.product.find((item) => {
        return item.id == payload.id;
      });
      findProduct.amout -= 1;
      productSlice.caseReducers.calculatTotal(state);
    },
    deleteProductCart: (state, { payload }) => {
      let filterDelete = state.product.filter((product) => {
        return product.id != payload.id;
      });
      state.product = filterDelete;
      productSlice.caseReducers.calculatTotal(state);
    },
    deleteAll: (state) => {
      state.amout = 0;
      state.product = [];
      state.price = 0;
      productSlice.caseReducers.setLocal(state);
      productSlice.caseReducers.calculatTotal(state);
    },
    calculatTotal: (state) => {
      let price = 0;
      let amout = 0;
      state.product.forEach((item) => {
        price += item.price * item.amout;
        amout += item.amout;
      });
      state.amout = amout;
      state.price = price;
      productSlice.caseReducers.setLocal(state);
    },
    setLocal: (state) => {
      localStorage.setItem("product", JSON.stringify(state));
    },
  },
});

export let { deleteAll, addProduct, plusAmout, minusAmout, deleteProductCart } =
  productSlice.actions;

export default productSlice.reducer;
