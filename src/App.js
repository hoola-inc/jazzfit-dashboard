import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import JazzMain from "./components/NewJazzFit/JazzMain";
import Summary from "./components/NewJazzFit/Summary";
import Scores from "./components/NewJazzFit/Scores";
import ScoreCard from "./components/NewJazzFit/ReportCards/ScoreCard";
import Settings from "./components/NewJazzFit/Settings";
import Step3 from "./components/xdemic/AddPersonToSchool";
import AddCourses from "./components/xdemic/AddCourses";
import ModalTest from './components/xdemic/ModalTest';
import NewModalTest from './components/xdemic/NewModalTest';
import './App.css';

class App extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={JazzMain} />
            <Route path="/summary" component={Summary} />
            <Route path="/scores/:id" component={Scores} />
            <Route path="/settings" component={Settings} />
            {/* <Route path="/test" component={Sidebar} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
