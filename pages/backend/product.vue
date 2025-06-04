<script setup lang="ts">
import useStrapiApi from '~/composables/useStrapiApi'

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
        <p>Welcome to the product page!</p>
        <p>This is a placeholder for your product content.</p>
        <p>You can add product listings, details, or any other components you need.</p>
        <!-- Logout button -->
        <VBtn color="primary" class="mt-4" @click="logout">Logout</VBtn>
    </div>
</template>

<style scoped>

</style>