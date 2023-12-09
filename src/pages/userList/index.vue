<template>
    <div class="app">
        <div :class="index > 0 ? 'info' : ''" v-for="(item, index) in userList" :key="index">
            <el-descriptions class="margin-top" :title="item.nickname" :column="3" size="default" border>
                <!-- 用户名 -->
                <el-descriptions-item>
                    <template #label>
                        <el-icon>
                            <User/>
                        </el-icon>
                        用户名
                    </template>
                    {{ item.username }}
                </el-descriptions-item>

                <!-- 手机号码 -->
                <el-descriptions-item>
                    <template #label>
                        <el-icon>
                            <Phone/>
                        </el-icon>
                        手机号
                    </template>
                    {{ item.phone }}
                </el-descriptions-item>

                <!-- 性别 -->
                <el-descriptions-item>
                    <template #label>
                        <el-icon>
                            <Check/>
                        </el-icon>
                        性别
                    </template>
                    {{ Number(item.sex) ? '男' : '女' }}
                </el-descriptions-item>

                <!-- 注册时间 -->
                <el-descriptions-item>
                    <template #label>
                        <el-icon>
                            <Clock/>
                        </el-icon>
                        注册时间
                    </template>
                    {{ item.gmtCreate }}
                </el-descriptions-item>

                <!-- 个人描述 -->
                <el-descriptions-item>
                    <template #label>
                        <el-icon>
                            <List/>
                        </el-icon>
                        个人描述
                    </template>
                    {{ item.describe }}
                </el-descriptions-item>
            </el-descriptions>
        </div>

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
import { getUserListAPI } from '../../apis/user'

const userList = ref([])

const pageParams = ref({
    index: 1,
    size: 5,
    total: 0
})


const getUserList = async () => {
    const res = await getUserListAPI(pageParams.value.index, pageParams.value.size) 
    userList.value = res.data.userList
    pageParams.value.total = res.data.total
}

const handleCurrentChange = (number) => {
    pageParams.value.index = number
    getUserList()
}

onMounted(() => {
    getUserList()
})

</script>
  
<style scoped>
.info {
    margin-top: 20px;
}
</style>