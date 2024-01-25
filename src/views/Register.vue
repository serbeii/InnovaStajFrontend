<template>
    <el-form
            :label-position="labelPosition"
            :model="registerForm"
            label-width="100px"
            style="max-width: 460px"
    >
        <el-form-item label="Email">
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

const labelPosition = ref('left');

const registerForm = reactive({
    email: '',
    username: '',
    password: '',
});

const submitForm = async() => {
    let emptyCheck = false;

    if(!registerForm.email){
        ElMessage({
            message: 'Email boş olamaz.',
            type: 'warning'
        });
        emptyCheck = true;
    }

    if(!registerForm.username){
        ElMessage({
            message: 'Kullanıcı adı boş olamaz.',
            type: 'warning'
        });
        emptyCheck = true;
    }

    if(!registerForm.password){
        ElMessage({
            message: 'Şifre boş olamaz.',
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
        const response = await axios.post('http://localhost:8080/user/register', payload);
        if(response.status === 200) {
            ElMessage({
                message: 'Hesap başarıyla oluşturuldu.',
                type: 'success'
            });
        }
    } catch (e) {
        ElMessage({
            message: 'Hesap oluşturulamadı.',
            type: 'error'
        });
        console.log(e);
    }
}
</script>


<style scoped>
button {
    width: 100px;
}
</style>