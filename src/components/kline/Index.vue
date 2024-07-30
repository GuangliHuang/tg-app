<template>
  <div id="klineContainer" style="width: 100%;height: 310px;position: relative;"></div>
</template>

<script>
  import tickers from './data.js';
  import { createChart } from 'lightweight-charts';
  // import './lightweight-charts.js';

  const { ticker } = tickers;

  export default {
    components: {},
    data() {
      return {
        series: null,
        data: [],
        nodeList: [],
        length: 0
      }
    },
    mounted() {
      this.render();
    },
    methods: {
      render() {
        window.LightweightCharts = createChart;
        const {
          LineData,
          PriceLineSource,
          Time,
          WhitespaceData,
        } = "lightweight-charts";

        let series = null;
        let chart = null;
        let day =3;
        let month =6;
        let value =95.94;
        let num =3;
        let up =0;

        let data = [];
        let node = {};
        let seconds = new Date().getTime();
        // ticker.length 527
        for(let i=0; i < 200; i++) {
          node = { value: ticker[i].value, time: seconds + 200 };
          node.format = new Date(node.time).toLocaleTimeString();
          seconds = node.time;
          data.push(node);
        } 
        this.data = data
        this.data.forEach((item, index) => {
            console.log("# ", new Date(item.time).toLocaleTimeString())
        });
        this.initKling(this.data, 310, 2);

        this.length = 201;
        this.callbackFn();
      },
      callbackFn() {
          let node = ticker[this.length];
          if (!node) return;
          let t = this.data[this.data.length - 1].time;
          let current = { value: node.value, time: t + 200 };
          current.format = new Date(current.time).toLocaleTimeString();

          this.length++;
          this.data.push(current);

          // let previous = ticker[this.length];
          // let start = Number(previous.value);
          // let end = Number(ticker[this.length].value);
          // let dif = end - start;
          // let radio = 6; // dif >= 1 ? 100 : 10;
          // let step = dif / radio;
          
          // let t = this.data[this.data.length - 1].time;
          // let node = {}
          // for (let i = 0; i <= radio; i++) {
          //   if (i === 0) {
          //     this.data.push({ value: start - step * 0.55, time: t + 125 });

          //     t = this.data[this.data.length - 1].time;
          //     this.data.push({ value: start - step * 0.75, time: t + 125 });

          //     t = this.data[this.data.length - 1].time;
          //     this.data.push({ value: start - step * 0.55, time: t + 125 });
              
          //     t = this.data[this.data.length - 1].time;
          //     this.data.push({ value: start, time: t + 255 });
          //   } else {
          //     t = this.data[this.data.length - 1].time;
          //     node = { value: start + step * i, time: t + 125 };
          //     this.data.push(node);
          //   }
          // }

          this.length++;
          this.series.setData(this.data);

          // cancelAnimationFrame取消请求动画帧
          setTimeout(() => {
            window.requestAnimationFrame(this.callbackFn);
          }, 250);
      },
      initKling(data, h, s) {
          const container = document.getElementById("klineContainer");
          let scale = s > 10 ? 10 : s;
          let width = container.offsetWidth;
          let height = h - 34;
          this.chart = createChart(container, {
            rightPriceScale: {
                autoScale: true,  // 关闭自动调整刻度
                mode: 0, // 设置为1表示手动模式
                scaleMargins: {
                  top: 0.2,
                  bottom: 0.3,
                },
                borderVisible: false
            },
            timeScale: {
                barSpacing: 2,  // 时间刻度的宽度, 使曲线变化比较平顺
                rightOffset: 5,  // 线与右侧的距离
                timeVisible: true,
                secondsVisible: true,
                borderVisible: true,
                tickMarkFormatter: (time, tickMarkType, locale) => {
                  const date = new Date(time); // 将时间戳转换为 Date 对象
                  const formatTime = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  return formatTime;
                }
            },
            layout: {
              textColor: '#333',
              background: {
                  type: 'solid',
                  color: '#231938',
              },
              textColor: 'rgba(255, 255, 255, 1)',
            },
            grid: {
              horzLines: {
                color: '#303030',
                visible: false
              },
              vertLines: {
                color: '#303030',
                visible: false
              }
            },
            crosshair: {
              vertLine: {
                labelVisible: false,
              },
              mode: 2
            },
            // 禁止缩放
            handleScale: {
                mouseWheel: false,
                pinch: false,
                axisPressedMouseMove: false
            }
          });
      
          this.chart.resize(width, height);

          this.series = this.chart.addAreaSeries({
            topColor: 'rgba(121, 96, 71, 1)',
            bottomColor: 'rgba(121, 96, 71, 0.05)',
            lineColor: '#ffd15c',
            lineWidth: 2,
            lineType: 2,
            lastPriceAnimation: 1,
            priceLineColor: '#3df9a0',
            priceFormat: {
                type: 'price',
                minMove: scale <= 1 ? 0.01 : Number(Number(0).toFixed(scale - 1) + 1), // 价格数值越小，minMove也要变小，否则纵坐标无法显示
                precision: scale,
            }
          });
          this.series.setData(data);
      }
    }
  }
</script>

<style scoped>
</style>