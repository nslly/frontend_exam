<template>
    <div class="flex items-center justify-center w-screen h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 class="text-2xl text-blue-600 font-bold text-center mb-6">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="login" class="block text-sm font-medium text-gray-700">Username or Email</label>
                    <input
                        v-model="loginInput"
                        type="text"
                        id="login"
                        @blur="validateLoginInput"
                        :class="{'border-red-500': loginInputError}"
                        class="mt-1 text-gray-600 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                        required
                    />
                    <p v-if="loginInputError" class="text-red-500 text-sm">{{ loginInputError }}</p>
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        id="password"
                        @blur="validatePassword"
                        :class="{'border-red-500': passwordError}"
                        class="mt-1 text-gray-600 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                        required
                    />
                    <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
                </div>

                <div class="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="remember"
                        v-model="rememberMe"
                        class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label for="remember" class="text-sm text-gray-600">Remember me</label>
                </div>

                <button
                    type="submit"
                    class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>

                <div v-if="errorMessage" class="mt-4 text-red-500 text-sm">
                    {{ errorMessage }}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const loginInput = ref('');
        const password = ref('');
        const rememberMe = ref(false);
        const errorMessage = ref('');
        const loginInputError = ref('');
        const passwordError = ref('');

        const validateLoginInput = () => {
            loginInputError.value = loginInput.value ? '' : 'Username or Email is required.';
        };

        const validatePassword = () => {
            passwordError.value = password.value ? '' : 'Password is required.';
        };

        const login = async () => {
            validateLoginInput();
            validatePassword();

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    login: loginInput.value, // Assuming you're using 'email' here
                    password: password.value,
                    remember: rememberMe.value, // Send the "remember" field
                });

                // Store the token in localStorage or session storage
                localStorage.setItem('token', response.data.token);

                // Redirect to the home page (or dashboard)
                window.location.href = '/products'; // Update the path as needed

            } catch (error) {
                if (error.response && error.response.data) {
                    errorMessage.value = error.response.data.message; // Display the error message from Laravel
                } else {
                    errorMessage.value = 'An unexpected error occurred.';
                }
            }
        };

        return {
            loginInput,
            password,
            rememberMe,
            errorMessage,
            loginInputError,
            passwordError,
            login,
            validateLoginInput,
            validatePassword,
        };
    },
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
