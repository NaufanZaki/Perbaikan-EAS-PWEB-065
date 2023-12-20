<template>
  <div class="max-w-md mx-auto my-10 p-8 bg-stone-300 rounded shadow-md">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-gray-700">Nama:</label>
        <input id="name" v-model="submission.name" type="text" required
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-red-200" />
      </div>
      <div>
        <label for="email" class="block text-gray-700">Email:</label>
        <input id="email" v-model="submission.email" type="email" required
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-red-200" />
      </div>
      <div>
        <label for="institution" class="block text-gray-700">Asal Sekolah:</label>
        <input id="institution" v-model="submission.institution" type="text" required
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-red-200" />
      </div>
      <div>
        <label for="date" class="block text-gray-700">Tanggal:</label>
        <input id="date" v-model="submission.date" type="date" required
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-red-200" />
      </div>
      <button type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
        Submit
      </button>
    </form>
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
    const submission = ref({
      name: '',
      email: '',
      institution: '',
      status: 'waiting',
      date: '',
    });

    const submitForm = async () => {
      try {
        // const emailInUse = await isEmailInUse(submission.value.email);
        // if (emailInUse) {
        //   alert('Email sudah digunakan. Gunakan email yang berbeda.');
        //   return;
        // }

        const response = await fetch('http://localhost:8080/api/submissions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission.value),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Data berhasil disimpan!');
        submission.value = {
          name: '',
          email: '',
          institution: '',
          status: 'waiting',
          date: '',
        };
      } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan saat menyimpan data.');
      }
    };

    // const isEmailInUse = async (email) => {
    //   const response = await fetch(`http://localhost:8080/api/check-email?email=${email}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const responseData = await response.json();
    //   return responseData.emailInUse;
    // };

    return {
      submission,
      submitForm,
    };
  },
};
</script>
