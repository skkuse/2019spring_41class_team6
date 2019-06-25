<template>
  <div>
    <Header></Header>
    <Uploading ref="uploading"></Uploading>
    <div style="text-align: center">
      <form id="myForm" @submit.prevent="uploadData">
        <input
          type="text"
          name="title"
          v-model="title"
          placeholder="상품 이름"
        /><br />
        <input type="file" name="thumbnail" @change="getFile" /><br />
        <input
          type="text"
          name="thumbnailDescription"
          v-model="thumbnailDescription"
          placeholder="썸네일에 대한 설명"
        /><br />
        <input type="file" name="mainImages" @change="getFile" multiple /><br />
        <textarea
          name="mainDescription"
          v-model="mainDescription"
          placeholder="상품의 상세 설명"
        ></textarea
        ><br />
        <input
          type="file"
          name="detailImages"
          @change="getFile"
          multiple
        /><br />
        <input
          type="number"
          name="price"
          v-model="price"
          placeholder="상품가격"
        /><br />
        <button type="submit">submit</button>
      </form>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { db, storage } from "@/firebase";
import Uploading from "@/components/Uploading.vue";
import Header from "../components/Header";
import Footer from "../components/Footer";
let images = {
  thumbnail: [],
  mainImages: [],
  detailImages: []
};

let urls = {
  thumbnail: [],
  mainImages: [],
  detailImages: []
};

function uploadImages(images) {
  return new Promise((resolve, reject) => {
    let cnt = 0;
    let dataLength = 0;
    for (let key in images) {
      dataLength += images[key].length;
    }
    for (let key in images) {
      for (let i = 0; i < images[key].length; i++) {
        storage
          .ref()
          .child("productImages/" + images[key][i].name)
          .put(images[key][i])
          .then(snapshot => {
            snapshot.ref
              .getDownloadURL()
              .then(url => {
                urls[key][i] = url;
                if (++cnt === dataLength) {
                  resolve("success");
                }
              })
              .catch(err => {
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      }
    }
  });
}

export default {
  name: "register-product",
  components: {
    Footer,
    Header,
    Uploading
  },
  data: () => {
    return {
      title: null,
      thumbnailDescription: null,
      mainDescription: null,
      price: null,
      showUploading: false
    };
  },
  methods: {
    uploadData: function() {
      this.$refs.uploading.toggleProgress();
      uploadImages(images)
        .then(() => {
          db.collection("products")
            .add({
              createdAt: +new Date(),
              title: this.title,
              thumbnail: urls.thumbnail[0],
              thumbnail_description: this.thumbnailDescription,
              main_description: this.mainDescription,
              main_images: urls.mainImages,
              detail_images: urls.detailImages,
              price: Number(this.price)
            })
            .then(() => {
              this.$refs.uploading.toggleProgress();
              alert("업로드 완료");
              location.reload();
            })
            .catch(error => {
              alert("db upload fail:" + error);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFile: function(e) {
      const fieldName = e.target.name;
      images[fieldName] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        images[fieldName].push(e.target.files[i]);
      }
    }
  }
};
</script>
