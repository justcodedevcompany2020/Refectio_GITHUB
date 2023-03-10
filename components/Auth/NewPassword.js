import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Svg, { Path, Rect } from "react-native-svg";
import BlueButton from "../Component/Buttons/BlueButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_URL, APP_IMAGE_URL } from "@env";

export default class NewPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      password: true,
      repeatPassword: true,
      achq: require("../../assets/image/achq.png"),
      achqBac: require("../../assets/image/achq-bac.png"),

      new_password: "",
      new_password_error: false,
      new_password_confirm: "",
      new_password_confirm_error: false,
    };
  }
  goToForgetPasswordTel = () => {
    this.props.navigation.navigate("ForgetPasswordTel");
    this.clearAllData();
  };

  goToLogin = () => {
    this.props.navigation.navigate("LoginScreen");
    this.setState({ modalVisible: false });
  };

  clearAllData = () => {
    this.setState({
      modalVisible: false,
      password: true,
      repeatPassword: true,
      new_password: "",
      new_password_error: false,
      new_password_confirm: "",
      new_password_confirm_error: false,
    });
  };

  updatePassword = async () => {
    let phone = await AsyncStorage.getItem("phone");
    let code = await AsyncStorage.getItem("phoneCode");

    let formdata = new FormData();
    formdata.append("phone", phone);
    formdata.append("forgot_password_code", code);
    formdata.append("password", this.state.new_password);
    formdata.append("password_confirmation", this.state.new_password_confirm);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${APP_URL}updatepasswordforgot`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          this.setState({
            modalVisible: true,
            new_password: "",
            new_password_confirm: "",
          });
        } else if (result.success === false) {
          if (result.data.hasOwnProperty("password")) {
            this.setState({ new_password_error: true });
          } else {
            this.setState({ new_password_error: false });
          }
          if (result.data.hasOwnProperty("password_confirmation")) {
            this.setState({ new_password_confirm_error: true });
          } else {
            this.setState({ new_password_confirm_error: false });
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 15,
              top: 40,
            }}
            onPress={() => this.goToForgetPasswordTel()}
          >
            <ArrowGrayComponent />
          </TouchableOpacity>

          <Modal visible={this.state.modalVisible}>
            <View style={styles.modalVisible}>
              <View
                style={{
                  marginTop: 174,
                }}
              >
                <Svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5C20.67 5 5 20.67 5 40C5 59.33 20.67 75 40 75Z"
                    fill="#B5D8FE"
                  />
                  <Path
                    d="M57.6667 24.3333L35 47L25.6667 37.6667L21 42.3333L35 56.3333L62.3333 29L57.6667 24.3333Z"
                    fill="white"
                  />
                </Svg>
              </View>
              <Text
                style={{
                  color: "#2D9EFB",
                  textAlign: "center",
                  fontSize: 25,
                  marginTop: 27,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Ваш пароль{"\n"}успешно изменён
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 170,
                }}
                onPress={() => {
                  this.goToLogin();
                }}
              >
                <BlueButton name="Войти" />
              </TouchableOpacity>
            </View>
          </Modal>

          <View
            style={{
              marginTop: 103,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                color: "#2D9EFB",
                fontFamily: "Poppins_500Medium",
              }}
            >
              Задайте{"\n"}новый пароль
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: "#52A8EF",
                marginTop: 25,
                lineHeight: 17.61,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Придумайте сложный пароль,содержащий{"\n"}строчные и прописные
              буквы,а так же цифры{"\n"}и символы
            </Text>
          </View>
          <View style={{ position: "relative" }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                lineHeight: 23,
                fontSize: 15,
                color: "#5B5B5B",
                marginTop: 27,
                marginBottom: 5,
                marginTop: 35,
              }}
            >
              Новый пароль
            </Text>

            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={this.state.password}
              style={[
                {
                  borderWidth: 1,
                  borderColor: "#F5F5F5",
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                },
                this.state.new_password_error
                  ? { borderColor: "red" }
                  : { borderColor: "#F5F5F5" },
              ]}
              value={this.state.new_password}
              onChangeText={(text) =>
                this.setState({ new_password: text, new_password_error: false })
              }
            />

            <TouchableOpacity
              style={{ position: "absolute", right: 10, bottom: 10 }}
              onPress={() => this.setState({ password: !this.state.password })}
            >
              {this.state.password && (
                <Image
                  source={this.state.achq}
                  style={{ width: 24, height: 24 }}
                />
              )}
              {!this.state.password && (
                <Image
                  source={this.state.achqBac}
                  style={{ width: 24, height: 24 }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                lineHeight: 23,
                fontSize: 15,
                color: "#5B5B5B",
                marginTop: 27,
                marginBottom: 5,
                marginTop: 35,
              }}
            >
              Повторите пароль
            </Text>

            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={this.state.repeatPassword}
              style={[
                {
                  borderWidth: 1,
                  // borderColor: "#F5F5F5",
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                },
                this.state.new_password_confirm_error
                  ? { borderColor: "red" }
                  : { borderColor: "#F5F5F5" },
              ]}
              value={this.state.new_password_confirm}
              onChangeText={(text) =>
                this.setState({
                  new_password_confirm: text,
                  new_password_confirm_error: false,
                })
              }
            />

            <TouchableOpacity
              style={{ position: "absolute", right: 10, bottom: 10 }}
              onPress={() =>
                this.setState({ repeatPassword: !this.state.repeatPassword })
              }
            >
              {this.state.repeatPassword && (
                <Image
                  source={this.state.achq}
                  style={{ width: 24, height: 24 }}
                />
              )}
              {!this.state.repeatPassword && (
                <Image
                  source={this.state.achqBac}
                  style={{ width: 24, height: 24 }}
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.updatePassword();
              }}
            >
              <BlueButton name="Подтвердить" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: 50,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 18,
    borderColor: "#F5F5F5",
    borderWidth: 2,
  },
  confirmView: {
    marginHorizontal: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 52,
  },
  modalVisible: {
    flex: 1,
    alignItems: "center",
  },
});
