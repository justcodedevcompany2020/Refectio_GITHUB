import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import ArrowGrayComponent from "../../../assets/image/ArrowGray";
import CustomerMainPageNavComponent from "../CustomerMainPageNav";
import BlueButton from "../../Component/Buttons/BlueButton";
import MaskInput from "react-native-mask-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { APP_URL, APP_IMAGE_URL, APP_PUBLIC_URL } from "@env";

export default class AddZakaziComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardOpen: false,

      done_time: "",
      done_time_error: false,

      given_time: "",
      given_time_error: false,

      name: "",
      name_error: false,

      photo: null,
      photo_error: false,

      button_boolean: true,
    };
  }

  clearAllData = () => {
    this.setState({
      done_time: "",
      done_time_error: false,

      given_time: "",
      given_time_error: false,

      name: "",
      name_error: false,

      photo: null,
      photo_error: false,

      button_boolean: true,

    });
  };

  form_data = new FormData();

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });
    if (!result.canceled) {
      this.setState({
        photo: result.assets[0].uri,
        photo_error: false,
      });
    } else {
      this.setState({ photo_error: true, photo: null });
    }
  };

  AddNextOrderCustomer = async () => {
    let token = await AsyncStorage.getItem("userToken");

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    if (this.state.button_boolean === true) {
      await this.setState({ button_boolean: false });

      if (this.state.photo !== null) {
        this.form_data.append("photo", {
          uri: this.state.photo,
          type: "image/jpg",
          name: "photo.jpg",
        });
      }

      this.form_data.append("name", this.state.name);
      this.form_data.append("some_id", this.props.item_id);
      this.form_data.append("gatovnost", this.state.done_time);
      this.form_data.append("dostavka", this.state.given_time);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: this.form_data,
        redirect: "follow",
      };
      fetch(`${APP_URL}next-order`, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status === true) {
            await this.props.navigation.navigate("LiveZakazchikSingl", {
              params: this.props.item_id,
            });
            this.clearAllData()
          } else {
            if (result.hasOwnProperty("name")) {
              this.setState({ name_error: true });
            } else {
              this.setState({ name_error: false });
            }
            if (result.hasOwnProperty("photo")) {
              this.setState({ photo_error: true });
            } else {
              this.setState({ photo_error: false });
            }
            if (result.hasOwnProperty("gatovnost")) {
              this.setState({ done_time_error: true });
            } else {
              this.setState({ done_time_error: false });
            }
            if (result.hasOwnProperty("dostavka")) {
              this.setState({ given_time_error: true });
            } else {
              this.setState({ given_time_error: false });
            }
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("focus", () => {});

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener();
      console.log(" END");
      this.clearAllData();
    }
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    this.setState({
      keyboardOpen: true,
    });
  };

  _keyboardDidHide = (event) => {
    this.setState({
      keyboardOpen: false,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Заказы Live</Text>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageEmptyParent}>
              <Text
                style={[
                  styles.photoText,
                  this.state.photo_error
                    ? { color: "red" }
                    : { color: "#333333" },
                ]}
              >
                Фото
              </Text>
              {this.state.photo === null ? (
                <TouchableOpacity onPress={() => this.pickImage()}>
                  <Svg
                    width={85}
                    height={85}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Rect
                      x={0.5}
                      y={0.5}
                      width={84}
                      height={84}
                      rx={17.5}
                      stroke={this.state.photo_error ? "red" : "#767676"}
                    />
                    <Path
                      stroke={this.state.photo_error ? "red" : "#000"}
                      d="M42.5 22v40M62 42.5H22"
                    />
                  </Svg>
                </TouchableOpacity>
              ) : (
                <View style={styles.userIconParent}>
                  <Image
                    source={{ uri: this.state.photo }}
                    style={styles.userIcon}
                    resizeMode={"contain"}
                  />

                  <TouchableOpacity
                    style={styles.delateImg}
                    onPress={async () => {
                      await this.setState({ photo: null });
                    }}
                  >
                    <Svg
                      width={32}
                      height={32}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Rect width={32} height={32} rx={16} fill="#1571F0" />
                      <Path
                        d="M9.413 10.21a.563.563 0 0 1 .796-.796l5.79 5.79 5.789-5.79a.563.563 0 0 1 .796.797L16.794 16l5.79 5.79a.563.563 0 1 1-.796.796l-5.79-5.79-5.788 5.79a.563.563 0 1 1-.797-.797L15.203 16l-5.79-5.79Z"
                        fill="#fff"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View>
              <Text
                style={[
                  styles.nazvaniaText,
                  this.state.name_error
                    ? { color: "red" }
                    : { color: "#333333" },
                ]}
              >
                Название
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Шкаф «Ансамбль»"
                style={[
                  styles.nazvania,
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

            <View style={styles.godnastParent}>
              <View style={{ width: "47%" }}>
                <Text
                  style={[
                    styles.nazvaniaText,
                    this.state.done_time_error
                      ? { color: "red" }
                      : { color: "#333333" },
                  ]}
                >
                  Дата готовности
                </Text>
                <MaskInput
                  underlineColorAndroid="transparent"
                  placeholder="22.08.2023"
                  keyboardType="number-pad"
                  style={[
                    styles.nazvania,
                    this.state.done_time_error
                      ? { borderColor: "red" }
                      : { borderColor: "#F5F5F5" },
                  ]}
                  mask={[
                    /\d/,
                    /\d/,
                    ".",
                    /\d/,
                    /\d/,
                    ".",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  value={this.state.done_time}
                  onChangeText={(value) => {
                    this.setState({ done_time: value, done_time_error: false });
                  }}
                />
              </View>

              <View style={{ width: "47%" }}>
                <Text
                  style={[
                    styles.nazvaniaText,
                    this.state.given_time_error
                      ? { color: "red" }
                      : { color: "#333333" },
                  ]}
                >
                  Дата доставки
                </Text>
                <MaskInput
                  underlineColorAndroid="transparent"
                  placeholder="15.11.2023"
                  keyboardType="number-pad"
                  style={[
                    styles.nazvania,
                    this.state.given_time_error
                      ? { borderColor: "red" }
                      : { borderColor: "#F5F5F5" },
                  ]}
                  mask={[
                    /\d/,
                    /\d/,
                    ".",
                    /\d/,
                    /\d/,
                    ".",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  value={this.state.given_time}
                  onChangeText={(value) => {
                    this.setState({
                      given_time: value,
                      given_time_error: false,
                    });
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.ready}
              onPress={() => this.AddNextOrderCustomer()}
            >
              <BlueButton name="Готово" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.goBack}
              onPress={() => {
                this.props.navigation.navigate("LiveZakazchikSingl", {
                  params: this.props.item_id,
                });
                this.clearAllData();
              }}
            >
              <Text style={styles.goBackText}>Отмена</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
        {this.state.keyboardOpen === false && (
          <CustomerMainPageNavComponent
            active_page={"Заказы"}
            navigation={this.props.navigation}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  pageTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    marginTop: 11,
    color: "#378DFE",
  },
  imageEmptyParent: {
    marginTop: 15,
  },
  photoText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    marginBottom: 8,
  },
  nazvania: {
    borderWidth: 1,
    borderColor: "#F5F5F5",
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
  nazvaniaText: {
    fontFamily: "Poppins_500Medium",
    lineHeight: 23,
    fontSize: 15,
    marginTop: 27,
    marginBottom: 5,
  },
  userIconParent: {
    width: 85,
    height: 85,
    position: "relative",
  },
  userIcon: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
  godnastParent: {
    width: "100%",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ready: {
    alignSelf: "center",
    marginTop: 100,
  },
  goBack: {
    marginTop: 12,
    borderWidth: 3,
    borderColor: "#B5D8FE",
    height: 44,
    width: 285,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  goBackText: {
    fontFamily: "Poppins_700Bold",
    color: "#B5D8FE",
    fontSize: 18,
  },
  delateImg: {
    position: "absolute",
    right: -10,
    top: -10,
  },
});
