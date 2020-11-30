import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../main.css';

interface Props {
  dataList: any[]
  visibleNum: number
  renderItem: (item: any) => JSX.Element
}

interface State {
  dataList: any[]
  isSwiping: Boolean
  itemWidth: number
  scrollLeft: number
  clientX: number
}

class Slider extends React.Component<Props, State> {
    private _scroller: HTMLElement;
    private _item: HTMLElement;
    private _nextBtn: HTMLElement;
    private _prevBtn: HTMLElement;
    constructor(props: Props) {
      super(props);
      this.state = {
        dataList: this.props.dataList,
        isSwiping: false,
        itemWidth: 0,
        scrollLeft: 0,
        clientX: 0
      };
    }

    componentDidMount = () => {
      this._scroller.addEventListener('mousemove', this.onMouseMove);
      this._scroller.addEventListener('mouseup', this.onUp);
      this._scroller.addEventListener('mousedown', this.onMouseDown);

      this._scroller.addEventListener('touchmove', this.onTouchMove);
      this._scroller.addEventListener('touchend', this.onUp);
      this._scroller.addEventListener('touchstart', this.onTouchDown);
      
      window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
      this.setState({itemWidth: this._item.clientWidth});
    }

    componentWillUnmount = () => {
      this._scroller.removeEventListener('mousemove', this.onMouseMove);
      this._scroller.removeEventListener('mouseup', this.onUp);
      this._scroller.removeEventListener('mousedown', this.onMouseDown);
      
      this._scroller.removeEventListener('touchmove', this.onTouchMove);
      this._scroller.removeEventListener('touchend', this.onUp);
      this._scroller.removeEventListener('touchstart', this.onTouchDown);
    }

    onMouseMove = (ev: MouseEvent): void => {
      this.onMove(ev.clientX)
    }

    onMouseDown = (ev: MouseEvent): void => {
      this.onDown(ev.clientX)
    }

    onTouchMove = (ev: TouchEvent): void => {
      this.onMove(ev.touches[0].clientX)
    }

    onTouchDown = (ev: TouchEvent) => {
      this.onDown(ev.touches[0].clientX)
    }

    onMove = (x: number): void => {
      if (this.state.isSwiping) {
        const {clientX, scrollLeft} = this.state;
        let distance = clientX - x;
        const newPosition = scrollLeft + distance;
        if (!isNaN(newPosition)) {
          this._scroller.scrollLeft = newPosition
        }
      }
    }

    onDown = (x: number) => {
      const {scrollLeft} = this._scroller;
      this.setState({isSwiping: true, scrollLeft, clientX: x});
    }

    onUp = () => {
      const widthLeft = this._scroller.scrollLeft % this.state.itemWidth
      if (widthLeft >= this.state.itemWidth / 2) {
        this.SmoothScrollBy(this._scroller, this.state.itemWidth - widthLeft);
      } else {
        this.SmoothScrollBy(this._scroller, -widthLeft)
      }
      this.setState({isSwiping: false, scrollLeft: 0, clientX: 0});
    }

    attachScroller = (scroller: React.ReactInstance) => {
      this._scroller = ReactDOM.findDOMNode(scroller) as HTMLElement
    }

    attachPrevBtn = (prev: React.ReactInstance) => {
      this._prevBtn = ReactDOM.findDOMNode(prev) as HTMLElement
      this._prevBtn.addEventListener('click', this.scrollToPrevItem);
    }

    attachNextBtn = (button: React.ReactInstance) => {
      this._nextBtn = ReactDOM.findDOMNode(button) as HTMLElement
      this._nextBtn.addEventListener('click', this.scrollToNextItem);
    }

    attachItem = (item: React.ReactInstance) => {
      this._item = ReactDOM.findDOMNode(item) as HTMLElement
      this.setState({itemWidth: this._item.clientWidth});
    }

    scrollToNextItem = () => {
      if(this._scroller.scrollLeft + this._scroller.clientWidth < this._scroller.scrollWidth)
        this.SmoothScrollBy(this._scroller, this.state.itemWidth);
      else
        this.SmoothScrollTo(this._scroller, 0);
    }
    scrollToPrevItem = () => {
      if(this._scroller.scrollLeft != 0) 
        this.SmoothScrollBy(this._scroller, -this.state.itemWidth);
      else
        this.SmoothScrollTo(this._scroller, this._scroller.scrollWidth);
    }

    itemMinWidth = () => {
      const percentage = Math.ceil(1 / this.props.visibleNum * 100)
      return `${percentage}%`
    }

    pageBtnClick = (event: React.MouseEvent) => {
      const index = (event.target as HTMLButtonElement).getAttribute('data-key') as unknown as number;
      this.SmoothScrollTo(this._scroller, this.state.itemWidth * index)
    }

    SHS_B = (e: HTMLElement, sc: number, eAmt: number, start: number) => {
      e.scrollLeft = (eAmt * sc) + start;
    }

    SmoothScrollBy = (e: HTMLElement, amount: number) => {
      const start = e.scrollLeft
      const time = 250
      var eAmt = amount / 100;
      var curTime = 0;
      var scrollCounter = 0;
      while (curTime <= time) {
          window.setTimeout(this.SHS_B, curTime, e, scrollCounter, eAmt, start);
          curTime += time / 100;
          scrollCounter++;
      }
    }

    SmoothScrollTo = (e: HTMLElement, position: number) => {
      const amount = position - e.scrollLeft;
      this.SmoothScrollBy(e, amount)
    }

    render() {
      const {dataList} = this.state;
      return (
        <div className="carousel">
          <div className="scroller"
            ref={this.attachScroller}
            >
            {dataList.map((item, index) =>
                <div style={{minWidth:this.itemMinWidth()}} 
                  className="item"
                  key={index} 
                  ref={this.attachItem}>
                  {this.props.renderItem(item)}
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