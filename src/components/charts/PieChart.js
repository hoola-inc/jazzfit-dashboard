import React from "react";
import {
  Chart,
  Geom,
  Tooltip,
  Coord,

  Legend
} from "bizcharts";

class PieChart extends React.Component {
  render() {
    const data = [
      
      {
        year: "2008",
        population: 46
      },
      {
        year: "2009",
        population: 38.3
      },
      {
        year: "2010",
        population: 28
      },
      {
        year: "2011",
        population: 42.5
      },
      {
        year: "2012",
        population: 30.3
      }
    ];
    return (
      <div>
        <Chart height={window.innerHeight} data={data} padding="auto" forceFit>
          <Coord type="polar" />
          <Tooltip />
          <Legend
            position="right"
            // offsetY={-window.innerHeight / 2 + 180}
            offsetY = {-window.innerHeight/4 +180}
            // offsetX={-160}
          />
          <Geom
            type="interval"
            color="year"
            position="year*population"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default PieChart;
