<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-8">Selamat Datang</h1>
    <h3 class="text-2xl font-bold mb-8">Para Pejuang Lomba Mewarnai Tingkat Sepuh dan Sederajat</h3>
    
    <nav class="flex flex-col items-left justify-center bg-gray-200 p-4 shadow-md space-y-4">
      <div class="flex flex-row items-center">
        <NuxtLink to="/submission">
          <button class="btn-box btn-blue">Registrasi</button>
        </NuxtLink>
        <p class="ml-4">Klik ini untuk Registrasi</p>
      </div>
      <div class="flex flex-row items-center">
        <NuxtLink to="/check">
          <button class="btn-box btn-blue">Cek Status</button>
        </NuxtLink>
        <p class="ml-4">Klik ini untuk memeriksa status registrasi anda</p>
      </div>
      <div class="flex flex-row items-center">
        <NuxtLink to="/list">
          <button class="btn-box btn-green">Peserta</button>
        </NuxtLink>
        <p class="ml-4">Klik ini untuk melihat list peserta</p>
      </div>
    </nav>
  </div>
</template>

<script setup>

</script>

<style scoped>
.btn-box {
  background-color: #fff;
  color: #333;
  font-weight: bold;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.btn-box:hover {
  background-color: #f0f4f8;
}
</style>
