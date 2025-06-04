export default defineNuxtRouteMiddleware((to, from) => {
    // get token from cookies
    const token = useCookie('token')

    // if token is not set, redirect to login page
    if (!token.value) {
        return navigateTo('/')
    }
})