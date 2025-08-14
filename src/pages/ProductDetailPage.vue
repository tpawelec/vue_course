<template>
  <div v-if="product">

    <div class="img-wrap">
       <img :src="product.imageUrl" :alt="product.name">
    </div>
    <div class="product-details">
       <h1>{{ product.name }}</h1>
       <h3 class="price">{{ product.price }}</h3>
       <button @click="addToCart" class="add-to-cart" v-if="user && !itemIsInCart">Add to cart</button>
       <button class="grey-button" v-if="user && itemIsInCart">Item is already in cart</button>
       <button class="sing-in" @click="signIn" v-if="!user">Sign in to add to cart</button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>

import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';
export default {
  name: 'ProductDetailPage',
  data () {
    return {
        product: {},
        cartItems: []
    }
  },
  props: ['user'],
  watch: {
    async user(newUserValue) {
      if(newUserValue) {
      const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
      const cartItems = cartResponse.data;
      this.cartItems = cartItems;
    }

    }
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some(item => item.id === this.$route.params.productId)
    }
  },
  methods: {
    async addToCart() {
      await axios.post(`/api/users/${this.user.uid}/cart`, { id: this.$route.params.productId})
      alert('Added to cart')
      /*
      =================  Course challenge - my solution ==========================

      const response = await axios.get('/api/users/12345/cart');
      const ShoppingCartSize = response.data.length;
      await axios.post('/api/users/12345/cart', { id: this.$route.params.productId}).then((response) => {
        if(ShoppingCartSize === response.data.length) {
          alert("Item is already in your cart")
        } else {
          alert('Added to cart');
        }
      }) */
    },

    async signIn() {
      const email = prompt("Enter your email to sign in")
      const auth = getAuth();
      const actionCodeSettings = {
        url: `https://vue-course-jjn6.onrender.com/products/${this.$route.params.productId}`,
        handleCodeInApp: true,
      }

      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      alert("Link sent to email")
      window.localStorage.setItem('emailForSignIn', email)
    }
  },
  components: {
    NotFoundPage,
},
async created() {

    const auth = getAuth();
    if(isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn')
      await signInWithEmailLink(auth, email, window.location.href)
      alert("Signed in");
      window.localStorage.removeItem('emailForSignIn')
    }
    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    const products = response.data;
    this.product = products;
    if(this.user) {
      const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = cartResponse.data;
      this.cartItems = cartItems;
    }
  }}
</script>