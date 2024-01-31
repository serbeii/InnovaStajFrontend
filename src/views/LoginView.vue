<template>
    <el-form
            :label-position="labelPosition"
            :model="loginForm"
            label-width="120px"
            style="max-width: 460px"
    >
        <el-form-item label="Kullanıcı adı veya eposta adresi">

            <el-input v-model="loginForm.username"/>
        </el-form-item>
        <el-form-item label="Şifre">
            <el-input v-model="loginForm.password" autocomplete="off" type="password"/>
        </el-form-item>
        <el-button type="primary" @click="submitForm">Giriş yap</el-button>
        <el-button type="primary" @click="getCookie">Cookie</el-button>
    </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue';
import axios from 'axios';
import {ElMessage} from "element-plus";

const labelPosition = ref('top');

const loginForm = reactive({
    username: '',
    password: '',
});

const submitForm = async () => {
    let emptyCheck = false;
    const emailLogin = validateEmail(loginForm.username);

    if (!emailLogin && !loginForm.username) {
        ElMessage({
            message: 'Kullanıcı adı boş olamaz.',
            type: 'warning'
        });
        emptyCheck = true;
    }

    if (!loginForm.password) {
        ElMessage({
            message: 'Şifre boş olamaz.',
            type: 'warning'
        });
        emptyCheck = true;
    }

    if (emptyCheck) {
        return;
    }

    const payload = {
        username: loginForm.username,
        password: loginForm.password,
        emailLogin: emailLogin
    };

    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', payload);
        if (response.status === 200) {
            ElMessage({
                message: 'Başarıyla giriş yapıldı.',
                type: 'success'
            });
        }
        console.log(response.data);
        console.log(response.headers);
        console.log(document.cookie);
    } catch (e) {
        ElMessage({
            message: e.response.data.message,
            type: 'error'
        })
        console.log(e)
    }
}

function validateEmail(email) {
    const res = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return res.test(String(email).toLowerCase());
}

const getCookie = async() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
    }, {});
    console.log(cookies);
}
</script>


<style scoped>
button {
    width: 100px;
}

.label-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>