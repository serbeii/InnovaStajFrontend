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
</template>

<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
</script>

<style scoped>
.upload-container {
    grid-column: span 2;
    padding-left: 30px;
    padding-right: 30px;
}
</style>