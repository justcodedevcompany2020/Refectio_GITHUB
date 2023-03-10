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

export default class EditPasswordCustomerCompnent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: "",
      old_password_bool: true,
      old_password_error: false,

      password: "",
      password_bool: true,
      password_error: false,

      password_confirmation: "",
      password_confirmation_bool: true,
      password_confirmation_error: false,

      modal: false,
    };
  }

  clearAllData = () => {
    this.setState({
      old_password: "",
      old_password_bool: true,
      old_password_error: false,

      password: "",
      password_bool: true,
      password_error: false,

      password_confirmation: "",
      password_confirmation_bool: true,
      password_confirmation_error: false,

      modal: false,
    });
  };

  sendPassword = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AouthStr = "Bearer " + userToken;
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Authorization", AouthStr);

    let formdata = new FormData();
    formdata.append("old_password", this.state.old_password);
    formdata.append("password", this.state.password);
    formdata.append("password_confirmation", this.state.password_confirmation);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${APP_URL}updatePasswordUser`, requestOptions)
      .then((response) => response.json())
      .then((result) => {

        if (result.status === true) {
          this.setState({ modal: true });
        } else if (result.success === false) {
          if (
            result.data.old_password == "The old password field is required."
          ) {
            this.setState({ old_password_error: true });
          } else {
            this.setState({ old_password_error: false });
          }
          if (
            result.data.password == "The password field is required." ||
            result.data.password[0] ==
              "The password must be at least 6 characters."
          ) {
            this.setState({ password_error: true });
          } else {
            this.setState({ password_error: false });
          }
          if (
            result.data.password_confirmation ==
            "The password confirmation field is required."
          ) {
            this.setState({ password_confirmation_error: true });
          } else {
            this.setState({ password_confirmation_error: false });
          }
          if (
            result.data.password == "The password confirmation does not match."
          ) {
            this.setState({ password_confirmation_error: true });
          } else {
            this.setState({ password_confirmation_error: false });
          }
        }
        if (result.status === false) {
          if (result.data.message == "wrong password") {
            this.setState({ old_password_error: true });
          } else {
            this.setState({ old_password_error: false });
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 25, position: "relative" }}>
          <Modal visible={this.state.modal}>
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
                onPress={async () => {
                  await this.props.navigation.navigate("CustomerMyAccaunt");
                  await this.setState({ modal: false });
                }}
              >
                <BlueButton name="Вернуться" />
              </TouchableOpacity>
            </View>
          </Modal>

          <Image
            source={require("../../assets/image/RefectioWallpaper.png")}
            style={{
              width: "106%",
              height: 135,
              resizeMode: "contain",
              top: 30,
              position: "absolute",
              right: 0,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.clearAllData();
              this.props.navigation.navigate("CustomerMyAccaunt");
            }}
            style={{
              position: "absolute",
              top: 18.29,
              left: 15,
              zIndex: 100,
            }}
          >
            <ArrowGrayComponent />
          </TouchableOpacity>

          {/* <View > */}
          <View
            style={{
              marginTop: 86,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                color: "#2D9EFB",
                fontFamily: "Poppins_500Medium",
              }}
            >
              Изменение пароля
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                  },
                  this.state.old_password_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Старый пароль
              </Text>
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="**********"
              secureTextEntry={this.state.old_password_bool}
              style={[
                {
                  borderWidth: 1,
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                },
                this.state.old_password_error
                  ? { borderColor: "red" }
                  : { borderColor: "#F5F5F5" },
              ]}
              value={this.state.old_password}
              onChangeText={(oldPas) =>
                this.setState({
                  old_password: oldPas,
                  old_password_error: false,
                })
              }
            />
            <TouchableOpacity
              style={{ position: "absolute", bottom: 12, right: 20 }}
              onPress={() =>
                this.setState({
                  old_password_bool: !this.state.old_password_bool,
                })
              }
            >
              {!this.state.old_password_bool && (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/image/achq-bac.png")}
                />
              )}
              {this.state.old_password_bool && (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/image/achq.png")}
                />
              )}
            </TouchableOpacity>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                  },
                  this.state.password_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Новый пароль
              </Text>
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="**********"
              secureTextEntry={this.state.password_bool}
              style={[
                {
                  borderWidth: 1,
                  borderColor: "#F5F5F5",
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                },
                this.state.password_error
                  ? { borderColor: "red" }
                  : { borderColor: "#F5F5F5" },
              ]}
              value={this.state.password}
              onChangeText={(Pas) =>
                this.setState({ password: Pas, password_error: false })
              }
            />
            <TouchableOpacity
              style={{ position: "absolute", bottom: 12, right: 20 }}
              onPress={() =>
                this.setState({ password_bool: !this.state.password_bool })
              }
            >
              {!this.state.password_bool && (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/image/achq-bac.png")}
                />
              )}
              {this.state.password_bool && (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/image/achq.png")}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={{ position: "relative" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,

                    marginBottom: 5,
                  },
                  this.state.password_confirmation_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Повтор нового пароля
              </Text>
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="**********"
              secureTextEntry={this.state.password_confirmation_bool}
              style={[
                {
                  borderWidth: 1,
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                },
                this.state.password_confirmation_error
                  ? { borderColor: "red" }
                  : { borderColor: "#F5F5F5" },
              ]}
              value={this.state.password_confirmation}
              onChangeText={(confPas) =>
                this.setState({
                  password_confirmation: confPas,
                  password_confirmation_error: false,
                })
              }
            />
            <TouchableOpacity
              style={{ position: "absolute", bottom: 12, right: 20 }}
              onPress={() =>
                this.setState({
                  password_confirmation_bool:
                    !this.state.password_confirmation_bool,
                })
              }
            >
              {!this.state.password_confirmation_bool && (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/image/achq-bac.png")}
                />
              )}
              {this.state.password_confirmation_bool && (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/image/achq.png")}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 50 }}
            onPress={() => this.sendPassword()}
          >
            <BlueButton name="Подтвердить" />
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  modalVisible: {
    flex: 1,
    alignItems: "center",
  },
});
