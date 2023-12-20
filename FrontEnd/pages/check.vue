<template>
  <div class="max-w-md mx-auto my-10 p-8 bg-white rounded shadow-md">
    <form @submit.prevent="checkStatus" class="space-y-4">
      <div>
        <label for="email" class="block text-gray-700">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
      >
        Check Status
      </button>
    </form>
    <div v-if="status" class="mt-4">
      <h2 class="text-xl font-bold">Status: {{ status }}</h2>
    </div>
    <div class="mt-4">
      <NuxtLink to="/">
        <button
          type="button"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
        >
          Home
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const status = ref(null);

    const checkStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/submissions?email=${email.value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        if (responseData.docs && responseData.docs.length > 0) {
          // Log the status for debugging
          console.log('Status from the server:', responseData.docs[0].status);

          // Assign the status to the ref
          status.value = responseData.docs[0].status;
        } else {
          alert('Email tidak ditemukan.');
        }
      } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan saat memeriksa status.');
      }
    };

    return {
      email,
      status,
      checkStatus,
    };
  },
};
</script>
