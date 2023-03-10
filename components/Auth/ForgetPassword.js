import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaskInput from "react-native-mask-input";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import BlueButton from "../Component/Buttons/BlueButton";
import { APP_URL, APP_IMAGE_URL } from "@env";

export default class ForgetPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      phone_error: false,
    };
  }

  goToForgetPasswordTel = async () => {
    let formdata = new FormData();
    await formdata.append("phone", this.state.phone);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${APP_URL}sendcodeforphone`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === false) {
          this.setState({ phone_error: true });
        } else if (result.status === true) {
          this.setState({ phone_error: false });
          this.props.navigation.navigate("ForgetPasswordTel");
          AsyncStorage.setItem("phone", this.state.phone);
        }
      })
      .catch((error) => console.log("error", error));
  };

  goToLogin = () => {
    this.props.navigation.navigate("LoginScreen");
    this.setState({ phone: "", phone_error: false });
  };

  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <View
            style={{
              width: 360,
              height: 152,
              resizeMode: "contain",
              position: "absolute",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                left: 15,
                top: 40,
              }}
              onPress={() => this.goToLogin()}
            >
              <ArrowGrayComponent />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: 102,
              fontSize: 26,
              fontFamily: "Poppins_500Medium",
              color: "#2D9EFB",
            }}
          >
            Восстановление{"\n"}аккаунта
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins_400Regular",
              color: "#52A8EF",
              marginTop: 25,
            }}
          >
            Мы отправим 4-х значный код на ваш номер{"\n"}для подтверждения
            личности
          </Text>
          <View>
            <Text
              style={[
                {
                  fontFamily: "Poppins_500Medium",
                  lineHeight: 23,
                  fontSize: 15,
                  // color: '#5B5B5B',
                  marginTop: 27,
                  marginBottom: 5,
                  marginTop: 52,
                },
                this.state.phone_error
                  ? { color: "red" }
                  : { color: "#5B5B5B" },
              ]}
            >
              Номер телефона
            </Text>

            <MaskInput
              underlineColorAndroid="transparent"
              keyboardType="phone-pad"
              placeholder="+7 (975) 991-99-99"
              style={[
                {
                  borderWidth: 1,
                  borderColor: "#F5F5F5",
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                },
                this.state.phone_error
                  ? { borderColor: "red" }
                  : { borderColor: "#F5F5F5" },
              ]}
              value={this.state.phone}
              onChangeText={(masked, unmasked, obfuscated) => {
                this.setState({ phone: masked, phone_error: false }); // you can use the unmasked value as well
              }}
              mask={[
                "+",
                "7",
                " ",
                "(",
                /\d/,
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
              ]}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 67,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.goToForgetPasswordTel();
              }}
            >
              <BlueButton name="Отправить код" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
