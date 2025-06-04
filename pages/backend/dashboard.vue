<script setup lang="ts">
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
        <h1>{{ $t('hello') }}</h1>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
        <p>This is a placeholder for your dashboard content.</p>
        <p>You can add charts, tables, or any other components you need.</p>
        <!-- Logout button -->
        <VBtn color="primary" class="mt-4" @click="logout">Logout</VBtn>
    </div>
</template>

<style scoped>

</style>