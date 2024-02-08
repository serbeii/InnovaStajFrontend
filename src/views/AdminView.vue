<template>
    <div class="upload-container">
        <el-upload
                drag
                action="http://localhost:8080/api/admin/upload"
                multiple
                with-credentials
                :on-success='fetchMessages'
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
        <el-button type="primary" @click="empty">Mesajları Temizle</el-button>
    </div>
    <div class="upload-content">
        <el-row>
            <el-col :span="24">
                <div class="list-container">
                    <div v-for="(message, index) in messages" :key="index">
                        {{ message }}
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

axios.defaults.withCredentials = true;
const messages = ref([]);
const fetchMessages = async () => {
    console.log('test');
    try {
        const response = await axios.get('http://localhost:8080/api/admin/view')
        messages.value = response.data;
        console.log(messages.value);
    } catch (e) {
        console.log(e);
    }
}
onMounted(fetchMessages);
setInterval(fetchMessages, 5000);
const empty = async() => {
    try {
        await axios.delete('http://localhost:8080/api/admin/emptyMessages');
        await fetchMessages();
        ElMessage({
            type:"success",
            message:'Mesajlar başarıyla silindi.'
        });
    }
    catch (e) {
       ElMessage({
           type:"error",
           message:e.response.data.message
       });
    }
}
</script>

<style scoped>
.upload-container {
    padding-left: calc(var(--section-gap));
}
.upload-content {
    padding-left: calc(var(--section-gap)/4);
    width: 450px;
    max-height: 500px;
    overflow: auto;
}
.list-container {
    max-height: inherit;
    overflow-y: auto;
}
</style>