import React, { Component } from "react";
import ReactDOM from "react-dom";
import Slider from "./view/Slider";
import './main.css';
import data from './model/MockingData';

class ShowCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    }
  }

  render() {
    const {data} = this.state
    return (
      <div>
        {data.map((item, index) => {
          if (index === 1) {
            return (
              <div key={index}>
                  <h2>{item.title}</h2>
                  <Slider data={item.items} visibleNum={3} />
              </div>
            )
          } else {
            return (
              <div key={index}>
                  <h2>{item.title}</h2>
                  <Slider data={item.items} />
              </div>
            )
          }
         })}
      </div>
    );
  }
}

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<ShowCase />, wrapper) : false;