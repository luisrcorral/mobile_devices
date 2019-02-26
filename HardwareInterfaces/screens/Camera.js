import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraInterface extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back, // Start with the back camera.
  };

  // Start the subscription
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    // Check for permissions.
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera style={styles.container} type={this.state.type}>
            <View
              style={styles.cameraView}>
              <TouchableOpacity style={styles.flipButton}
                onPress={() => {
                  // Flip between back and front cameras.
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={styles.textButton}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent'            
  },
  flipButton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
});
