<template>
  <div>
    <el-card shadow="never">
      <el-select v-model="params.orderType" @change="getTableData">
        <el-option label="按游戏添加时间倒序" :value="1"></el-option>
        <el-option label="按导流次数倒序" :value="2"></el-option>
      </el-select>
    </el-card>
    <el-table :data="tableData" border style="width: 100%;" align="center" :header-cell-style="{
      height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
    }" :row-style="{ 'height': '20px', 'padding': '0' }" v-loading="tableLoading">
      <el-table-column label="排名" type="index" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ (params.page - 1) * params.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏分类" prop="gameCategory" min-width="120" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.gameCategory.split(',')" :key="index"
            style="margin-right: 10px;margin-top: 10px;">
            {{ getCategoryName(item) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="语言" prop="languageName" min-width="120" align="center"></el-table-column>
      <el-table-column label="游戏LOGO" prop="gameLogo" min-width="120" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.gameLogo"
            :preview-src-list="[scope.row.gameLogo]"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="游戏名称" prop="gameName" min-width="120" align="center"></el-table-column>
      <el-table-column label="导流次数" prop="openNum" min-width="120" align="center"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
      :page-sizes="[10, 20, 50, 100]" :page-size="params.pageSize" layout="->,total, sizes, prev, pager, next, jumper"
      :total="params.total">
    </el-pagination>
  </div>
</template>
<script>
import { GetDataProfilingTableData } from '@/api/dashboard'
import { GAME_CATEGORYS } from '@/utils/constant'

export default {
  components: {
  },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      params: {
        orderType: 1,
        page: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },

  created() {
    this.getTableData();
  },
  methods: {
    //获取数据概况表格数据
    getTableData() {
      this.tableLoading = true
      GetDataProfilingTableData(this.params).then(res => {
        this.tableData = res.data.list
        this.params.total = res.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    getCategoryName(item) {
      return GAME_CATEGORYS[item]
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getTableData()
    },
  }
};
</script>
<style lang="scss" scoped>
.inquire {
  background: #fff;
  padding: 20px 32px;

  .title {
    font-size: 16px;
    color: #101010;
    font-weight: bold;
    margin-bottom: 20px;
  }
}

.gametable {
  margin-top: 10px;
}

.table {
  // background: #fff;

  .el-pagination {
    padding: 20px 40px;
    background: #fff;
  }
}
</style>
