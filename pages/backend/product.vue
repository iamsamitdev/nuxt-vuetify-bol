<script setup lang="ts">
import useStrapiApi from '~/composables/useStrapiApi'

    const config = useRuntimeConfig()
    const STRAPI_URL_ROOT: string = config.public.urlroot

    // Get Product from api
    const { data: products } = await useStrapiApi().getProducts(1, 25)
    console.log('Products:', products)

    const logout = () => {
        // get token from cookie
        const token = useCookie('token')

        // remove token from cookie
        token.value = null

        // redirect to home page
        navigateTo('/')
    }
</script>

<template>
    <div>
        <h1>Product</h1>
        <p>List of products:</p>
        <ul>
            <div v-for="product in products?.data" :key="product.id">
                <img :src="`${STRAPI_URL_ROOT}${product.image[0].url}`" width="100" height="100" alt="Product Image">
                <h2>Name: {{ product.title }}</h2>
                <p>Price: {{ product.price }}</p>
                <p>Qty: {{ product.qty }}</p>
            </div>
        </ul>
        <p v-if="!products || products.length === 0">No products found.</p>
        <p v-else>Total products: {{ products.data.length }}</p>
        <!-- Logout button -->
        <VBtn color="primary" class="mt-4" @click="logout">Logout</VBtn>
    </div>
</template>

<style scoped>

</style>