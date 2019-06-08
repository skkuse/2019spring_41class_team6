<template>
  <div>
    <div style="text-align: center">
      <form id="myForm" @submit.prevent="uploadData">
        <input type="text" name="title" v-model="title" /><br />
        <input type="file" name="image" @change="getFile" /><br />
        <textarea name="body" v-model="body"></textarea><br />
        <button type="submit">submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { db, storage } from "@/firebase";

let file = null;

export default {
  name: "register-product",
  data: () => {
    return {
      message: "",
      title: null,
      body: null
    };
  },
  methods: {
    uploadData: function() {
      storage
        .ref()
        .child("productImages/" + file.name)
        .put(file)
        .then(snapshot => {
          snapshot.ref
            .getDownloadURL()
            .then(url => {
              db.collection("products")
                .add({
                  title: this.title,
                  body: this.body,
                  imageUrl: url,
                  createdAt: +new Date()
                })
                .then(() => {
                  alert("업로드 완료");
                });
            })
            .catch(error => {
              alert(error);
            });
        })
        .catch(error => {
          alert(error);
        });
    },
    getFile: function(e) {
      file = e.target.files[0];
    }
  }
};
</script>
