import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTXXgdqNlvhgsHuZ1zzW2TX8vlcR_WowY",
  authDomain: "vue-site-c452f.firebaseapp.com",
  projectId: "vue-site-c452f",
  storageBucket: "vue-site-c452f.firebasestorage.app",
  messagingSenderId: "20353674515",
  appId: "1:20353674515:web:bae549869429a1274e3ee6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: `/cart`,
        component: ShoppingCartPage
    },
    {
        path: '/products',
        component: ProductsPage

    },
    {
        path: '/products/:productId',
        component: ProductDetailPage
    }, {
        path: '/',
        redirect: '/products'
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage
    }
]
}))
.mount('#app')
