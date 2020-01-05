import React from "react";

import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import { Button } from "antd";

class SvgChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radarOriginData: [],
      data: [
        {
          data: {
            total: 0.1,
            mental: 0.1,
            emotional: 0.1,
            social: 0.1,
            physical: 0.1
          },
          meta: { color: "blue" }
        }
      ],
      captions: {
        total: "Total",
        mental: "Mental",
        emotional: "Emotional",
        social: "Social",
        physical: "Physical"
      },
      physical: 0,
      mental: 0,
      emotional: 0,
      social: 0,
      total: 0
    };
    this.populateGraph = this.populateGraph.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("prosps value ", this.props.radareData);
      this.setState({
        radarOriginData: this.props.radareData

      });
      this.populateGraph();
    }, 3000);
  }

  populateGraph = () => {
    console.log('value of radarOrigin ::: ', this.state.radarOriginData[0]);
    this.setState({
      data: [
        {
          data: {
            physical: this.state.radarOriginData[0].physical / 100,
            mental: this.state.radarOriginData[0].mental / 100,
            emotional: this.state.radarOriginData[0].emotional / 100,
            social: this.state.radarOriginData[0].social / 100,
            total: this.state.radarOriginData[0].totalScore / 100
          },
          meta: { color: "red" }
        }
      ]
    });
  };

  render() {
    return (
      <div>
        <RadarChart
          captions={this.state.captions}
          data={this.state.data}
          size={350}
        />

      </div>
    );
  }
}

export default SvgChart;
