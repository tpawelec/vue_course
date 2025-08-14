<template>
 <h1>Shopping Cart</h1>
<div v-if="cartItems.length > 0">
<ShoppingList @remove-from-cart="removeFromCart($event)" :cartItems="cartItems"/>

<button class="checkout-button">Proceed to checkout</button>
</div>
<div v-if="cartItems.length === 0">
    You currently have no items in your cart.
</div>
</template>

<script>
import ShoppingList from '@/components/ShoppingList.vue';
import axios from 'axios';
export default {
  name: 'ShoppingCartPage',
  components: { ShoppingList },
  props: ['user'],
  data() {
    return {
        cartItems: []
    }
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/${this.user?.uid || null}/cart/${productId}`)
      const updatedCartItems = response.data
      this.cartItems = updatedCartItems
    }
  },
  async created() {
    if(this.user) {
      const response = await axios.get(`/api/users/${this.user?.uid || null}/cart`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  },
   watch: {
    async user(newUserValue) {
      if(newUserValue) {
      const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
      const cartItems = cartResponse.data;
      this.cartItems = cartItems;
    }

    }
  }
}
</script>

