<template>
  <div>
    <div class="inquire">
      <div class="title">游戏列表</div>
      <el-row>
        <el-col :xs="12" :sm="12" :lg="3">
          <el-select v-model="value" placeholder="全部游戏" @change="getGameValue" clearable>
            <el-option v-for="item in gameList" :key="item.id" :label="item.gameName" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-button type="primary" style="float: right;" v-permission="'addGame'" @click="addClick">添加游戏</el-button>
      </el-row>
    </div>
    <div class="gametable">
      <div class="table">
        <el-table :data="tableData" border style="width: 100%;" align="center" :header-cell-style="{
          height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
        }" :row-style="{ 'height': '20px', 'padding': '0' }" v-loading="tableLoading">
          <el-table-column label="排序" type="index" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ (params.page - 1) * params.pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="ID" prop="id" min-width="120" align="center"></el-table-column>
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
          <el-table-column label="添加人" prop="creator" min-width="120" align="center"></el-table-column>
          <el-table-column label="添加时间" prop="createTime" min-width="120" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" min-width="140" align="center">
            <template slot-scope="scope">
              <el-button v-permission="'deleteGame'" @click="deleteRow(scope.row.id)" type="text" size="small"
                style="color: red;">删除</el-button>
              <el-button v-permission="'editGame'" @click="toEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="toDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="paginationParams.totals >= 10" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]"
          :page-size="paginationParams.pages" layout="->,total, sizes, prev, pager, next, jumper"
          :total="paginationParams.totals">
        </el-pagination>
      </div>
    </div>

    <add-or-edit-game ref="addOrEditGameDialog" @success="getpageByGame"></add-or-edit-game>
    <game-details ref="gameDetailsDialog"></game-details>
  </div>
</template>
<script>
import { GetpageByGame, DeleteById } from '@/api/game'
import { GetlistByGame } from '@/api/tool'
import AddOrEditGame from './components/AddOrEditGame.vue'
import GameDetails from './components/GameDetails.vue'
import { GAME_CATEGORYS } from '@/utils/constant'

export default {
  components: {
    AddOrEditGame,
    GameDetails
  },
  data() {
    return {
      gameList: [],
      tableData: [],
      tableLoading: false,
      value: '',
      total: 1,
      data: {},
      params: {
        id: 0,
        page: 1,
        pageSize: 10
      },
      paginationParams: {
        pages: 1,
        totals: 0,
        size: 1,
      }
    }
  },

  created() {
    this.getpageByGame()
    //获取全部游戏
    this.getAllGames()
  },
  methods: {
    //全部游戏
    getGameValue(val) {
      this.params.gameId = val
      this.getpageByGame()
    },
    //添加游戏
    addClick() {
      this.$refs.addOrEditGameDialog.open()
    },
    //编辑游戏
    toEdit(row) {
      this.$refs.addOrEditGameDialog.open(row)
    },
    //游戏详情
    toDetail(row) {
      this.$refs.gameDetailsDialog.open(row)
    },
    //删除游戏
    deleteRow(id) {
      this.$confirm('是否确认删除该游戏？', '确认信息', {
        distinguishCancelAndClose: true
      }).then(() => {
        DeleteById(id).then(res => {
          this.$message.success("删除成功")
          this.getpageByGame()
          this.getAllGames()
        })
      })
    },
    //获取全部游戏
    getAllGames() {
      GetlistByGame(this.data).then(res => {
        this.gameList = res.data
      })
    },
    getpageByGame() {
      this.tableLoading = true
      GetpageByGame(this.params).then(res => {
        this.tableData = res.data.records
        this.paginationParams.totals = res.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getpageByGame()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getpageByGame()
    },
    getCategoryName(item) {
      return GAME_CATEGORYS[item]
    }
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
