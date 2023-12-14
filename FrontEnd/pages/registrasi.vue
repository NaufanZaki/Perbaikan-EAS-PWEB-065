<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label>Name</label>
                <input v-model="formData.Nama" type="text" name="Nama" placeholder="Soic" required>
            </div>
            <div>
                <label>Email</label>
                <input v-model="formData.Email" type="email" name="Email" placeholder="soic@soic.com" required>
            </div>
            <div>
                <label>School</label>
                <input v-model="formData.Asal_Sekolah" type="text" name="Asal_Sekolah" placeholder="SMAN 2 Kota Tangerang Selatan" required>
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
    Nama: '',
    Email: '',
    Asal_Sekolah: '',
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
}

const submitForm = async () => {
    console.log(getCurrentDate());
    try {
        const response = await fetch('http://localhost:8000/api/Pendaftaran', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Nama: formData.value.Nama,
                Email: formData.value.Email,
                Asal_Sekolah: formData.value.Asal_Sekolah,
                Status: 'waiting', // Assuming you want to set the default value for Status
                Tanggal_Pendaftaran: getCurrentDate(),
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        isFormSubmitted.value = true;
        formData.value = {
            Nama: '',
            Email: '',
            Asal_Sekolah: '',
        };
    } catch (error) {
        console.error('Error submitting form:', error.message);
    }
};
</script>
