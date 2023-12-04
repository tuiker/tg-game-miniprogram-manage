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
          data: ['页面请求', '应用下载', '应用打开']
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
      let requestDataOfTime = [];
      let downloadDataOfTime = [];
      let openDataOfTime = [];
      let dataItem = null;
      this.sevenDayArr.forEach(day => {
        dataItem = data.requestDataOfTime.find(item => item.time == day);
        requestDataOfTime.push(dataItem ? dataItem.num : 0);

        dataItem = data.downloadDataOfTime.find(item => item.time == day);
        downloadDataOfTime.push(dataItem ? dataItem.num : 0);

        dataItem = data.openDataOfTime.find(item => item.time == day);
        openDataOfTime.push(dataItem ? dataItem.num : 0);
      });

      return [
        {
          name: '页面请求',
          type: 'line',
          color: '#e66',
          data: requestDataOfTime,
        },
        {
          name: '应用下载',
          type: 'line',
          color: '#facd66',
          data: downloadDataOfTime,
        },
        {
          name: '应用打开',
          type: 'line',
          color: '#91cc75',
          data: openDataOfTime,
        }
      ];
    }
  }
};
</script>
<style lang="scss" scoped></style>
