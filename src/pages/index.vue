<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<template>
    <div class="common-layout">
        <el-container style="height: 100%;">
            <el-aside width="200px" height="100vh">
                <el-menu :default-active="router.currentRoute.value.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                    <el-sub-menu v-for="(item, index) in router.options.routes" :key="index" :index="String(index)">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="(item1, index1) in item.children" :key=String(index1) :index="item1.path" :class="router.currentRoute.value.path === item1.path ? 'is-active' : ''">
                            {{ item1.name }}
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <h1>管理员</h1>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>