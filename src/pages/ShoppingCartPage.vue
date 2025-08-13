<template>
 <h1>Shopping Cart</h1>
<div v-if="cartItems.length > 0">
<ShoppingList :cartItems="cartItems"/>

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
  data() {
    return {
        cartItems: []
    }
  },
  async created() {
    const response = await axios.get(`/api/users/12345/cart`);
    const cartItems = response.data;
    this.cartItems = cartItems;
  }
}
</script>

