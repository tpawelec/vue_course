<template>
    <div class="nav-bar">
        <RouterLink to="/products" class="products-link">
            <div class="logo-wrap">
                <img :src="logo" :alt="logo">
            </div>
        </RouterLink>
        <div class="nav-buttons-wrap" v-if="user">
            <button @click="signOut" >Sign out</button>
            <RouterLink to="/cart">
                <button>Shopping Cart</button>
            </RouterLink>
        </div>
        
    </div>
</template>

<script>

import logo from '@/assets/logo-hexagon.svg'
import { getAuth, signOut} from 'firebase/auth'
export default {
    name: "NavBar",
    data() {
        return {
            logo,
        }
    },
    props: ['user'],
    methods: {
        signOut() {
            const auth = getAuth();
            signOut(auth);
        }
    }
}
</script>