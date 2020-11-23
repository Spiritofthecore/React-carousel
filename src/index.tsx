import * as React from "react";
import * as ReactDOM from "react-dom";
import Slider from "./view/Slider";
import './main.css';
const data = require('./model/MockingData');

class ShowCase extends React.Component {
  render() {
    return (
      <div>
        {data.map((item: Data, index: Number) => {
          if (index === 1) {
            return (
              <div key={`${index}`}>
                  <h2>{item.title}</h2>
                  <Slider data={item.items} visibleNum={3} />
              </div>
            )
          } else {
            return (
              <div key={`${index}`}>
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