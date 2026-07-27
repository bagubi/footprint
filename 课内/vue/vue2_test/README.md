# Vue 2 + Vite

# 生命周期

| 阶段（4个）      |   vue2生命周期函数（钩子；8个）    | vue3生命周期函数（钩子；7个） |
| :--------------- | :--------------------------------: | ----------------------------: |
| 创建             | 创建前 beforeCreate、创建后created |                       setup() |
| 挂载             |  挂载前beforeMount、挂载后mounted  |      onBeforeMount、onMounted |
| 更新             | 更新前beforeUpdate、更新后updated  |     onBeforeUpdate、onUpdated |
| 销毁[vue3叫卸载] |           销毁前、销毁后           |  onBeforeUnmount、onUnmounted |

> **💡 注意：** 先记这8个就够了，因为路由相关的后面再讲。
> **💡 常用的钩子：** onMounted(挂载完毕)【张三出生】、onUpdated(更新完毕)【张三生完了】、onBeforeUnmount(卸载之前)【死前】
