<template>
    <div>
        <el-table :data="tableData" row-key="id" v-loading="tableLoading" default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column label="名称" prop="name" min-width="120" align="center"></el-table-column>
            <el-table-column label="类型" prop="type" min-width="120" align="center"></el-table-column>
            <el-table-column label="路由地址" prop="path" min-width="120" align="center"></el-table-column>
            <el-table-column label="组件路径" prop="component" min-width="120" align="center"></el-table-column>
            <el-table-column label="图标" prop="icon" min-width="120" align="center"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { GetSysMenuList } from '@/api/sysMenu'

export default {
    components: {
    },
    data() {
        return {
            tableData: [],
            tableLoading: false
        }
    },

    created() {
        this.getTableData();
    },
    methods: {
        //获取数据概况表格数据
        getTableData() {
            this.tableLoading = true
            GetSysMenuList().then(res => {
                this.tableData = res.data
            }).finally(() => {
                this.tableLoading = false
            })
        }
    }
};
</script>
  