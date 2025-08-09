<template>
 <h1>Shopping Cart</h1>
<div v-if="cartItems.length > 0">
<div v-for="product in cartItems" :key="product.id" class="product-container">
    <img :src="product.imageName" :alt="product.name" class="product-image">
    <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
    </div>
    <button class="remove-button">Remove from cart</button>
</div>

<button class="checkout-button">Proceed to checkout</button>
</div>
<div v-if="cartItems.length === 0">
    You currently have no items in your cart.
</div>
</template>

<script>
import { cartItems } from '@/temp-data';
export default {
  name: 'ShoppingCartPage',
  data() {
    return {
        cartItems
    }
  }
}
</script>

