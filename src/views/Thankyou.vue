<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <router-link to="/">Home</router-link>
            <span class="mx-2 mb-0">/</span>
            <router-link to="cart">Cart</router-link>
            <span class="mx-2 mb-0">/</span>
            <router-link to="checkout">Checkout</router-link>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Order</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <span class="icon-check_circle display-3 text-success"></span>
            <h2 class="display-3 text-black">Thank you!</h2>
            <p class="lead mb-5">You order was successfully completed.</p>
            <p>
              <router-link to="shop" class="btn btn-sm btn-primary"
                >Back to shop</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  components: { Footer, Header }
};
</script>
