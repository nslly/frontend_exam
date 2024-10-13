<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 class="text-2xl text-blue-600 font-bold mb-6 text-center">Edit Product</h1>

        <div class="mb-8">
        <div class="flex justify-between mb-4">
            <span :class="['step-indicator', step.value >= 1 ? 'step-active' : '']">1. Product Details</span>
            <span :class="['step-indicator', step.value >= 2 ? 'step-active' : '']">2. Upload Images</span>
            <span :class="['step-indicator', step.value >= 3 ? 'step-active' : '']">3. Date and Time</span>
        </div>
        <div class="relative h-1 bg-gray-300 rounded">
            <div class="absolute top-0 h-1 bg-blue-600 rounded" :style="{ width: stepProgress + '%' }"></div>
        </div>
        </div>

        <div v-if="step === 1">
            <h2 class="text-xl font-semibold mb-4 text-slate-600">Step 1: Product Details</h2>
            <form @submit.prevent="nextStep(1)">
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-semibold mb-2">Product Name:</label>
                    <input v-model="form.name" id="name" type="text" class="input" placeholder="Enter product name" />
                    <span v-if="errors.name" class="text-red-600 text-sm">{{ errors.name }}</span>
                </div>

                <div class="mb-4">
                    <label for="category" class="block text-gray-700 font-semibold mb-2">Category:</label>
                    <select v-model="form.category" id="category" class="input">
                        <option value="" disabled>Select a category</option>
                        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                    </select>
                    <span v-if="errors.category" class="text-red-600 text-sm">{{ errors.category }}</span>
                </div>

                <div class="mb-4">
                    <label for="description" class="block text-gray-700 font-semibold mb-2">Description:</label>
                    <textarea v-model="form.description" id="description" class="input" rows="4" placeholder="Enter product description"></textarea>
                    <span v-if="errors.description" class="text-red-600 text-sm">{{ errors.description }}</span>
                </div>

                <button type="submit" class="btn-primary w-full">Next</button>
            </form>
        </div>

        <div v-if="step === 2">
            <h2 class="text-xl font-semibold mb-4 text-slate-600">Step 2: Upload Images</h2>
            <form @submit.prevent="nextStep(2)">
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Upload Images:</label>
                    <input type="file" @change="handleFileUpload" multiple class="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                    file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    <span v-if="errors.images" class="text-red-600 text-sm">{{ errors.images }}</span>
                </div>

                <button type="submit" class="btn-primary w-full">Next</button>
            </form>
        </div>

        <div v-if="step === 3">
            <h2 class="text-xl font-semibold mb-4 text-slate-600">Step 3: Select Date and Time</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="date" class="block text-gray-700 font-semibold mb-2">Select Date:</label>
                    <input v-model="form.date" type="date" id="date" class="input" />
                    <span v-if="errors.date" class="text-red-600 text-sm">{{ errors.date }}</span>
                </div>

                <div class="mb-4">
                    <label for="time" class="block text-gray-700 font-semibold mb-2">Select Time:</label>
                    <input v-model="form.time" type="time" id="time" class="input" />
                    <span v-if="errors.time" class="text-red-600 text-sm">{{ errors.time }}</span>
                </div>

                <button type="submit" class="btn-primary w-full">Submit</button>
            </form>
        </div>

        <div v-if="step.value > 1" class="mt-6 flex justify-between">
            <button @click="prevStep" type="button" class="btn-secondary">Back</button>
            <button @click="router.push('/products')" type="button" class="btn-secondary">Cancel</button>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

axios.defaults.withCredentials = true;


axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const step = ref(1);

        const form = reactive({
            name: '',
            category: '',
            description: '',
            images: [],
            date: '',
            time: '',
        });

        const errors = reactive({});
        const categories = ref(['Electronics', 'Furniture', 'Clothing', 'Books']); 

        const fetchProduct = async () => {
        const productId = route.params.id; // Get product ID from route
            try {
                const response = await axios.get(`/products/${productId}`);
                const product = response.data.data;
                form.name = product.name;
                form.category = product.category;
                form.description = product.description;
            
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            };

        onMounted(() => {
        fetchProduct(); 
        });

        const nextStep = (currentStep) => {
            Object.keys(errors).forEach((key) => delete errors[key]);

            if (currentStep === 1) {
                if (!form.name) errors.name = 'Product name is required.';
                if (!form.category) errors.category = 'Category is required.';
                if (!form.description) errors.description = 'Description is required.';

                if (Object.keys(errors).length === 0) step.value++;
            }

            if (currentStep === 2) {
                if (form.images.length === 0) errors.images = 'At least one image is required.';

                if (Object.keys(errors).length === 0) step.value++;
            }
            };

            const prevStep = () => {
                if (step.value > 1) step.value--;
            };

            const handleFileUpload = (event) => {
                const files = Array.from(event.target.files);
                delete errors.images;

                if (files.length + form.images.length > 5) {
                    errors.images = 'You can upload up to 5 images.';
                    return;
                }

                form.images.push(...files);
                console.log('Current images:', form.images); 
            };



        const submitForm = async () => {
            Object.keys(errors).forEach((key) => delete errors[key]);

            if (!form.name) errors.name = 'Product name is required.';
            if (!form.category) errors.category = 'Category is required.';
            if (!form.description) errors.description = 'Description is required.';
            if (form.images.length === 0) errors.images = 'At least one image is required.';

            if (Object.keys(errors).length > 0) {
                return;
            }

            // Create FormData
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('category', form.category);
            formData.append('description', form.description);



            form.images.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });

            try {
                const productId = route.params.id; 
                await axios.put(`/products/${productId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                router.push('/products'); 
            } catch (error) {
                console.error('Error submitting form:', error);
                if (error.response) {
                    console.error('Validation errors:', error.response.data.errors); 
                }
            }
        };



        const stepProgress = computed(() => (step.value / 3) * 100);

        return {
            step,
            form,
            errors,
            categories,
            nextStep,
            prevStep,
            handleFileUpload,
            submitForm,
            stepProgress,
        };
    },
};
</script>



<style scoped>
.step-indicator {
    display: inline-block;
    padding: 0.5rem;
    border-radius: 0.375rem;
    background-color: #e2e8f0;
    font-weight: bold;
    color: #4a5568;
}

.step-active {
    background-color: #3182ce;
    color: #fff;
}

.input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    outline: none;
    font-size: 1rem;
    color: #4a5568;
}

.input:focus {
    border-color: #3182ce;
}

.btn-primary {
    background-color: #3182ce;
    color: #fff;
    padding: 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #2b6cb0;
}

</style>