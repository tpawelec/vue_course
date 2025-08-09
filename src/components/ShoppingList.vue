<template>
<div v-for="product in cartItems" :key="product.id" class="product-container">
    <img :src="product.imageName" :alt="product.name" class="product-image">
    <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
    </div>
    <button class="remove-button">Remove from cart</button>
</div>
</template>

<script>
export default {
    name: "ShoppingList",
    props: ['cartItems']
}
</script>