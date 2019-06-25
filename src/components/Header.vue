<template>
  <header class="site-navbar" role="banner">
    <div class="site-navbar-top">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left"
          >
            <form action="" class="site-block-top-search">
              <span class="icon icon-search2"></span>
              <input
                type="text"
                class="form-control border-0"
                placeholder="Search"
              />
            </form>
          </div>

          <div
            class="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center"
          >
            <div class="site-logo">
              <router-link to="/" class="js-logo-clone"
                >Indi Market
              </router-link>
            </div>
          </div>

          <div class="col-6 col-md-4 order-3 order-md-3 text-right">
            <div class="site-top-icons">
              <ul v-if="isSigned === null"></ul>
              <ul v-else-if="!isSigned">
                <li>
                  <router-link to="/signin">Sign In</router-link>
                </li>
                <li>
                  <router-link to="/signup">Sign Up</router-link>
                </li>
              </ul>
              <ul v-else>
                <li>
                  <a @click.prevent="logOut"
                    ><span class="icon icon-person"></span
                  ></a>
                </li>
                <li>
                  <router-link to="/register-product"><span class="icon icon-heart-o"></span></router-link>
                </li>
                <li>
                  <router-link to="/cart" class="site-cart">
                    <span class="icon icon-shopping_cart"></span>
                    <span v-if="cartQuantity" class="count">{{
                      cartQuantity
                    }}</span>
                  </router-link>
                </li>
                <li class="d-inline-block d-md-none ml-md-0">
                  <a href="#" class="site-menu-toggle js-menu-toggle"
                    ><span class="icon-menu"></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="site-navigation text-right text-md-center" role="navigation">
      <div class="container">
        <ul class="site-menu js-clone-nav d-none d-md-block">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li>
            <router-link to="/shop">Shop</router-link>
          </li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { db, auth } from "@/firebase";
export default {
  name: "Header",
  data() {
    return {
      isSigned: null,
      cartQuantity: null
    };
  },
  methods: {
    logOut: function() {
      auth
        .signOut()
        .then(() => {
          alert("sign out!");
          this.$router.push("/");
        })
        .catch(err => {
          alert(err.message);
        });
    }
  },
  beforeCreate() {
    auth.onAuthStateChanged(usr => {
      this.isSigned = !!usr;
      if (usr) {
        db.collection("users")
          .doc(usr.uid)
          .get()
          .then(snapshot => {
            this.cartQuantity = snapshot.data().cart_items.length;
          });
      }
    });
  }
};
</script>
