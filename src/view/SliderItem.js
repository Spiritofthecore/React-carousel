import React, { Component } from 'react';
import '../main.css';

class SliderItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: this.props.data
      };
    }

    render() {
      const {data} = this.state;
      return (
          <div className="card">
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            <span>{data}</span>
          </div>
      );
    }
  }
  
  export default SliderItem;