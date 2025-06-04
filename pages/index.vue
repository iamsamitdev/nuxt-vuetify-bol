<script setup lang="ts">
import { ref } from 'vue';

// Use locale composable
const { currentLocale, changeLanguage } = useLocale()

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
    <v-container class="fill-height" fluid>
        
        <v-row align="center" justify="center" class="login-row">
            <v-col cols="12" md="6" class="pa-0 image-col">
                <div class="login-image" />
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center justify-center pa-0">
                <v-card elevation="10" class="pa-8 login-card" rounded="xl">
                    <!-- Language Buttons -->
                    <div class="d-flex justify-center mb-4">
                        <v-btn-toggle v-model="currentLocale" mandatory class="mb-3">
                            <v-btn value="en" @click="changeLanguage('en')" size="small">EN</v-btn>
                            <v-btn value="th" @click="changeLanguage('th')" size="small">TH</v-btn>
                            <v-btn value="la" @click="changeLanguage('la')" size="small">LA</v-btn>
                        </v-btn-toggle>
                    </div>
                    
                    <v-card-title class="text-h4 font-weight-bold text-center mb-6">
                        {{ $t('hello') }}
                    </v-card-title>
                    
                    <v-form @submit.prevent="submitForm">
                        <div class="text-h5 mb-3">{{ $t('loginForm') || 'Login Form' }}</div>
                        <div class="mt-1">
                            <v-text-field
                                v-model="email"
                                :rules="[ruleRequired, ruleEmail]"
                                id="email"
                                name="email"
                                :label="$t('email') || 'Email'"
                                placeholder="Enter your email"
                                type="email"
                                prepend-inner-icon="mdi-email"
                                required
                                density="comfortable"
                                class="mb-4"
                            />
                        </div>
                        <div class="mt-1">
                            <v-text-field
                                v-model="password"
                                :rules="[ruleRequired, rulePassLen]"
                                id="password"
                                name="password"
                                :label="$t('password') || 'Password'"
                                placeholder="Enter your password"
                                type="password"
                                prepend-inner-icon="mdi-lock"
                                required
                                density="comfortable"
                                class="mb-6"
                            />
                        </div>
                        <div class="mt-1">
                            <v-btn 
                                type="submit" 
                                color="primary" 
                                class="mt-3"
                                block
                                size="large"
                            >
                                {{ $t('submit') || 'Submit' }}
                            </v-btn>
                        </div>
                    </v-form>
                    
                    <v-divider class="my-6" />
                    <v-btn color="red-darken-1" block variant="outlined" class="mb-3" size="large">
                        <v-icon start>mdi-google</v-icon>
                        {{ $t('googleLogin') || 'Sign in with Google' }}
                    </v-btn>
                    <v-btn color="blue-darken-3" block variant="outlined" size="large">
                        <v-icon start>mdi-facebook</v-icon>
                        {{ $t('facebookLogin') || 'Sign in with Facebook' }}
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
.login-row {
  min-height: 100vh;
}
.image-col {
  display: flex;
  align-items: stretch;
  min-height: 100vh;
}
.login-image {
  width: 100%;
  height: 100vh;
  min-height: 400px;
  background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80');
  background-size: cover;
  background-position: center;
}
.login-card {
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(6px);
}
@media (max-width: 960px) {
  .image-col {
    display: none;
  }
  .login-card {
    border-radius: 24px !important;
  }
}
</style>