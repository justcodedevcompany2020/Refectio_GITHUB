import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Touchable,
  TouchableOpacity,

} from "react-native";
import RefectoComponent from "../../assets/image/Refecto";
import BlueButton from "../Component/Buttons/BlueButton";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Svg, { Path, Rect } from "react-native-svg";

export default class RegisteredScreenComponent extends Component {
  constructor(props) {
    super(props);
  }

  goToRegisteredUser = () => {
    this.props.navigation.navigate("RegisteredUserScreen");
  };
  goToRegisteredManufacturer = () => {
    this.props.navigation.navigate("RegistrationManufacturer");
  };
  goToAuthScreen = () => {
    this.props.navigation.navigate("AuthScreen");
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              width: "100%",
              height: 130,
            }}
          ></View>

          <Image
            source={require("../../assets/image/Refectio.png")}
            style={{
              width: "95%",
              height: 135,
              resizeMode: "contain",
              position: "absolute",
              right: 0,
              top: 23,
              zIndex: -1,
            }}
          />

          <TouchableOpacity
            style={{
              position: "absolute",
              top: 23,
              left: 10,
              zIndex: 1,
            }}
            onPress={() => this.goToAuthScreen()}
          >
            <ArrowGrayComponent />
          </TouchableOpacity>

          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "Poppins_500Medium",
              lineHeight: 54,
              fontSize: 32,
              color: "#2D9EFB",
              marginTop: 40,
            }}
          >
            Регистрация
          </Text>
          <View>
            <Text
              style={{
                color: "#888888",
                textAlign: "center",
                marginTop: 5,
                fontSize: 20,
                lineHeight: 30,
                fontFamily: "Poppins_500Medium",
                letterSpacing: 0,
              }}
            >
              Вы к нам в какой роли?
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 100,
              }}
              onPress={() => {
                this.goToRegisteredUser();
              }}
            >
              <BlueButton name="Я-Дизайнер" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 21,
              }}
              onPress={() => {
                this.goToRegisteredManufacturer();
              }}
            >
              <BlueButton name="Я-Производитель" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
