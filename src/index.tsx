import * as React from "react";
import * as ReactDOM from "react-dom";
import Slider from "./view/Slider";
import './main.css';
import QuoteView from "./view/QuoteView";
import ImageBGView from './view/ImageBGView';

const dataList = require('./model/MockingData') as Data[];

class ShowCase extends React.Component {
  render() {
    return (
      <div>
        <h2>{dataList[0].title}</h2>
        <Slider 
          dataList={dataList[0].items} 
          visibleNum={1} 
          renderItem={(item: BackgroundImage) => {
            return (
              <ImageBGView data={item}/>
            )
          }}
        />
        <h2>{dataList[1].title}</h2>
        <div className="quote">
          <Slider 
            dataList={dataList[1].items} 
            visibleNum={2} 
            renderItem={(item: Quote) => {
              return (
                <QuoteView data={item}/>
              )
            }}
          />
        </div>
      </div>
    );
  }
}

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<ShowCase />, wrapper) : false;