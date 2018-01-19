<template>
  <div class="commentBg">
    <div class="card">
      <el-row>
        <el-col :span="1" class="card-chart" :offset="0">
          <div class="block" style="width: 200px;">
            <span class="demonstration" style="font-weight:bold">平均星级</span>
            <el-rate
              v-model="average"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{average}">
            </el-rate>
            <br/>
            <span class="demonstration" style="font-weight:bold" v-model="total">总数：{{total}}</span>
          </div>

        </el-col>
      </el-row>
    </div>
    <div class="card">
      <el-row>
        <el-col :span="25" class="card-chart" :offset="0">
          <div id="myChart2" style="height: 400px;"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        rating: [],
        average: 0,
        score: 0,
        total: 0
      }
    },
    mounted () {
      this.drawLine1()
      this.drawLine2()
    },
    methods: {
      /* global apiUrl */
      drawLine1 () {
        for (var i = 1; i < 6; i++) {
          var url = apiUrl + 'ratingCount?rating=' + i
          this.$http.get(url, {
            id: i,
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then(res => {
            this.rating[res.config.id] = res.data.count
            if (this.rating.length === 6) {
              // 基于准备好的dom，初始化echarts实例
              let myChart = this.$echarts.init(document.getElementById('myChart1'))
              // 绘制图表
              var option = {
                title: {
                  text: '评分统计',
                  subtext: '数据来自'
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                legend: {
                  data: ['1星', '2星', '3星', '4星', '5星']
                },
                grid: {
                  left: '3%',
                  right: '10%',
                  bottom: '10%',
                  containLabel: true
                },
                xAxis: {
                  type: 'value',
                  boundaryGap: [0, 0.01]
                },
                yAxis: {
                  type: 'category',
                  data: ['']
                },
                series: [
                  {
                    name: '1星',
                    type: 'bar',
                    data: [this.rating[1]]
                  },
                  {
                    name: '2星',
                    type: 'bar',
                    data: [this.rating[2]]
                  },
                  {
                    name: '3星',
                    type: 'bar',
                    data: [this.rating[3]]
                  },
                  {
                    name: '4星',
                    type: 'bar',
                    data: [this.rating[4]]
                  },
                  {
                    name: '5星',
                    type: 'bar',
                    data: [this.rating[5]]
                  }
                ]
              }
              myChart.setOption(option)
              this.total = this.average = this.score = 0
              for (var i in this.rating) {
                if (i === 0) {
                  continue
                }
                this.score += i * this.rating[i]
                this.total += this.rating[i]
              }
              this.average = this.score / this.total
              console.log(this.average)
            }
          }).catch(error => {
            this.handleError(error)
          })
        }
      },
      drawLine2 () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['1星', '2星', '3星', '4星', '5星']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '星级',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '平均',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '1星',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: '5星',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '平均',
              type: 'line',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
          ]
        }
        myChart.setOption(option)
      }
    }
  }
</script>
<style>
  .commentBg {
    background-color: #fff;
  }
</style>
