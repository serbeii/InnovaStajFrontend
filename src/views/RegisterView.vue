<template>
    <el-form
            :label-position="labelPosition"
            :model="registerForm"
            label-width="120px"
            style="max-width: 460px"
    >
        <el-form-item label="Eposta adresi">
            <el-input v-model="registerForm.email"/>
        </el-form-item>
        <el-form-item label="Kullanıcı adı">
            <el-input v-model="registerForm.username"/>
        </el-form-item>
        <el-form-item label="Şifre">
            <el-input v-model="registerForm.password" autocomplete="off" type="password"/>
        </el-form-item>
        <el-button type="primary" @click="submitForm">Kayıt ol</el-button>
    </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue';
import axios from 'axios';
import {ElMessage} from "element-plus";

const labelPosition = ref('top');

const registerForm = reactive({
    email: '',
    username: '',
    password: '',
});

const submitForm = async() => {
    let emptyCheck = false;
    const validEmail = validateEmail(registerForm.email);
    const validPassword = registerForm.password.length >= 8 &&
            registerForm.password.length <= 32;
    const validUsername = registerForm.username.length >= 3 &&
            registerForm.username.length <= 32;

    if(!validEmail) {
        ElMessage({
            message: 'Geçerli bir mail adresi giriniz',
            type: 'warning'
        });
        emptyCheck = true;
    }

    if(!validUsername){
        ElMessage({
            message: '3-32 karakter uzunluğunda geçerli bir kullanıcı adı giriniz.',
            type: 'warning'
        });
        emptyCheck = true;
    }

    if(!validPassword){
        ElMessage({
            message: '8-32 karakter uzunluğunda geçerli bir şifre giriniz.',
            type: 'warning'
        });
        emptyCheck = true;
    }

    if (emptyCheck){
        return;
    }

    const payload = {
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password
    };

    try {
        const response = await axios.post('http://localhost:8080/api/auth/register', payload);
            ElMessage({
                message: response.data,
                type: 'success'
            });
    } catch (e) {
       ElMessage({
           message: e.response.data.message,
           type: 'error'
       })
        console.log(e);
    }
}
function validateEmail(email) {
    const res = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return res.test(String(email).toLowerCase());
}
</script>


<style scoped>
button {
    width: 100px;
}
</style>