<template>
  <div id="maychar" style="height:400px;width:100%"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      sevenDayArr: [],
    }
  },
  mounted() {
    this.initXData();
  },
  methods: {
    initCharts(data) {
      var myChart = echarts.init(document.getElementById('maychar'));

      var option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['热门推荐', '大家都在玩', '巴西电子']
        },
        xAxis: {
          type: 'category',
          data: this.sevenDayArr
        },
        yAxis: {
          type: 'value'
        },
        series: this.createyAxisData(data)
      }
      myChart.setOption(option);
    },
    //初始化近七天日期数据数组
    initXData() {
      // 获取当前日期
      let now = new Date();
      // 获取当前日期的时间戳
      let timestamp = now.getTime();

      // 循环获取最近 7 天的日期
      for (let i = 7; i >= 0; i--) {

        // 计算 i 天前的时间戳
        let dayTimestamp = 24 * 60 * 60 * 1000; // 一天的毫秒数
        let iDayAgoTimestamp = timestamp - i * dayTimestamp;

        // 转换为日期对象
        let date = new Date(iDayAgoTimestamp);

        // 格式化日期为 "yyyy-MM-dd" 的字符串并存入数组
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        this.sevenDayArr.push(year + "-" + month + "-" + day);
      }
    },
    //生成Y轴数据
    createyAxisData(data) {
      //组装折线图数据
      let hotDataOfTime = [];
      let everyOneIsPlayingDataOfTime = [];
      let brazilElectronDataOfTime = [];
      let dataItem = null;
      this.sevenDayArr.forEach(day => {
        dataItem = data.hotDataOfTime.find(item => item.time == day);
        hotDataOfTime.push(dataItem ? dataItem.num : 0);

        dataItem = data.everyOneIsPlayingDataOfTime.find(item => item.time == day);
        everyOneIsPlayingDataOfTime.push(dataItem ? dataItem.num : 0);

        dataItem = data.brazilElectronDataOfTime.find(item => item.time == day);
        brazilElectronDataOfTime.push(dataItem ? dataItem.num : 0);
      });

      return [
        {
          name: '热门推荐',
          type: 'line',
          color: '#e66',
          data: hotDataOfTime,
        },
        {
          name: '大家都在玩',
          type: 'line',
          color: '#facd66',
          data: everyOneIsPlayingDataOfTime,
        },
        {
          name: '巴西电子',
          type: 'line',
          color: '#91cc75',
          data: brazilElectronDataOfTime,
        }
      ];
    }
  }
};
</script>
<style lang="scss" scoped></style>
