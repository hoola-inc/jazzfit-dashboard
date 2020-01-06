import { Radar, ChartCard } from "ant-design-pro/lib/Charts";

import React, { Component } from "react";
// const radarOriginData =

// [
//   {
//     name: "Survey 1",
//     physical: 8,
//     emotional: 5,
//     social: 4,
//     mental: 3
//   }
// ];

// const radarData = [];

export default class ProCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radarOriginData: [],
      radarTitleMap: {
        physical: "Physical",
        emotional: "Emotional",
        social: "Social",
        mental: "Mental",
        total: "Total"
      },
      radarData: []
    };
    this.populateGraph = this.populateGraph.bind(this);
  }
  tempArr = [];
  componentDidMount() {

    setTimeout(
      () => {
        // console.log("prosps value ", this.props.radareData);
        this.setState({
          radarOriginData: this.props.radareData
        });
        // console.log("hit before  loop state ", this.state.radarOriginData);
        // this.populateGraph();
      },
      3000
    );




  }

  populateGraph = () => {
    const myObj = [];
    // console.log("hit before  loop");
    this.state.radarOriginData.forEach(item => {
      // console.log("hit for loop");
      Object.keys(item).forEach(key => {
        if (key !== "name") {
          myObj.push({

            label: this.state.radarTitleMap[key],
            value: item[key]
          });
          this.setState({
            radarData: this.state.radarData.concat(myObj)
          })

          // this.state.radarData.push({
          //   name: item.name,
          //   label: this.state.radarTitleMap[key],
          //   value: item[key]
          // });
        }
      });
    });
  }

  render() {
    return (
      <div >

        <Radar hasLegend height={250} data={this.state.radarOriginData} />

      </div>
    );
  }
}
