<template>
  <div class="signup">
    <p>Let's create a new accuont!</p>
    <input type="text" v-model="email" placeholder="Email" />
    <br />
    <input type="password" v-model="password" placeholder="Password" />
    <br />
    <button class="btn btn-primary" v-on:click="signUp2">Sign Up</button>
    <span>or go back to <router-link to="/SignIn">Sign in</router-link>. </span>
    <!-- ?? -->
  </div>
</template>

<script>
    import { fb } from '@/firebase.js'

export default {
  name: "signUp2",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp2: function() {
      fb
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          alert("Your account has been created!"))
        .catch(err => {
          alert("Oops. " + err.message);
        });
    }
  }
};
</script>

<style scoped></style>
