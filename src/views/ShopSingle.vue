<template>
  <div>
    <Header></Header>
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
            <img
              :src="product.main_images"
              alt="Image"
              class="img-fluid"
            />
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
              <strong class="text-primary h4"
                >₩ {{ product.price.toLocaleString() }}</strong
              >
            </p>
            <p>
              <button
                @click.prevent="addToCart"
                class="buy-now btn btn-sm btn-primary"
              >
                Add To Cart
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { fb, auth, db } from "@/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  name: "shop-single",
  components: { Footer, Header },
  data() {
    return {
      product: {}
    };
  },
  created() {
    db.collection("products")
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.product = doc.data();
      });
  },
  methods: {
    addToCart: function() {
      auth.onAuthStateChanged(usr => {
        if (usr) {
          db.collection("users")
            .doc(usr.uid)
            .update({
              cart_items: fb.firestore.FieldValue.arrayUnion(
                this.$route.params.id
              )
            })
            .then(() => {
              this.$router.push("/cart");
            })
            .catch(err => {
              alert(err.message);
            });
        } else {
          this.$router.push("/signin");
        }
      });
    }
  }
};
</script>
