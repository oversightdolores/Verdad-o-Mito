import React from "react";
import {Video} from 'react-native-video'
class LiveStream extends React.Component {
  render() {
    return (
      <Video
        source={{uri: "your-streaming-url"}}
        style={{flex: 1}}
        controls={true}
        fullscreen={true}
        onLoad={() => this.setState({loading: false})}
      />
    );
  }
}
export default  LiveStream