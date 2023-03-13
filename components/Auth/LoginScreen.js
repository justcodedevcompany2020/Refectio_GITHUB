import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ImageBackground,
  Platform,
} from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import BlueButton from "../Component/Buttons/BlueButton";
import { AuthContext } from "../AuthContext/context";
import MaskInput from "react-native-mask-input";
import { APP_URL, APP_IMAGE_URL } from "@env";
import * as AppleAuthentication from "expo-apple-authentication";
import jwtDecode from "jwt-decode";

export default class LoginScreenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: true,
      pass: "",
      pass_error: false,

      login: "",
      login_error: false,
      no_user: false,
      no_verify: false,

      achq: require("../../assets/image/achq.png"),
      achqBac: require("../../assets/image/achq-bac.png"),

      moderacia: false,
      sendToken: null,

      designer_or_manufacturer: true,

      i_am_designer: false,
    };
  }

  static contextType = AuthContext;

  goToForgetPassword = () => {
    this.props.navigation.navigate("ForgetPassword");
  };
  goToAuthScreen = async () => {
    await this.props.navigation.navigate("AuthScreen");
    await this.clearAllData();
  };

  setStorage = async (userToken) => {
    await AsyncStorage.setItem("userToken", userToken);
  };

  clearAllData = async () => {
    await this.setState({
      password: true,
      pass: "",
      pass_error: false,
      login: "",
      login_error: false,
      no_user: false,
      no_verify: false,
      moderacia: false,
      sendToken: null,

      authTokenApple: null,
      appleAuthAvailable: false,
      designer_or_manufacturer: true,
      i_am_designer: false,
      apple_id: "",
    });
  };

  componentDidMount() {
    // const { navigation } = this.props;
    // this.focusListener = navigation.addListener("focus", () => {
    this.checkAvailable();
    // });
  }

  checkAvailable = async () => {
    const isAvailable = await AppleAuthentication.isAvailableAsync();
    await this.setState({ appleAuthAvailable: isAvailable });
    console.log(isAvailable, "isAvailable");
  };

  register = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // console.log(credential);
      this.setState({ authTokenApple: credential });

      const decoded = jwtDecode(credential.identityToken);
      const current = Date.now() / 1000;
      this.setState({
        login: decoded.email,
        apple_id: decoded.sub,
        login_error: false,
      });

      console.log(decoded);
    } catch (e) {
      // if (e.code === "ERR_REQUEST_CANCELED") {
      //   // handle that the user canceled the sign-in flow
      // } else {
      //   // handle other errors
      // }
      this.setState({
        login_error: true,
      });
      console.log(e, "error");
    }
  };

  loginUserFromApple = async () => {
    fetch(`${APP_URL}loginuserFromApple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.login,
        apple_id: this.state.apple_id,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        // let userToken = res.message.token;
        console.log(res);
        if (res.status == false) {
          if (res.message.message == "user does not exist") {
            this.setState({
              no_user: true,
            });
          } else {
            this.setState({
              no_user: false,
            });
          }
        } else {
          if (res.message.user.active == "2") {
            let foundUser = {
              userToken: userToken,
              userRole: res.message.role_id,
            };
            this.context.signIn(foundUser);
          } else if (res.message.user.active == "1") {
            this.setState({ moderacia: true });
          }
        }
      });
  };

  sendLoginData = async () => {
    fetch(`${APP_URL}loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.pass,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        let userToken = res.message.token;

        if (res.status == false) {
          if (res.message.message == "user does not exist") {
            this.setState({
              no_user: true,
            });
          } else {
            this.setState({
              no_user: false,
            });
          }

          if (res.message.message == "wrong password") {
            this.setState({
              pass_error: true,
            });
          } else {
            this.setState({
              pass_error: false,
            });
          }
          if (
            res.message == "User@   heraxosahamari hastatum chi ancel Levon jan"
          ) {
            this.setState({
              no_verify: true,
            });
          } else {
            this.setState({
              no_verify: false,
            });
          }
        } else {
          if (res.message.user.active == "2") {
            let foundUser = {
              userToken: userToken,
              userRole: res.message.role_id,
            };
            this.context.signIn(foundUser);
          } else if (res.message.user.active == "1") {
            this.setState({ moderacia: true });
          }
        }
      });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 1,

            position: "relative",
            alignItems: "center",
          }}
        >
          {Platform.OS === "ios" && (
            <Modal visible={this.state.designer_or_manufacturer}>
              <View
                style={{ flex: 1, backgroundColor: "white", paddingTop: 50 }}
              >
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
                    top: 60,
                    zIndex: -1,
                  }}
                />

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
                      this.setState({
                        i_am_designer: true,
                        designer_or_manufacturer: false,
                      });
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
                      this.setState({
                        i_am_designer: false,
                        designer_or_manufacturer: false,
                      });
                    }}
                  >
                    <BlueButton name="Я-Производитель" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
          <Modal visible={this.state.moderacia}>
            <ImageBackground
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../../assets/image/blurBg.png")}
            >
              <View
                style={{
                  width: "90%",
                  height: "50%",
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  position: "relative",
                  paddingHorizontal: 15,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 18,
                    top: 18,
                  }}
                  onPress={() => this.setState({ moderacia: false })}
                >
                  <Image
                    source={require("../../assets/image/ixs.png")}
                    style={{
                      width: 22.5,
                      height: 22.5,
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    marginTop: 70,
                    fontSize: 26,
                    textAlign: "center",
                    color: "#2D9EFB",
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  Ваш аккаунт{"\n"}на модерации
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    textAlign: "center",
                    marginTop: 20,
                    color: "#888888",
                  }}
                >
                  Просим вас ожидать окончания{"\n"}проверки
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 80,
                  }}
                  onPress={() => this.setState({ moderacia: false })}
                >
                  <BlueButton name="Закрыть" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <TouchableOpacity
            onPress={() => this.goToAuthScreen()}
            style={{
              position: "absolute",
              left: 10,
              top: 23,
              zIndex: 100,
            }}
          >
            <ArrowGrayComponent />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: 130,
            }}
          ></View>

          <Image
            source={require("../../assets/image/RefectioWallpaper.png")}
            style={{
              top: 23,
              height: 135,
              width: "95%",
              position: "absolute",
              right: 0,
              zIndex: -1,
              resizeMode: "contain",
            }}
          />

          <Text style={styles.vxod}>Вход</Text>

          {Platform.OS === "ios" && this.state.i_am_designer === true ? (
            <View style={{ position: "relative", width: "85%" }}>
              <Text
                style={[
                  styles.fiealdset,
                  { marginTop: 15 },
                  this.state.login_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                {this.state.login_error
                  ? "Данный Apple id уже зарегистрирован"
                  : "AppleID*"}
              </Text>
              {this.state.appleAuthAvailable && this.state.authTokenApple && (
                <TextInput
                  underlineColorAndroid="transparent"
                  editable={false}
                  style={[
                    {
                      borderWidth: 1,
                      padding: 10,
                      width: "100%",
                      borderRadius: 5,
                    },
                    this.state.login_error
                      ? { borderColor: "red" }
                      : { borderColor: "#F5F5F5" },
                  ]}
                  value={this.state.login}
                />
              )}
              {this.state.appleAuthAvailable && !this.state.authTokenApple && (
                <TouchableOpacity
                  onPress={() => this.register()}
                  style={[
                    {
                      borderWidth: 1,
                      padding: 10,
                      width: "100%",
                      borderRadius: 5,
                      borderColor: "#F5F5F5",
                      height: 40,
                    },
                    this.state.login_error
                      ? { borderColor: "red" }
                      : { borderColor: "#F5F5F5" },
                  ]}
                />
              )}
            </View>
          ) : (
            <View style={{ width: "85%", marginBottom: 15 }}>
              <Text
                style={[
                  styles.fiealdset,
                  { marginTop: 27 },
                  this.state.login_error ||
                  this.state.no_user ||
                  this.state.no_verify
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                {this.state.no_user
                  ? "По такому номеру телефона пользователь не зарегистрирован"
                  : this.state.no_verify
                  ? "На данный момент не заходит и не ясна причина"
                  : "Номер телефона"}
              </Text>
              <MaskInput
                underlineColorAndroid="transparent"
                keyboardType="phone-pad"
                placeholder="+7 (975) 991-99-99"
                style={[
                  {
                    borderWidth: 1,
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  },
                  this.state.login_error || this.state.no_user
                    ? { borderColor: "red" }
                    : { borderColor: "#F5F5F5" },
                ]}
                value={this.state.login}
                onChangeText={(text, unmasked, obfuscated) => {
                  this.setState({ login: text, login_error: false });
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
          )}
          {this.state.i_am_designer !== true && (
            <View style={{ position: "relative", width: "85%" }}>
              <Text
                style={[
                  styles.fiealdset,
                  { marginTop: 15 },
                  this.state.pass_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                {this.state.pass_error ? "Неправильно указан пароль" : "Пароль"}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={this.state.password}
                style={[
                  styles.input,
                  this.state.pass_error
                    ? { borderColor: "red" }
                    : { borderColor: "#F5F5F5" },
                ]}
                value={this.state.pass}
                onChangeText={(text) =>
                  this.setState({ pass: text, pass_error: false })
                }
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, bottom: 10 }}
                onPress={() =>
                  this.setState({ password: !this.state.password })
                }
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
          )}

          {this.state.i_am_designer === true ? (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                marginTop: 113,
              }}
              onPress={() => {
                this.loginUserFromApple();
              }}
            >
              <BlueButton name="Войти" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                marginTop: 113,
              }}
              onPress={() => {
                if (this.state.login !== "" && this.state.pass !== "") {
                  this.sendLoginData();
                } else {
                  if (this.state.pass == "") {
                    this.setState({
                      pass_error: true,
                    });
                  } else {
                    this.setState({
                      pass_error: false,
                    });
                  }
                  if (this.state.login == "") {
                    this.setState({
                      login_error: true,
                    });
                  } else {
                    this.setState({
                      login_error: false,
                    });
                  }
                }
              }}
            >
              <BlueButton name="Войти" />
            </TouchableOpacity>
          )}
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              flexDirection: "row",
              marginTop: 18,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.goToForgetPassword();
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  lineHeight: 23,
                  fontSize: 15,
                  color: "#888888",
                }}
              >
                Забыли пароль?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: "93.5%",
    height: 125,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginTop: 23,
  },
  vxod: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    lineHeight: 54,
    fontSize: 32,
    color: "#2D9EFB",
    marginTop: 20,
  },
  fiealdset: {
    fontFamily: "Poppins_500Medium",
    lineHeight: 23,
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
});
