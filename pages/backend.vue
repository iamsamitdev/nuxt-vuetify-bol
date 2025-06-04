<script setup lang="ts">
    definePageMeta({
        layout: 'backend',
        middleware: 'auth',
    })
</script>

<template>
    <div>
        <NuxtPage />
    </div>
</template>

<style scoped>

</style>