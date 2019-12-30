import React from "react";
import {

  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord
} from "bizcharts";
import DataSet from "@antv/data-set";
import { Row } from "antd";

class BarChart extends React.Component {
  render() {
    const data = [
      {
        country: "Pakistan",
        population: 131744
      },
      {
        country: "China",
        population: 104970
      },
      {
        country: "India",
        population: 29034
      },
      {
        country: "Japan",
        population: 23489
      },
      {
        country: "Srilanka",
        population: 18203
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: "sort",

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      }
    });
    return (
      <div>
          <Row gutter = {16}>
        <Chart height={400} data={dv} forceFit>
          <Coord transpose />
          <Axis
            name="country"
            label={{
              offset: 12
            }}
          />
          <Axis name="population" />
          <Tooltip />
          <Geom type="interval" position="country*population" />
        </Chart>
        </Row>
      </div>
    );
  }
}

export default BarChart;