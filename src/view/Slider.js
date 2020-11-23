import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../main.css';
import SliderItem from "./SliderItem";

class Slider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataList: this.props.data,
        isScrolling: false,
      };
    }

    componentDidMount = () => {
      this._scroller.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
      this.setState({itemWidth: this._item.clientWidth});
    }

    componentWillUnmount = () => {
      this._scroller.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('moouseup', this.onMouseUp);
      window.removeEventListener('mousedown', this.onMouseDown);
    }

    onMouseMove = (event) => {
      if (this.state.isScrolling) {
        const {clientX, scrollLeft} = this.state;
        let distance = clientX - event.clientX;
        const newPosition = scrollLeft + distance;
        if (!isNaN(newPosition)) {
          this._scroller.scrollLeft = newPosition
        }
      }
    }

    onMouseDown = (event) => {
      const {scrollLeft} = this._scroller;
      this.setState({isScrolling: true, scrollLeft, clientX: event.clientX});
    }

    onMouseUp = () => {
      const widthLeft = this._scroller.scrollLeft % this.state.itemWidth
      if (widthLeft >= this.state.itemWidth / 2) {
        this._scroller.scrollBy({left: this.state.itemWidth - widthLeft, top: 0, behavior:'smooth'});
      } else {
        this._scroller.scrollBy({left: -widthLeft, top: 0, behavior:'smooth'});
      }
      this.setState({isScrolling: false, scrollLeft: 0, clientX: 0});
    }

    attachScroller = (scroller) => {
      this._scroller = ReactDOM.findDOMNode(scroller)
    }

    attachPrevBtn = (prev) => {
      this._prevBtn = ReactDOM.findDOMNode(prev)
      this._prevBtn.addEventListener('click', this.scrollToPrevItem);
    }

    attachNextBtn = (button) => {
      this._nextBtn = ReactDOM.findDOMNode(button)
      this._nextBtn.addEventListener('click', this.scrollToNextItem);
    }

    attachItem = (item) => {
      this._item = ReactDOM.findDOMNode(item)
      this.setState({itemWidth: this._item.clientWidth});
    }

    scrollToNextItem = () => {
      if(this._scroller.scrollLeft + this._scroller.clientWidth < this._scroller.scrollWidth)
        this._scroller.scrollBy({left: this.state.itemWidth, top: 0, behavior:'smooth'});
      else
        this._scroller.scrollTo({left: 0, top: 0, behavior:'smooth'});
    }
    scrollToPrevItem = () => {
      if(this._scroller.scrollLeft != 0)
        this._scroller.scrollBy({left: -this.state.itemWidth, top: 0, behavior:'smooth'});
      else
        this._scroller.scrollTo({left: this._scroller.scrollWidth, top: 0, behavior:'smooth'});
    }

    itemMinWidth = () => {
      const percentage = Math.ceil(1 / this.props.visibleNum * 100)
      return `${percentage}%`
    }

    pageBtnClick = (event) => {
      const index = event.target.getAttribute('data-key');
      this._scroller.scrollTo({left: this.state.itemWidth * index, top: 0, behavior:'smooth'});
    }

    render() {
      const {dataList} = this.state;
      return (
        <div className="carousel">
          <div className="scroller"
            ref={this.attachScroller}
            onScroll={this.onMouseMove}
            >
            {dataList.map((item, index) =>
                <div style={{minWidth:this.itemMinWidth()}} 
                  className="item" 
                  key={index} 
                  ref={this.attachItem}>
                  <SliderItem data={item}/>
                </div>
                )}
          </div>
          <span className="btn prev" ref={this.attachPrevBtn}>&lt;</span>
          <span className="btn next" ref={this.attachNextBtn}>&gt;</span>
          <div className="pageBtnContainer">
            {dataList.map((_item, index) => 
              <button className="pageBtn" onClick={this.pageBtnClick} key={index} data-key={index}></button>
            )}
          </div>
        </div>
      );
    }
  }
  
  export default Slider;