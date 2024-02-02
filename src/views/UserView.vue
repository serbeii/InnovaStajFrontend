<template>
    <el-button type="primary" @click="logout">Logout</el-button>
</template>

<script setup>
import axios from "axios";

const logout = async () => {
    await axios.post('http://localhost:8080/api/auth/logout');
    window.location.reload();
}
</script>

<style scoped>
button {
    width: 100px;
    justify-content: center;
}
</style>