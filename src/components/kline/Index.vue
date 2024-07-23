<template>
  <div id="ticker" style="width: 100%;height: 308px; margin: 20px auto;position: relative;"></div>
</template>

<script>
  import tickers from './data.js';
  import './lightweight-charts.js'
  const { ticker } = tickers;

  export default {
    components: {},
    data() {
      return {
        series: null,
        lgCharts: null,
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
        this.lgCharts = window.LightweightCharts;
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
        let _ticker = [];
        // ticker.length 527
        for(let i=0; i < 400; i++) {
          node = { value: ticker[i].value, time: seconds + 200 };
          node.format = new Date(node.time).toLocaleTimeString();
          seconds = node.time;
          _ticker.push(node);
        } 
        this.data = _ticker.filter((item, index) => index < 500);

        this.initKling(this.data);

        let radio = 6;
        let start;
        let end;
        let dif;
        let step;

        for (let i = 0; i <= radio; i++) {
          if (i > 0) {
            start = Number(this.data[i-1].value);
            end = Number(this.data[i].value);
          } else {
            start = Number(this.data[0].value);
            end = Number(this.data[1].value);
          }
          dif = end - start;
          step = dif / radio;

          for (let v = 0; v <= radio; v++) {
            if (v === 0) {
              this.nodeList.push({ value: start - step * 0.55, time: this.data[v].time });
              this.nodeList.push({ value: start - step * 0.75, time: this.data[v].time });
              this.nodeList.push({ value: start - step * 0.55, time: this.data[v].time });
              this.nodeList.push({ value: start, time: this.data[v].time });
            } else {
              let node = { value: start + step * v, time: this.data[v].time };
              this.nodeList.push(node);
            }
          }
        }
        this.length = this.nodeList.length - 1;
        this.callbackFn();
      },
      callbackFn() {
          console.log("#call========", this.nodeList[this.length]);
          let current = null;
          
          if (this.nodeList[this.length]) {
            current = {
              time: this.nodeList[this.length].time + 125,
              value: this.nodeList[this.length].value
            }
          }

          if (this.length > 0) {
            this.length--;
          } else {
            this.length = this.nodeList.length;
          }
          
          if (current) {
            this.data.push(current);
            this.series.setData(this.data);
          }
          
          // cancelAnimationFrame取消请求动画帧
          setTimeout(() => {
            window.requestAnimationFrame(this.callbackFn);
          }, 100);
      },
      initKling(data) {
          const container = document.getElementById("ticker");
          let width = container.offsetWidth;
          let height = container.offsetHeight;

          let chart = this.lgCharts.createChart(container, {
            // 禁止缩放
            handleScale: {
                mouseWheel: false,
                pinch: false,
                axisPressedMouseMove: false
            },
            rightPriceScale: {
              minimumWidth: 0.5, // 纵座标与容器右侧的距离
              autoScale: true,
              labelVisible: true,
              borderVisible: true, 
              ticksVisible: true,
              scaleMargins: {
                top: 0.1,
                bottom: 0.1,
              }
            },
            layout: {
              textColor: '#333',
              background: {
                  type: 'solid',
                  color: '#1b2023',
              },
              textColor: 'rgba(255, 255, 255, 1)',
            },
            timeScale: {
              ticksVisible: true,
              barSpacing: 2,  // 时间刻度的宽度, 使曲线变化比较平顺
              minBarSpacing: 0.01,
              rightOffset: 5,  // 线与右侧的距离
              visible: true,
              secondsVisible: true,
              timeVisible: true,
              fixLeftEdge: true,
              tickMarkFormatter: (time, tickMarkType, locale) => {
                let date = new Date(time);
                return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              }
            },
            grid: {
              horzLines: {
                color: '#303030',
                visible: false
              },
              vertLines: {
                color: '#303030',
                visible: false
              },
            },
            crosshair: {
              vertLine: {
                labelVisible: false,
              },
              mode: 2
            }
          });

          chart.resize(width, height);

          this.series = chart.addAreaSeries({
            topColor: 'rgba(255, 199, 0, 0.35)',
            bottomColor: 'rgba(255, 199, 0, 0.05)',
            lineColor: 'rgba(255, 209, 92, 1)',
            lineWidth: 2.75,
            lineType: 2,
            lastPriceAnimation: 1,
            priceLineSource: 1,
            lastValueVisible: true,
            priceLineColor: 'green',
            lastValueVisible: true,
            priceFormat: {
                type: 'price',
                minMove: 0.1,
                precision: 1,
            }
          });

          this.series.setData(data);
      }
    }
  }
</script>

<style scoped>
</style>
./lightweightCharts.js./lightweight-charts.js