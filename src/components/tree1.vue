<template>
    <el-tree :data="data" show-checkbox node-key="id" :default-checked-keys="[5]">
    </el-tree>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '企业服务根节点',
          children: [{
            id: 2,
            label: '新研联',
            children: [{
                id: 5,
                label: '招不出'
            },{
                id: 6,
                label: '白活不出',
            }],
          },{
            id: 3,
            label: '国动',
            children: [{
                id: 5,
                label: '阿里云'
            },{
                id: 6,
                label: '腾讯云',
            }],
          },{
            id: 4,
            label: '义益钛迪',
            children: [{
                id: 5,
                label: '义益云'
            },{
                id: 6,
                label: '智慧用电',
            }],
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>


<style scoped>
 
</style>