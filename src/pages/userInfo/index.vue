<template>
    <div class="app">
        <!-- 查询条件 -->
        <div>
            <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="formRef">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="queryParams.username" placeholder="输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="queryParams.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="queryParams.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-select v-model="queryParams.sex" placeholder="选择性别">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="注册时间" prop="time">
                    <el-date-picker v-model="queryParams.time" type="date" value-format="yyyy-MM-dd" placeholder="选择注册时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitSearch">
                        <el-icon>
                            <Search />
                        </el-icon>
                        查询
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearForm">
                        <el-icon>
                            <refresh />
                        </el-icon>
                        重置
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="trigger" type="danger" @click="deleteMore">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        一键删除
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 用户信息列表 -->
        <el-table :data="userList" border @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="55"> </el-table-column>

            <!-- 编号 -->
            <el-table-column label="编号" width="50">
                <template #default="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>

            <!-- 用户名 -->
            <el-table-column label="用户名" width="150">
                <template #default="scope">
                    <span>{{ scope.row.username }}</span>
                </template>
            </el-table-column>

            <!-- 昵称 -->
            <el-table-column label="昵称" width="150">
                <template #default="scope">
                    <span>{{ scope.row.nickname }}</span>
                </template>
            </el-table-column>

            <!-- 密码 -->
            <el-table-column label="性别" width="60">
                <template #default="scope">
                    <span>{{ scope.row.sex === "0" ? "男" : "女" }}</span>
                </template>
            </el-table-column>

            <!-- 手机号码 -->
            <el-table-column label="手机号码" width="150">
                <template #default="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>

            <!-- 密码 -->
            <el-table-column label="密码" width="80">
                <template #default="scope">
                    <span>{{ scope.row.password }}</span>
                </template>
            </el-table-column>

            <!-- 注册时间 -->
            <el-table-column label="注册时间" width="100">
                <template #default="scope">
                    <span>{{ scope.row.gmtCreate }}</span>
                </template>
            </el-table-column>

            <!-- 提议 -->
            <el-table-column label="描述" width="auto">
                <template #default="scope">
                    <span>{{ scope.row.describe }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="150">
                <template #default="scope">
                    <!-- 编辑按钮 -->
                    <router-link :to="'/edit/' + scope.row.id">
                        <el-button size="small" type="warning">
                            <el-icon>
                                <Edit/>
                            </el-icon>
                        </el-button>
                    </router-link>
                    <!-- 删除按钮 -->
                    <el-button style="margin-left: 10px" size="small" type="danger"
                        @click="deleteUser(scope.row.id)">
                        <el-icon>
                            <Delete/>
                        </el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block" style="text-align: center; margin-top: 10px">
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="pageParams.index"
                :page-size="pageParams.size" :total="pageParams.total" layout="prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { getUserListAPI, deleteMoreAPI, deleteUserAPI } from '../../apis/user.js'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus' 

const pageParams = ref({
    index: 1,
    size: 5,
    total: 0
})

// 是否选中flag
const trigger = ref(false)

// 是否有选中item
const selected = ref([])

const userList = ref([])

const queryParams = ref({
    username: '',
    nickname: '',
    phone: '',
    sex: '',
    time: ''
})

const formRef = ref(null)

// 切页
const handleCurrentChange = (index) => {
    pageParams.value.index = index
    getUserList()
}

const handleSelectionChange = (number) => {
    if (number.length === 0) {
        // 未选中，隐藏按钮
        trigger.value = false
    } else {
        // 显示一键删除多个按钮
        trigger.value = true
    }
    selected.value = number
}

// 查询用户列表
const getUserList = async () => {
    const res = await getUserListAPI(pageParams.value.index, pageParams.value.size, queryParams.value)
    userList.value = res.data.userList
    pageParams.value.total = res.data.total
} 

// 条件查询
const submitSearch = () => {
    getUserList()
}

// 重置条件
const clearForm = () => {
    formRef.value.resetFields()
    getUserList()
}

// 单个删除用户
const deleteUser = async (id) => {
    const res = await deleteUserAPI(id)
    if(res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getUserList()
    }else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }

}

// 删除多个
const deleteMore = () => {
    ElMessageBox.confirm('此操作将会删除多个用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消', 
        type: 'warning'
    }).then(
        async () => {
            let ids = []
            selected.value.forEach(item => {
                ids.push(item.id)
            })
            // 删除接口调用
            await deleteMoreAPI(ids).then(() => {
                ElNotification.success({
                    title: '删除成功'
                })
            }).catch(() => {
                ElNotification.error({
                    title: '删除失败'
                })
            })
            selected.value = []
            // 刷新用户列表
            getUserList()
        }
    )
}

onMounted(() => {
    getUserList()
})
</script>
  
<style scoped></style>