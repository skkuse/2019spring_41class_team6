import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("./views/Shop.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("./views/Contact.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("./views/Cart.vue")
    },
    {
      path: "/shop-single",
      name: "shop-single",
      component: () => import("./views/ShopSingle.vue")
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("./views/Checkout.vue")
    },
    {
      path: "/thankyou",
      name: "thankyou",
      component: () => import("./views/Thankyou.vue")
    },
    {
      path: "/register-product",
      name: "register-product",
      component: () => import("./views/RegisterProduct.vue")
    },
    {
      path: "/contactcomplete",
      name: "contactcomplete",
      component: () => import("./views/ContactComplete.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/SignIn.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUp.vue")
    }
  ]
});
