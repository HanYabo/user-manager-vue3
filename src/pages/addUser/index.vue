<template>
    <div class="app">
        <div class="form">
            <el-form :model="userForm" ref="userFormRef" :rules="formRules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>

                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="userForm.nickname"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password"></el-input>
                </el-form-item>

                <el-form-item label="电话" prop="phone">
                    <el-input v-model="userForm.phone" type="number"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <!-- 单选框 -->
                    <el-select v-model="userForm.sex" placeholder="请选择性别">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="描述" prop="describe">
                    <el-input type="textarea" v-model="userForm.describe"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 提交 -->
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <!-- 清空表单 -->
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { addUserAPI, getUserInfoAPI, updateUserAPI } from '../../apis/user'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userForm = ref({
    username: '',
    nickname: '',
    password: '',
    phone: '',
    sex: '',
    describe: ''
})

const userFormRef = ref(null)

const formRules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入电话', trigger: 'blur' }
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    describe: [
        { required: true, message: '请输入描述', trigger: 'blur' }
    ]
})

const router = useRouter()

const route = useRoute()

// 添加用户
const addUser = async () => {
    const res = await addUserAPI(userForm.value)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '添加成功'
        })
        // 清除表单
        userFormRef.value.resetFields()
        // 跳转到主页
        router.push('/')
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}

// 更新用户
const updateUser = async () => {
    const res = await updateUserAPI(userForm.value)
    if(res.code === 200) {
        ElMessage({
            type:'success',
            message: '更新成功'
        })
        // 清除表单
        userFormRef.value.resetFields()
        // 跳转到主页
        router.push('/')
    }
}

// 获取用户信息
const getUserInfo = async () => {
    const res = await getUserInfoAPI(route.params.id)
    userForm.value = res.data.userInfo
}

// 提交表单
const submitForm = () => {
    userFormRef.value.validate(valid => {
        if(valid && route.params.id) {
            updateUser()
        }else if(valid) {
            addUser()
        }
    })
}

// 重置表单
const resetForm = () => {
    userFormRef.value.resetFields()
}

// 监听路由变化，当编辑切换到新增让页面主动刷新
watch(() => route.params.id, () => {
    if (route.params.id && route.params) {
        getUserInfo()
    } else {
        userFormRef.value.resetFields()
    }
})


onBeforeMount(() => {
    if (route.params.id && route.params) {
        getUserInfo()
    }
})


</script>
  
<style scoped>
.form {
    width: 50%;
}
</style>