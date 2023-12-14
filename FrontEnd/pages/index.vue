<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label>Name</label>
          <input v-model="formData.name" type="text" name="name" placeholder="Soic" required>
        </div>
        <div>
          <label>Email</label>
          <input v-model="formData.email" type="email" name="email" placeholder="soic@soic.com" required>
        </div>
        <div>
          <label>Phone Number</label>
          <input v-model="formData.phone" type="text" name="phone" placeholder="+62 1896750874" required>
        </div>
        <div>
          <label>School</label>
          <input v-model="formData.school" type="text" name="school" placeholder="SMAN 2 Kota Tangerang Selatan" required>
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
    name: '',
    email: '',
    phone: '',
    school: '',
  });
  
  const isFormSubmitted = ref(false);
  
  const getCurrentDate = () => {
    var currentDate = new Date();
  
    var day = currentDate.getDate();
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = monthNames[currentDate.getMonth()];
    var year = currentDate.getFullYear();
  
    var formattedDate = day + ' ' + month + ' ' + year;
  
    return formattedDate;
  };
  
  const submitForm = async () => {
    console.log(getCurrentDate());
    try {
      const response = await fetch('http://localhost:8000/api/Pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          school: formData.school,
          date: getCurrentDate(),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
      isFormSubmitted.value = true;
      formData.value = {
        name: '',
        email: '',
        phone: '',
        school: '',
      };
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };
  </script>
  
  <style>
  /* Add your styles as needed */
  </style>
  