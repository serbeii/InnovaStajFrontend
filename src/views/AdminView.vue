<template>
    <div class="upload-container">
        <el-upload
                drag
                action="http://localhost:8080/api/admin/upload"
                multiple
                with-credentials
        >
            <el-icon class="el-icon--upload">
                <upload-filled/>
            </el-icon>
            <div class="el-upload__text">
                Dosyanızı buraya sürükleyin veya <em>yüklemek için tıklayın</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    16MB boyutundan küçük .xls/.xlsx
                </div>
            </template>
        </el-upload>
    </div>
    <div>
        <ul v-if="messages.length > 0">
            <li v-for="(message, index) in messages" :key="index">
                {{ message }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
import {ref} from "vue";
import axios from "axios";

axios.defaults.withCredentials = true;
const messages = ref();
const fetchMessages = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/admin/view')
        messages.value = response.data;
        console.log(messages.value);
    } catch (e) {
        console.log(e);
    }
}
setInterval(fetchMessages, 5000);
</script>

<style scoped>
.upload-container {
    padding-left: calc(var(--section-gap));
}
</style>