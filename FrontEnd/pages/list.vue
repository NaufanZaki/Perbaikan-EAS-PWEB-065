<template>
    <div>
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by Name or Email..."
          class="px-6 py-3 mr-4 border rounded focus:outline-none focus:border-gray-500 bg-gray-200 text-gray-800"
        />
        <button
          @click="resetSearch"
          class="px-4 py-2 bg-blue-800 text-white rounded hover:bg-gray-900 focus:outline-none"
        >
          Reset
        </button>
        <NuxtLink to="/">
            <button
          @click="resetSearch"
          class=" m-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded focus:outline-none"
        >
          Home
        </button>
        </NuxtLink>
        
      </div>
  
      <div v-for="submission in filteredSubmissions" :key="submission.id" class="my-4 p-6 bg-white shadow-md rounded-md">
        <h2 class="text-2xl font-bold mb-2">{{ submission.name }}</h2>
        <p class="text-gray-700">Email: {{ submission.email }}</p>
        <p class="text-gray-700">Asal Sekolah: {{ submission.institution }}</p>
        <p class="text-gray-700">Status: {{ submission.status }}</p>
        <p class="text-gray-700">Date: {{ formatDate(submission.date) }}</p>
      </div>
  
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  const submissions = ref([]);
  const searchQuery = ref('');
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/submissions', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      submissions.value = responseData.docs;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  onMounted(async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengambil data.');
    }
  });
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const resetSearch = () => {
    searchQuery.value = '';
  };
  
  const filteredSubmissions = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return submissions.value.filter(
      (submission) =>
        submission.name.toLowerCase().includes(query) || submission.email.toLowerCase().includes(query)
    );
  });
  </script>
  