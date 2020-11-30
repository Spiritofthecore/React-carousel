import * as React from 'react';
import '../main.css';

interface Props {
  data: BackgroundImage
}

interface State {
  data: BackgroundImage
}

class ImageBGView extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        data: this.props.data
      };
    }

    render() {
      const {data} = this.state;
      return (
          <img
            src={data.imageURL}
            alt={data.alt}
          />
      );
    }
  }
  
  export default ImageBGView;