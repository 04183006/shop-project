export default {
    addCounter(state, payload) {
      payload.count++;
    },
    addToCart(state, payload) {
      payload.checked = true;
      payload.price = payload.price.substr(1);
      state.cartList.push(payload);
    },
  }