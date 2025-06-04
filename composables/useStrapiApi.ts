export default() => {
    
    // get strapi url from runtime config
    const config = useRuntimeConfig()
    const STRAPI_URL: string = config.public.strapi.url

    // get token from cookies
    const token = useCookie('token')

    // headers for strapi api
    const headers = {
        'Accept': 'application/json',
        "Authorization": `Bearer ${token.value}`
    }

    const fetchWithTokenCheck = async <T>(url: any, options: any) => {
        const response = await useFetch(url, options);

        if (response.error.value && response.error.value.status === 400) {
            // Token is expired or invalid, redirect to login page
            navigateTo('/');
        }

        return response
    }

    // Get All Products
    const getProducts = async (page: number, pagesize: number) => {
        return fetchWithTokenCheck<any>(`${STRAPI_URL}/products?populate=*`, {
            method: 'GET',
            headers: headers,
            cache: 'no-cache'
        })
    }

    return { getProducts }
}