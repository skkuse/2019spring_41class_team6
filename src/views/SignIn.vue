<template>
  <div>
    <Header></Header>
    <Uploading ref="uploading"></Uploading>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <router-link to="/">Home</router-link>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">SignIn</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="h3 mb-3 text-black">Sign In</h2>
          </div>
          <div class="col-md-7">
            <form @submit.prevent="signIn">
              <div class="p-3 p-lg-5 border">
                <div class="form-group row">
                  <div class="col-md-6">
                    <label for="c_fname" class="text-black"
                      >Email ID <span class="text-danger">*</span></label
                    >
                    <input
                      type="email"
                      v-model="emailID"
                      class="form-control"
                      id="c_fname"
                      name="c_fname"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="c_lname" class="text-black"
                      >Password <span class="text-danger">*</span></label
                    >
                    <input
                      type="password"
                      v-model="password"
                      class="form-control"
                      id="c_lname"
                      name="c_lname"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12">
                    <button class="btn btn-primary btn-lg py-3 btn-block">
                      Sign In
                    </button>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12">
                    <span
                      >If you don't have account,
                      <a href="SignUp.vue">Sign Up!</a></span
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import Uploading from "../components/Uploading";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: "signin",
  components: { Footer, Header, Uploading },
  data() {
    return {
      emailID: "",
      password: ""
    };
  },
  methods: {
    signIn: function() {
      this.$refs.uploading.toggleProgress();
      auth
        .signInWithEmailAndPassword(this.emailID, this.password)
        .then(() => {
          this.$refs.uploading.toggleProgress();
          alert("You are successfully connected");
          this.$router.push("/");
        })
        .catch(err => {
          alert("error: " + err.message);
        });
    }
  }
};
</script>
