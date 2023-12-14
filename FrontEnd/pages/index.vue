<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nama">Name</label>
          <input v-model="formData.nama" type="text" id="nama" placeholder="Soic" required>
        </div>
        <div>
          <label for="email">Email</label>
          <input v-model="formData.email" type="email" id="email" placeholder="soic@soic.com" required>
        </div>
        <div>
          <label for="asalSekolah">Asal Sekolah</label>
          <input v-model="formData.asalSekolah" type="text" id="asalSekolah" placeholder="SMAN 2 Kota Tangerang Selatan" required>
        </div>
        <button type="submit">Register</button>
      </form>
      <div v-if="isFormSubmitted">
        <h1>Register Success</h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const formData = ref({
    nama: '',
    email: '',
    asalSekolah: '',
  });
  
  const isFormSubmitted = ref(false);
  
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  };
  
  const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/Pendaftaran', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        nama: formData.nama,
        email: formData.email,
        asal_Sekolah: formData.asalSekolah,
        Status: 'waiting',
        Tanggal_Pendaftaran: getCurrentDate(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! Status: ${response.status}, Response Text: ${errorText}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    isFormSubmitted.value = true;
    formData.value = {
      nama: '',
      email: '',
      asalSekolah: '',
    };
  } catch (error) {
    console.error('Error submitting form:', error.message);
  }
};

  </script>
  
  <style scoped>
  /* Add your scoped styles as needed */
  </style>
  