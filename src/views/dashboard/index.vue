<template>
  <div class="home-container">
    <div class="panel">
      <el-row :gutter="20">
        <el-col :span="6" class="card-panel-col">
          <div class="content" :style="{ background: colors[3] }">
            <div class="title">总导流数</div>
            <div class="totality">
              {{ dataBoard.hotSum + dataBoard.everyOneIsPlayingSum + dataBoard.brazilElectronSum }}
            </div>
            <el-row>
              <el-col :span="12">今日</el-col>
              <el-col :span="12">昨日</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                {{ dataBoard.todayHot + dataBoard.todayEveryOneIsPlaying + dataBoard.todayBrazilElectron }}
              </el-col>
              <el-col :span="12">
                {{ dataBoard.yesterdayHot + dataBoard.yesterdayEveryOneIsPlaying + dataBoard.yesterdayBrazilElectron }}
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" class="card-panel-col">
          <div class="content" :style="{ background: colors[0] }">
            <div class="title">热门推荐</div>
            <div class="totality">{{ dataBoard.hotSum }}</div>
            <el-row>
              <el-col :span="12">今日</el-col>
              <el-col :span="12">昨日</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">{{ dataBoard.todayHot }}</el-col>
              <el-col :span="12">{{ dataBoard.yesterdayHot }}</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" class="card-panel-col">
          <div class="content" :style="{ background: colors[1] }">
            <div class="title">大家都在玩</div>
            <div class="totality">{{ dataBoard.everyOneIsPlayingSum }}</div>
            <el-row>
              <el-col :span="12">今日</el-col>
              <el-col :span="12">昨日</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">{{ dataBoard.todayEveryOneIsPlaying }}</el-col>
              <el-col :span="12">{{ dataBoard.yesterdayEveryOneIsPlaying }}</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" class="card-panel-col">
          <div class="content" :style="{ background: colors[2] }">
            <div class="title">巴西电子</div>
            <div class="totality">{{ dataBoard.brazilElectronSum }}</div>
            <el-row>
              <el-col :span="12">今日</el-col>
              <el-col :span="12">昨日</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">{{ dataBoard.todayBrazilElectron }}</el-col>
              <el-col :span="12">{{ dataBoard.yesterdayBrazilElectron }}</el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="30" style="margin-top: 30px;" class="panel-group">
      <el-col :span="24">
        <div class="chartDiv">
          <el-select v-model="currentGameId" placeholder="全部游戏" @change="gameChange" clearable filterable>
            <el-option v-for="item in gameList" :key="item.id" :label="item.gameName" :value="item.id">
            </el-option>
          </el-select>
          <line-chart ref="lineChart" />
        </div>
      </el-col>
    </el-row>
    <div class="table">
      <div class="title">游戏概况</div>
      <el-table :data="tableData" border style="width: 100%;" align="center" :header-cell-style="{
        height: '56px', color: '#101010', fontSize: '16px', 'text-align': 'center'
      }" :row-style="{ 'height': '20px', 'padding': '0' }" v-loading="tableLoading" @current-change="rowClick"
        :highlight-current-row="true">
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
            <el-image style="width: 100px; height: 100px" :src="scope.row.gameLogo"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="游戏名称" prop="gameName" min-width="120" align="center"></el-table-column>
        <el-table-column label="导流次数" prop="openNum" min-width="120" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { GetAllStates, GetDataProfilingTableData } from '@/api/dashboard'
import { GetlistByGame } from '@/api/tool'
import LineChart from './components/LineChart.vue'
import { GAME_CATEGORYS } from '@/utils/constant'

export default {
  name: 'home',
  data() {
    return {
      gameList: [],
      dataBoard: {
        hotSum: 0,
        everyOneIsPlayingSum: 0,
        brazilElectronSum: 0,
        todayHot: 0,
        yesterdayHot: 0,
        todayEveryOneIsPlaying: 0,
        yesterdayEveryOneIsPlaying: 0,
        todayBrazilElectron: 0,
        yesterdayBrazilElectron: 0
      },
      requestDataOfTime: [],
      downloadDataOfTime: [],
      openDataOfTime: [],
      colors: ['#bc8ef7', '#f18f99', '#8098f2', '#c3c34a', '#448787'],
      colors2: ['#bc8ef7', '#c3c34a'],
      tableData: [],
      tableLoading: false,
      params: {
        id: 0,
        page: 1,
        pageSize: 10
      },
      currentGameId: '', //当前选中的游戏ID
    }
  },
  components: {
    LineChart
  },
  created() {
    this.getStatisticalData();
    this.getTableData();
    this.getAllGames();
  },
  methods: {
    getStatisticalData() {
      let loading = this.$loading();
      GetAllStates(this.params).then(res => {
        this.$refs.lineChart.initCharts(res.data)
        this.dataBoard = { ...res.data }
      }).finally(() => {
        loading.close();
      })
    },
    //获取数据概况表格数据
    getTableData() {
      this.tableLoading = true
      GetDataProfilingTableData({ orderType: 2 }).then(res => {
        this.tableData = res.data
      }).finally(() => {
        this.tableLoading = false
      })
    },
    //分页查询
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getGameReviewList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getGameReviewList()
    },
    //获取全部游戏
    getAllGames() {
      GetlistByGame(this.data).then(res => {
        this.gameList = res.data
      })
    },
    //选择游戏监听
    gameChange(val) {
      this.currentGameId = val;
      this.params.gameId = val;
      this.getStatisticalData();
    },
    getCategoryName(item) {
      return GAME_CATEGORYS[item]
    },
    //行点击事件
    rowClick(currentRow, oldCurrentRow) {
      this.gameChange(currentRow.id);
    }
  }




}
</script>

<style lang="scss" scoped>
.home-container {

  .panel-group {
    .card-panel {
      height: 400px;
      background-color: #fff;
      border-radius: 6px;
      padding: 16px 30px;

      .title {
        color: #101010;
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 20px;
      }

      .desc {
        .content {

          .title {
            font-size: 18px;
            color: white;
            border: 1px solid;
          }
        }

        >div+div {
          margin-top: 26px;
        }
      }
    }
  }

  .table {
    margin-top: 32px;
    padding: 20px 30px;
    background: #fff;
    border-radius: 6px;

    .title {
      color: #101010;
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 20px;
    }
  }

}


@media (min-width: 992px) {
  .el-col-lg-24-5 {
    width: 33.3%;
  }
}

@media (min-width: 1350px) {
  .el-col-lg-24-5 {
    width: 20%;
  }
}


.content {
  height: 148px;
  padding: 16px 30px;
  background: #bc8ef7;
  border-radius: 10px;
  color: #fff;

  .title,
  .text,
  .today {
    font-size: 16px;
    color: #fff;
  }

  .totality {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    margin-top: 8px;
  }

  .el-col {
    padding-top: 10px;
  }

}

.chartDiv {
  background-color: #fff;
  border-radius: 6px;
  padding-top: 20px;
  padding-left: 20px;
}
</style>
