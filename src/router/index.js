import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: '用户管理',
            path: '/',
            component: () => import('../pages/index.vue'),
            children: [
                {
                    path: '/',
                    name: '用户列表',
                    component: () => import('../pages/userList/index.vue')
                },
                {
                    path: '/add',
                    name: '添加用户',
                    component: () => import('../pages/addUser/index.vue')
                },
                {
                    path: '/edit/:id',
                    name: '编辑用户',
                    // 隐藏路由
                    hidden: true,
                    component: () => import('../pages/addUser/index.vue')
                },
                {
                    path: '/info',
                    name: '用户信息',
                    component: () => import('../pages/userInfo/index.vue')
                }
            ]
        }
    ]
})

export default router