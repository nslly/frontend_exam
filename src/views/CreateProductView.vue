<template>
    <div class="create-product">
        <h1>Create Product</h1>

        <!-- Display steps -->
        <div v-if="step === 1">
            <h2>Step 1: Product Details</h2>
            <form @submit.prevent="nextStep(1)">
                <div>
                    <label for="name">Product Name:</label>
                    <input v-model="form.name" id="name" type="text" />
                    <span v-if="errors.name">

                        {{ errors.name }}</span>
                </div>

                <div>
                    <label for="category">Category:</label>
                    <select v-model="form.category" id="category">
                        <option value="" disabled>Select a category</option>
                        <option v-for="category in categories" :key="category" :value="category">

                            {{ category }}
                        </option>
                    </select>
                    <span v-if="errors.category">

                        {{ errors.category }}</span>
                </div>

                <div>
                    <label for="description">Description:</label>
                    <textarea v-model="form.description" id="description"></textarea>
                    <span v-if="errors.description">

                        {{ errors.description }}</span>
                </div>

                <button type="submit">Next</button>
            </form>
        </div>

        <!-- Step 2: Image Upload -->
        <div v-if="step === 2">
            <h2>Step 2: Upload Images</h2>
            <form @submit.prevent="nextStep(2)">
                <div>
                    <input type="file" @change="handleFileUpload" multiple />
                    <span v-if="errors.images">

                        {{ errors.images }}</span>
                </div>
                <button type="submit">Next</button>
            </form>
        </div>

        <!-- Step 3: Date Picker -->
        <div v-if="step === 3">
            <h2>Step 3: Select Date and Time</h2>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="date">Select Date:</label>
                    <input v-model="form.date" type="date" id="date" />
                    <span v-if="errors.date">

                        {{ errors.date }}</span>
                </div>

                <div>
                    <label for="time">Select Time:</label>
                    <input v-model="form.time" type="time" id="time" />
                    <span v-if="errors.time">

                        {{ errors.time }}</span>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>

        <!-- Navigation Controls -->
        <div v-if="step > 1">
            <button @click="prevStep" type="button">Back</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            step: 1,
            form: {
                name: '',
                category: '',
                description: '',
                images: [],
                date: '',
                time: '',
            },
            errors: {},
            categories: ['Electronics', 'Furniture', 'Clothing', 'Books'], // Dummy categories
        };
    },
    methods: {
        nextStep(currentStep) {
            // Basic form validation per step
            this.errors = {};

            if (currentStep === 1) {
                if (!this.form.name) this.errors.name = 'Product name is required.';
                if (!this.form.category) this.errors.category = 'Category is required.';
                if (!this.form.description) this.errors.description = 'Description is required.';

                if (Object.keys(this.errors).length === 0) this.step++;
            }

            if (currentStep === 2) {
                if (!this.form.images.length) this.errors.images = 'At least one image is required.';

                if (Object.keys(this.errors).length === 0) this.step++;
            }
        },
        prevStep() {
            if (this.step > 1) this.step--;
        },
        handleFileUpload(event) {
            this.form.images = Array.from(event.target.files);
        },
        submitForm() {
            // Final form validation
            this.errors = {};

            if (!this.form.date) this.errors.date = 'Date is required.';
            if (!this.form.time) this.errors.time = 'Time is required.';

            if (Object.keys(this.errors).length === 0) {
                // Form submission logic here
                alert('Product created successfully!');
            }
        },
    },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>