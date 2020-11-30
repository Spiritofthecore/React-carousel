import * as React from 'react';
import '../main.css';

interface Props {
  data: Quote
}

interface State {
  data: Quote
}

class QuoteView extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        data: this.props.data
      };
    }

    render() {
      const {data} = this.state;
      return (
          <div className="card">
            <p>{data.content}</p>
            <span>{data.author}</span>
          </div>
      );
    }
  }
  
  export default QuoteView;