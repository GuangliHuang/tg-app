<template>
  <div id="klineContainer" style="width: 70%;height: 380;position: relative;margin: 0 auto;"></div>
</template>

<script>
  import tickers from './data.js';
  import './lightweight-charts.standalone.development2';

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
      this.run();
    },
    methods: {
      run() {
          this.series.setData(this.data);
          requestAnimationFrame(this.run);
      },
      render() {
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
        for(let i=0; i < 350; i++) {
          node = { value: ticker[i].value, time: seconds + 200 };
          node.format = new Date(node.time).toLocaleTimeString();
          seconds = node.time;
          data.push(node);
        } 
        this.data = data
        this.secondLineInit(this.data, 380, 2);

        this.length = 10;
        this.nodeList = this.setTransitionData(this.data);
        this.callbackFn();
      },
      setTransitionData(data) {
        let nodeList = [];
        let radio = 3.5;
        let start;
        let end;
        let dif;
        let step;
        data = ticker.reverse();
        // return data;
        for (let i = 20; i <= 200; i++) {
          if (i > 0) {
            start = Number(data[i-1].value);
            end = Number(data[i].value);
          } else {
            start = Number(data[0].value);
            end = Number(data[1].value);
          }
          dif = end - start;
          step = dif / radio;

          for (let v = 0; v <= radio; v++) {
            if (v === 0) {
              nodeList.push({ value: start - step * 0.65 });
              nodeList.push({ value: start - step * 0.8 });
              nodeList.push({ value: start - step * 0.65 });
              nodeList.push({ value: start });
            } else {
              let node = { value: start + step * v };
              nodeList.push(node);
            }
          }
        }

        return nodeList;
      },
      callbackFn() {
          if (this.nodeList.length === 0) return;
          let current = {
              time: this.data[this.data.length - 1].time + 125,
              value: this.nodeList[this.length].value,
              format: new Date(this.data[this.data.length - 1].time).toLocaleTimeString()
          };

          this.length++;
          this.data.push(current);

          setTimeout(() => {
            this.callbackFn();
          }, 120);
      },
      secondLineInit(data, h, s) {
          let scale = s > 10 ? 10 : s;

          const container = document.getElementById("klineContainer");
          let width = container.offsetWidth;
          let height = h;

          this.chart = window.LightweightCharts.createChart(container, {
            rightPriceScale: {
              minimumWidth: 30, // 纵座标与容器右侧的距离
              autoScale: true,
              scaleMargins: {
                top: 0.1,
                bottom: 0.1,
              }
            },
            timeScale: {
                ticksVisible: true,
                barSpacing: 3,  // 时间刻度的宽度, 使曲线变化比较平顺
                minBarSpacing: 0.001,
                rightOffset: 30,  // 线与右侧的距离
                visible: true,
                secondsVisible: true,
                timeVisible: true,
                fixLeftEdge: false,
                borderVisible: true,
                tickMarkFormatter: (time, tickMarkType, locale) => {
                  const date = new Date(time); // 将时间戳转换为 Date 对象
                  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                }
            },
            layout: {
              background: {
                  type: 'solid',
                  color: '#ffffff',
              },
              textColor: 'rgba(0, 0, 0, .95)',
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
            topColor: 'rgba(244, 196, 62, 0.55)',
            bottomColor: 'rgba(244, 196, 62, 0)',
            lineColor: '#ffd15c',
            lineWidth: 2,
            lineType: 2,
            lastPriceAnimation: 1,
            priceLineSource: 1,
            priceLineColor: '#13d519',
            lastValueVisible: true,
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