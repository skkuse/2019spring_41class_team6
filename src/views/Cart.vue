<template>
  <div>
    <Header :key="headerKey"></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <router-link to="/">Home</router-link>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Cart</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row mb-5">
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="product-thumbnail">Image</th>
                    <th class="product-name">Product</th>
                    <th class="product-price">Price</th>
                    <th class="product-quantity">Quantity</th>
                    <th class="product-total">Total</th>
                    <th class="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td class="product-thumbnail">
                      <img
                        :src="item.data.thumbnail"
                        alt="Image"
                        class="img-fluid"
                      />
                    </td>
                    <td class="product-name">
                      <h2 class="h5 text-black">{{ item.data.title }}</h2>
                    </td>
                    <td>₩ {{ item.data.price.toLocaleString() }}</td>
                    <td>
                      <div class="input-group mb-3" style="max-width: 120px;">
                        <div class="input-group-prepend">
                          <button
                            @click="
                              if (item.quantity > 1) {
                                item.quantity--;
                              }
                            "
                            class="btn btn-outline-primary js-btn-minus"
                            type="button"
                          >
                            &minus;
                          </button>
                        </div>
                        <input
                          type="text"
                          class="form-control text-center"
                          :value="item.quantity"
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />
                        <div class="input-group-append">
                          <button
                            @click="item.quantity++"
                            class="btn btn-outline-primary js-btn-plus"
                            type="button"
                          >
                            &#x2b;
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      ₩ {{ (item.data.price * item.quantity).toLocaleString() }}
                    </td>
                    <td>
                      <button
                        @click.prevent="removeItem(item.id, index)"
                        class="btn btn-primary btn-sm"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">
                <label class="text-black h4" for="coupon">Coupon</label>
                <p>Enter your coupon code if you have one.</p>
              </div>
              <div class="col-md-8 mb-3 mb-md-0">
                <input
                  type="text"
                  class="form-control py-3"
                  id="coupon"
                  placeholder="Coupon Code"
                />
              </div>
              <div class="col-md-4">
                <button class="btn btn-primary btn-sm">Apply Coupon</button>
              </div>
            </div>
          </div>
          <div class="col-md-6 pl-5">
            <div class="row justify-content-end">
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-12 text-right border-bottom mb-5">
                    <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div class="row mb-5">
                  <div class="col-md-6">
                    <span class="text-black">Total</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black"
                      >₩ {{ totalPrice.toLocaleString() }}</strong
                    >
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <button
                      class="btn btn-primary btn-lg py-3 btn-block"
                      @click="goToChekout"
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { fb, db, auth } from "@/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: "cart",
  components: { Footer, Header },
  data() {
    return {
      items: [],
      // totalPrice: 0,
      headerKey: 0
    };
  },
  computed: {
    totalPrice: function() {
      let total = 0;
      for (let i in this.items) {
        total += this.items[i].data.price * this.items[i].quantity;
      }
      return total;
    }
  },
  methods: {
    goToChekout: function() {
      this.$router.push("checkout");
    },
    removeItem: function(productId, index) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update({
          cart_items: fb.firestore.FieldValue.arrayRemove(productId)
        })
        .then(() => {
          this.items.splice(index, 1);
          this.headerKey++;
        })
        .catch(err => {
          alert(err.message);
        });
    }
  },
  beforeCreate() {
    auth.onAuthStateChanged(usr => {
      if (usr) {
        db.collection("users")
          .doc(usr.uid)
          .get()
          .then(snapshot => {
            const cartItems = snapshot.data().cart_items;
            for (let i in cartItems) {
              db.collection("products")
                .doc(cartItems[i])
                .get()
                .then(snapshot => {
                  this.items.push({
                    id: cartItems[i],
                    data: snapshot.data(),
                    quantity: 1
                  });
                })
                .catch(err => {
                  alert(err.message);
                });
            }
          })
          .catch(err => {
            alert(err.message);
          });
      }
    });
  }
};
</script>
