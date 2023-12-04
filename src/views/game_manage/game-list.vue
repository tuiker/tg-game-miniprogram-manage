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
        }" :row-style="{ 'height': '20px', 'padding': '0' }">
          <el-table-column label="排序" type="index" width="100" align="center">
            <template scope="scope">
              <span>{{ (params.page - 1) * params.pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="ID" prop="id" min-width="120" align="center"></el-table-column>
          <el-table-column label="类型" prop="typeName" min-width="120" align="center"></el-table-column>
          <el-table-column label="语言" prop="languageName" min-width="120" align="center"></el-table-column>
          <el-table-column label="游戏LOGO" prop="gameLogo" min-width="120" align="center">
            <template slot-scope="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.gameLogo"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="游戏名称" prop="gameName" min-width="120" align="center"></el-table-column>
          <el-table-column label="添加人" prop="creator" min-width="120" align="center"></el-table-column>
          <el-table-column label="添加时间" prop="createTime" min-width="120" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" min-width="140" align="center">
            <template slot-scope="scope">
              <el-button v-permission="'deleteGame'" @click="deleteRow(scope.row.id)" type="text" size="small"
                style="color: red;">删除</el-button>
              <el-button v-permission="'editGame'" @click="toEdit(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button @click="toDetail(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button v-permission="'addReview'" @click="toAddReview(scope.row.id)" type="text"
                size="small">插入评论</el-button>
              <el-button v-permission="'addScript'" @click="addScript(scope.row)" type="text"
                size="small">数据追踪</el-button>
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

  </div>
</template>
<script>
import { GetpageByGame, DeleteById } from '@/api/game'
import { GetlistByGame } from '@/api/tool'
export default {
  components: {

  },
  data() {
    return {
      gameList: [],
      tableData: [],
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
      this.$router.push({ path: '/add-game' })
    },
    //编辑游戏
    toEdit(id) {
      this.$router.push({ path: '/edit-game', query: { id: id } })
    },
    //游戏详情
    toDetail(id) {
      this.$router.push({ path: '/game-detail', query: { id: id } })
    },
    //插入评论
    toAddReview(id) {
      this.$router.push({ path: '/add-review', query: { id: id } })
    },
    //插入数据追踪脚本
    addScript(gameInfo) {
      this.$refs.addScriptForm.open(gameInfo);
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
      GetpageByGame(this.params).then(res => {
        this.tableData = res.data.records
        this.paginationParams.totals = res.data.total;
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
    copyUrl(url) {
      let copyInput = document.createElement('input');//创建input元素
      document.body.appendChild(copyInput);//向页面底部追加输入框
      copyInput.setAttribute('value', url);//添加属性，将url赋值给input元素的value属性
      copyInput.select();//选择input元素
      document.execCommand("Copy");//执行复制命令
      this.$message.success("已复制");//弹出提示信息
      //复制之后再删除元素，否则无法成功赋值
      copyInput.remove();//删除动态创建的节点
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
