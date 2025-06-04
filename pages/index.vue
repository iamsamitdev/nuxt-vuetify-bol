<script setup lang="ts">
    // รับค่าจากฟอร์ม
    const email = ref('samit@email.com')
    const password = ref('123456')

    // useCookie() for managing cookies
    const token = useCookie('token', {
        maxAge: 60 * 60,  // 1 hour
        secure: false, // Set to true if using HTTPS
    })

    // ตรวสอบความถูกต้องของฟอร์ม
    const { ruleRequired, ruleEmail, rulePassLen} = useFormRules()

    // ฟังก์ชันสำหรับส่งข้อมูล
    const submitForm = async () => {
        if(ruleRequired(email.value) == true && 
           ruleEmail(email.value) == true && 
           rulePassLen(password.value) == true) {

            // useRuntimeConfig() for get environment variables
            const config = useRuntimeConfig();
            const STRAPI_URL = config.public.strapi.url;

            // console.log('Submitting to:', STRAPI_URL);

            // useFetch() for making API requests
            useFetch(`${STRAPI_URL}/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: email.value,
                    password: password.value
                }),
                onResponse({ request, response, options }) {
                    // console.log('Response:', response);
                    // Handle successful response
                    if(response.status == 200) {
                        alert('Login successful!');
                        // Set token in cookie
                        token.value = response._data.jwt
                        console.log('Token set:', token.value);
                        // redirect to dashboard after successful login
                        navigateTo('/backend/dashboard');
                    } else {
                        alert('Login failed: ' + response.statusText);
                    }
                }
            })

        } else {
            console.error('Form validation failed');
        }
    }
</script>

<template>
    <VCol cols="12" md="6" lg="6" sm="6">
        <VRow no-gutters align="center" justify="center">
            <VCol cols="12" md="6" class="pa-3">
                <VForm @submit.prevent="submitForm">
                    <div class="text-h5 mb-3">Login Form</div>
                    <div class="mt-1">
                        <VTextField
                            v-model="email"
                            :rules="[ruleRequired, ruleEmail]"
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            required
                        />
                    </div>
                    <div class="mt-1">
                        <VTextField
                            v-model="password"
                            :rules="[ruleRequired, rulePassLen]"
                            id="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            required
                        />
                    </div>
                    <div class="mt-1">
                        <VBtn type="submit" color="primary" class="mt-3">
                            Submit
                        </VBtn>
                    </div>
                </VForm>
            </VCol>
        </VRow>
    </VCol>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>