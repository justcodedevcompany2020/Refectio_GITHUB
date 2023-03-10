import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Svg, { Path, Rect } from "react-native-svg";
import BlueButton from "../Component/Buttons/BlueButton";
import MaskInput from "react-native-mask-input";
import * as ImagePicker from "expo-image-picker";
import { APP_URL, APP_IMAGE_URL } from "@env";

export default class RegistrationUserScreenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,

      imgFirst: "",
      imgSecond: "",

      name: "",
      name_error: false,

      surname: "",
      surname_error: false,

      phone: "",
      phone_error: false,
      phone_exist: false,

      password: "",
      password_error: false,

      password_confirmation: "",
      password_confirmation_error: false,

      diplom_photo: null,
      diplom_photo_error: false,

      selfi_photo: null,
      selfi_photo_error: false,

      i_agree: false,
      i_agree_error: false,
      role_id: 2,

      accessToken: null,

      value_length: "",
    };
  }
  handleForm = (key, value) => {
    this.setState((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  form_data = new FormData();

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      this.setState({
        diplom_photo: result.assets[0].uri,
        diplom_photo_error: false,
      });
    } else {
      this.setState({ diplom_photo_error: true });
    }

    this.form_data.append("diplom_photo", {
      uri: result.assets[0].uri,
      type: "image/jpg",
      name: "photo.jpg",
    });
  };

  pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      this.setState({
        selfi_photo: result.assets[0].uri,
        selfi_photo_error: false,
      });
    } else {
      this.setState({ selfi_photo_error: true });
    }

    this.form_data.append("selfi_photo", {
      uri: result.assets[0].uri,
      type: "image/jpg",
      name: "photo.jpg",
    });
  };

  DizainerRegisterApi = async (request, response, promptAsync) => {
    const {
      name,
      surname,
      phone,
      password,
      password_confirmation,
      diplom_photo,
      selfi_photo,
      i_agree,
      role_id,
    } = this.state;

    this.form_data.append("name", name);
    this.form_data.append("surname", surname);
    this.form_data.append("phone", phone);
    this.form_data.append("password", password);
    this.form_data.append("password_confirmation", password_confirmation);
    this.form_data.append("role_id", role_id);
    this.form_data.append("i_agree", i_agree);

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: this.form_data,
      redirect: "follow",
    };

    await fetch(`${APP_URL}DizainerRegister`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.status === false && res.message == "phone arledy exist") {
          this.setState({
            phone_exist: true,
          });
        } else {
          this.setState({
            phone_exist: false,
          });
        }
        if (res.success === false && res.message == "Validation errors") {
          if (res.data.hasOwnProperty("name")) {
            this.setState({
              name_error: true,
            });
          } else {
            this.setState({
              name_error: false,
            });
          }

          if (res.data.hasOwnProperty("surname")) {
            this.setState({
              surname_error: true,
            });
          } else {
            this.setState({
              surname_error: false,
            });
          }

          if (res.data.hasOwnProperty("phone")) {
            this.setState({
              phone_error: true,
            });
          } else {
            this.setState({
              phone_error: false,
            });
          }

          if (res.data.hasOwnProperty("password")) {
            this.setState({
              password_error: true,
            });
          } else {
            this.setState({
              password_error: false,
            });
          }

          if (res.data.hasOwnProperty("password_confirmation")) {
            this.setState({
              password_confirmation_error: true,
            });
          } else {
            this.setState({
              password_confirmation_error: false,
            });
          }

          if (res.data.hasOwnProperty("diplom_photo")) {
            this.setState({
              diplom_photo_error: true,
            });
          } else {
            this.setState({
              diplom_photo_error: false,
            });
          }

          if (res.data.hasOwnProperty("selfi_photo")) {
            this.setState({
              selfi_photo_error: true,
            });
          } else {
            this.setState({
              selfi_photo_error: false,
            });
          }

          return false;
        } else if (res.status === false) {
          if (res.message == "i_agree required true") {
            this.setState({
              i_agree_error: true,
            });
          } else {
            this.setState({
              i_agree_error: true,
            });
          }
        }
        if (
          res.status === false &&
          res.message == "user@ chi ancel hamari verifykacia"
        ) {
          this.props.navigation.navigate("ConfirmTelScreen", {
            params: res.token,
          });

          return false;
        } else {
          this.props.navigation.navigate("ConfirmTelScreen", {
            params: res.data.token,
          });
        }
      });
  };

  goToRegistredScreen = () => {
    this.props.navigation.navigate("RegisteredScreen");
    this.clearAllData();
  };

  clearAllData = () => {
    this.setState({
      valid: false,

      imgFirst: "",
      imgSecond: "",

      name: "",
      name_error: false,

      surname: "",
      surname_error: false,

      phone: "",
      phone_error: false,
      phone_exist: false,

      password: "",
      password_error: false,

      password_confirmation: "",
      password_confirmation_error: false,

      diplom_photo: null,
      diplom_photo_error: false,

      selfi_photo: null,
      selfi_photo_error: false,

      i_agree: false,
      i_agree_error: false,
      role_id: 2,

      accessToken: null,

      value_length: "",
    });
  };

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <View style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              height: 150,
            }}
          >
            <Image
              source={require("../../assets/image/RefectioWallpaper.png")}
              style={{
                width: "95%",
                height: 135,
                position: "absolute",
                top: 23,
                right: 0,
                zIndex: -1,
                resizeMode: "contain",
              }}
            />
            <View
              style={{
                width: "100%",
                height: 152,
                resizeMode: "contain",
                position: "absolute",
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  left: 10,
                  top: 23,
                  zIndex: 100,
                }}
                onPress={() => this.goToRegistredScreen()}
              >
                <ArrowGrayComponent />
              </TouchableOpacity>
              <Text
                style={{
                  position: "absolute",
                  color: "#2D9EFB",
                  fontSize: 36,
                  lineHeight: 54,
                  left: 19,
                  top: 58,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Регистрация
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={{
            width: "100%",
            marginHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View>
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 15,
                    marginLeft: 25,
                    marginTop: 27,
                    marginBottom: 5,
                  },
                  this.state.name_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Имя*
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={[
                  {
                    borderWidth: 1,
                    padding: 10,
                    width: "85%",
                    borderRadius: 5,
                    marginLeft: 25,
                  },
                  this.state.name_error
                    ? { borderColor: "red" }
                    : { borderColor: "#F5F5F5" },
                ]}
                value={this.state.name}
                onChangeText={(value) => {
                  this.setState({ name: value, name_error: false });
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 15,
                    marginLeft: 25,
                    marginTop: 27,
                    marginBottom: 5,
                  },
                  this.state.surname_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Фамилия*
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={[
                  {
                    borderWidth: 1,
                    padding: 10,
                    width: "85%",
                    borderRadius: 5,
                    marginLeft: 25,
                  },
                  this.state.surname_error
                    ? { borderColor: "red" }
                    : { borderColor: "#F5F5F5" },
                ]}
                value={this.state.surname}
                onChangeText={(value) => {
                  this.setState({ surname: value, surname_error: false });
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 15,
                    marginLeft: 25,
                    marginTop: 27,
                    marginBottom: 5,
                  },
                  this.state.phone_error || this.state.phone_exist
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                {this.state.phone_exist
                  ? "Этот телефонный номер уже\nзарегистрирован за другим пользователем"
                  : "Номер телефона*"}
              </Text>

              <MaskInput
                underlineColorAndroid="transparent"
                keyboardType="phone-pad"
                placeholder="+7 (975) 991-99-99"
                style={[
                  {
                    borderWidth: 1,
                    padding: 10,
                    width: "85%",
                    borderRadius: 5,
                    marginLeft: 25,
                  },
                  this.state.phone_error
                    ? { borderColor: "red" }
                    : { borderColor: "#F5F5F5" },
                ]}
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
                value={this.state.phone}
                onChangeText={(masked) => {
                  this.setState({
                    value_length: masked,
                    phone: masked,
                    phone_error: false,
                    phone_exist: false,
                  });
                }}
              />
            </View>

            <View>
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 15,
                    color: "#5B5B5B",
                    marginLeft: 25,
                    marginTop: 27,
                    marginBottom: 5,
                  },
                  this.state.password_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Пароль (минимум 6 символов)*
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                style={[
                  {
                    borderWidth: 1,
                    padding: 10,
                    width: "85%",
                    borderRadius: 5,
                    marginLeft: 25,
                  },
                  this.state.password_error
                    ? { borderColor: "red" }
                    : { borderColor: "#F5F5F5" },
                ]}
                value={this.state.password}
                onChangeText={(value) => {
                  this.setState({ password: value, password_error: false });
                }}
              />
            </View>

            <View>
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 15,
                    marginLeft: 25,
                    marginTop: 27,
                    marginBottom: 5,
                  },
                  this.state.password_confirmation_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Повторите пароль*
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "85%",
                    borderRadius: 5,
                    marginLeft: 25,
                  },
                  this.state.password_confirmation_error
                    ? { borderColor: "red" }
                    : { borderColor: "#F5F5F5" },
                ]}
                value={this.state.password_confirmation}
                onChangeText={(value) => {
                  this.setState({
                    password_confirmation: value,
                    password_confirmation_error: false,
                  });
                }}
              />
            </View>

            <View>
              <Text
                style={[
                  {
                    color: "#888888",
                    fontSize: 15,
                    lineHeight: 18,
                    marginLeft: 25,
                    marginTop: 27,
                    fontFamily: "Raleway_500Medium",
                  },
                  this.state.diplom_photo_error
                    ? { color: "red" }
                    : { color: "#888888" },
                ]}
              >
                Загрузите фото диплома/сертификата*
              </Text>
            </View>
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  this.state.diplom_photo_error
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "#B5D8FE" },
                ]}
                onPress={() => this.pickImage()}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontFamily: "Raleway_500Medium",
                  }}
                >
                  Загрузить
                </Text>
              </TouchableOpacity>
              {this.state.diplom_photo === null && <></>}
              {this.state.diplom_photo !== null &&
                this.state.diplom_photo_error === false && (
                  <Image
                    source={require("../../assets/image/changed.png")}
                    style={{ width: 32, height: 32 }}
                  />
                )}
            </View>

            <View>
              <Text
                style={[
                  {
                    color: "#888888",
                    fontSize: 15,
                    lineHeight: 18,
                    marginLeft: 25,
                    marginTop: 15,
                    fontFamily: "Raleway_500Medium",
                  },
                  this.state.selfi_photo_error
                    ? { color: "red" }
                    : { color: "#888888" },
                ]}
              >
                Загрузите селфи с правами или паспортом
              </Text>
              <Text
                style={{
                  color: "#888888",
                  fontSize: 11,
                  lineHeight: 13,
                  marginLeft: 25,
                  marginBottom: 10,
                  fontFamily: "Raleway_400Regular",
                }}
              >
                (Можно, чтобы не видно было номер паспорта)
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  this.state.selfi_photo_error
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "#B5D8FE" },
                ]}
                onPress={() => this.pickImage2()}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontFamily: "Raleway_500Medium",
                  }}
                >
                  Загрузить
                </Text>
              </TouchableOpacity>

              {this.state.selfi_photo === null && <></>}
              {this.state.selfi_photo !== null &&
                this.state.selfi_photo_error === false && (
                  <Image
                    source={require("../../assets/image/changed.png")}
                    style={{ width: 32, height: 32 }}
                  />
                )}
            </View>
            <View style={styles.checkBox}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  this.setState({ i_agree: !this.state.i_agree });
                }}
              >
                <View>
                  {this.state.i_agree === false && (
                    <Svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Rect
                        x="1"
                        y="1"
                        width="26"
                        height="26"
                        rx="3"
                        stroke={this.state.i_agree_error ? "red" : "#B5D8FE"}
                        stroke-width="2"
                      />
                    </Svg>
                  )}
                  {this.state.i_agree === true && (
                    <Svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Rect width="28" height="28" rx="4" fill="#B5D8FE" />
                      <Path
                        d="M7 15L11.4118 20L22 7"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  )}
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: "#888888",
                  fontSize: 12,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Согласен с правилами{" "}
                <Text
                  style={{
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  приложения
                </Text>{" "}
                и {"\n"}
                <Text
                  style={{
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  политикой конфиденциальности
                </Text>
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
                  marginVertical: 25,
                }}
                onPress={async () => {
                  if (
                    this.state.value_length.length < 18 &&
                    this.state.value_length !== ""
                  ) {
                    this.setState({ phone_error: true });
                  } else {
                    await this.DizainerRegisterApi();
                  }
                }}
              >
                <BlueButton name="Зарегистрироваться" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 111,
    marginLeft: 25,
    height: 40,
    backgroundColor: "#B5D8FE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 5,
  },
  checkBox: {
    paddingHorizontal: 25,
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
  },
});
