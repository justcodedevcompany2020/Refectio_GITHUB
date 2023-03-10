import { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";

export default class BlueButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nav: null,
    };
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: "#B5D8FE",
          width: 285,
          height: 44,
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            fontFamily: "Poppins_700Bold",
          }}
        >
          {this.props.name}
        </Text>
      </View>
    );
  }
}
