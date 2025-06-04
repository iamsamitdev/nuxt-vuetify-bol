<template>
    <div>
        <VApp>
            <VMain>
                <VContainer fluid>
                    <VRow>
                        <VCol cols="12" class="text-center">
                            <h1>Backend</h1>
                            <ul>
                                <NuxtLink to="/backend/dashboard">
                                    Dashboard
                                </NuxtLink>
                                |
                                <NuxtLink to="/backend/product">
                                    Product
                                </NuxtLink>
                            </ul>
                        </VCol>
                    </VRow>
                    <slot />
                </VContainer>
            </VMain>
        </VApp>
    </div>
</template>