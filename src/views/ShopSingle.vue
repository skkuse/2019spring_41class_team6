<template>
  <div>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <router-link to="/">Home</router-link>
            <span class="mx-2 mb-0">/</span>
            <router-link to="/shop">Shop</router-link>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">{{ product.title }}</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img :src="product.main_images[0]" alt="Image" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h2 class="text-black">{{ product.title }}</h2>
            <p>
              {{ product.thumbnail_description }}
            </p>
            <p class="mb-4">
              {{ product.main_description }}
            </p>
            <p>
              <strong class="text-primary h4">${{ product.price }}</strong>
            </p>
            <div class="mb-5">
              <div class="input-group mb-3" style="max-width: 120px;">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-primary js-btn-minus"
                    type="button"
                  >
                    &minus;
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control text-center"
                  value="1"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary js-btn-plus"
                    type="button"
                  >
                    &#x2b;
                  </button>
                </div>
              </div>
            </div>
            <p>
              <router-link to="/cart" class="buy-now btn btn-sm btn-primary"
                >Add To Cart</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section block-3 site-blocks-2 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 site-section-heading text-center pt-4">
            <h2>Featured Products</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="nonloop-block-3 owl-carousel">
              <div class="item">
                <div class="block-4 text-center">
                  <figure class="block-4-image">
                    <img
                      src="images/cloth_1.jpg"
                      alt="Image placeholder"
                      class="img-fluid"
                    />
                  </figure>
                  <div class="block-4-text p-4">
                    <h3><a href="#">Tank Top</a></h3>
                    <p class="mb-0">Finding perfect t-shirt</p>
                    <p class="text-primary font-weight-bold">$50</p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="block-4 text-center">
                  <figure class="block-4-image">
                    <img
                      src="images/shoe_1.jpg"
                      alt="Image placeholder"
                      class="img-fluid"
                    />
                  </figure>
                  <div class="block-4-text p-4">
                    <h3><a href="#">Corater</a></h3>
                    <p class="mb-0">Finding perfect products</p>
                    <p class="text-primary font-weight-bold">$50</p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="block-4 text-center">
                  <figure class="block-4-image">
                    <img
                      src="images/cloth_2.jpg"
                      alt="Image placeholder"
                      class="img-fluid"
                    />
                  </figure>
                  <div class="block-4-text p-4">
                    <h3><a href="#">Polo Shirt</a></h3>
                    <p class="mb-0">Finding perfect products</p>
                    <p class="text-primary font-weight-bold">$50</p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="block-4 text-center">
                  <figure class="block-4-image">
                    <img
                      src="images/cloth_3.jpg"
                      alt="Image placeholder"
                      class="img-fluid"
                    />
                  </figure>
                  <div class="block-4-text p-4">
                    <h3><a href="#">T-Shirt Mockup</a></h3>
                    <p class="mb-0">Finding perfect products</p>
                    <p class="text-primary font-weight-bold">$50</p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="block-4 text-center">
                  <figure class="block-4-image">
                    <img
                      src="images/shoe_1.jpg"
                      alt="Image placeholder"
                      class="img-fluid"
                    />
                  </figure>
                  <div class="block-4-text p-4">
                    <h3><a href="#">Corater</a></h3>
                    <p class="mb-0">Finding perfect products</p>
                    <p class="text-primary font-weight-bold">$50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
export default {
  name: "shop-single",
  data() {
    return {
      product: {}
    };
  },
  created() {
    // console.log(this.$route.params.id)
    db.collection("products")
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.product = doc.data();
      });
  }
};
</script>
