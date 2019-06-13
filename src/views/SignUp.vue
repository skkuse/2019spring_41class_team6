<template>
  <div>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <router-link to="/">Home</router-link>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">SignUp</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="h3 mb-3 text-black">Sign Up</h2>
          </div>
          <div class="col-md-7">
            <form @submit.prevent="signUp">
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
                  <div class="col-md-12">
                    <label for="c_email" class="text-black"
                      >Nickname <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="c_email"
                      name="c_email"
                      placeholder=""
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12">
                    <button class="btn btn-primary btn-lg py-3 btn-block">
                      Sign Up
                    </button>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12">
                    <button class="btn btn-primary btn-lg py-3 btn-block">
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  name: "signup",
  data: function() {
    return {
      emailID: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      auth
        .createUserWithEmailAndPassword(this.emailID, this.password)
        .then(() => {
          console.log(this.emailID + "  " + this.password);
          alert("Your account has been created!");
        })
        .catch(err => {
          alert("Error: " + err.message);
        });
    }
  }
};
</script>
