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
      }