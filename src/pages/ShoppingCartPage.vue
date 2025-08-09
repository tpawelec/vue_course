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
import { cartItems } from '@/temp-data';
export default {
  name: 'ShoppingCartPage',
  components: { ShoppingList },
  data() {
    return {
        cartItems
    }
  }
}
</script>

