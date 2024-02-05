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
                Drop file here or <em>click to upload</em>
            </div>
            >
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                </div>
            </template>
        </el-upload>
    </div>
</template>

<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
import axios from 'axios'

axios.get('http://localhost:8080/api/admin/test', {withCredentials: true}).then(result => console.log(result));
</script>

<style scoped>
.upload-container {
    grid-column: span 2;
    padding-left: 30px;
    padding-right: 30px;
}
</style>