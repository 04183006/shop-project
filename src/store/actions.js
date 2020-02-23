export default {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        //1.查找之前数组中会否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
  
        if(oldProduct) {
          // let oldProduct = state.cartList[index]
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct);
          resolve('当前商品数量+1')
        }else {
          payload.count = 1;
          // state.cartList.push(payload);
          context.commit('addToCart', payload);
          resolve('添加了新的商品')
        }
      });
    }
  }