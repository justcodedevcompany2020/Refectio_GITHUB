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
  Keyboard,
  Modal,
} from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import BlueButton from "../Component/Buttons/BlueButton";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import Svg, { Path, Rect } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_URL, APP_IMAGE_URL } from "@env";

export default class AddProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardOpen: false,
      category: false,
      categoryChanged: "",
      categoryChanged_error: "",
      categoryId: "",
      img: null,

      name: "",
      name_error: false,

      frame: "",

      facades: "",
      facades_error: false,

      length: "",
      length_error: false,

      height: "",
      height_error: false,

      price: "",
      price_error: false,

      material: "",
      inserciones: "",
      description: "",

      tabletop: "",
      tabletop_error: false,
      all_images: [],
      all_images_error: false,
      max_image_error: false,

      categoryArray: [],

      modalBool: false,

      buttonSend: true,
    };
  }
  formdata = new FormData();

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.5,
      selectionLimit: 10,
    });
    if (!result.canceled) {
      this.setState({ img: result.assets[0].uri, all_images_error: false });
    } else {
      this.setState({ all_images_error: true });
    }

    let all_images = this.state.all_images;
    if (result.hasOwnProperty("assets")) {
      await result.assets.map((element, index) => {
        all_images.push({
          uri: element.uri,
          type: "image/jpg",
          name: "photo.jpg",
        });
      });
    } else {
      all_images.push({
        uri: result.assets[0].uri,
        type: "image/jpg",
        name: "photo.jpg",
      });
    }

    this.setState({
      all_images: all_images,
      all_images_error: false,
    });
  };

  clearAllData = () => {
    this.setState({
      keyboardOpen: false,
      category: false,
      categoryChanged: "",
      categoryChanged_error: "",
      categoryId: "",
      img: null,

      name: "",
      name_error: false,

      frame: "",

      facades: "",
      facades_error: false,

      length: "",
      length_error: false,

      height: "",
      height_error: false,

      price: "",
      price_error: false,

      material: "",
      inserciones: "",
      description: "",

      tabletop: "",
      tabletop_error: false,
      all_images: [],
      all_images_error: false,
      max_image_error: false,

      categoryArray: [],

      modalBool: false,

      buttonSend: true,

      limitError: false,
    });
  };

  delateSelectedImage = async (index) => {
    let { all_images, max_image_error } = this.state;

    let new_all_images = [];

    if (all_images.length <= 11) {
      this.setState({ max_image_error: false });
    }

    for (let i = 0; i < all_images.length; i++) {
      if (i == index) {
        continue;
      }
      new_all_images.push(all_images[i]);
    }
    this.setState({
      all_images: new_all_images,
    });
  };

  getAuthUserProfile = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    myHeaders.append("Authorization", AuthStr);
    myHeaders.append("Content-Type", "multipart/form-data");
    await fetch(`${APP_URL}AuthUserProfile`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          categoryArray: res?.data[0].user_category_product,
        });
      });
  };

  sendProduct = async () => {
    let { all_images } = this.state;
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    myHeaders.append("Authorization", AuthStr);
    myHeaders.append("Content-Type", "multipart/form-data");

    this.formdata.append("category_id", this.state.categoryId);
    this.formdata.append("category_name", this.state.categoryChanged);
    this.formdata.append("name", this.state.name);
    this.formdata.append("frame", this.state.frame);
    this.formdata.append("facades", this.state.facades);
    this.formdata.append("length", this.state.length);
    this.formdata.append("height", this.state.height);
    this.formdata.append("price", this.state.price);
    this.formdata.append("tabletop", this.state.tabletop);
    this.formdata.append("material", this.state.material);
    this.formdata.append("inserciones", this.state.inserciones);
    this.formdata.append("description", this.state.description);

    if (this.state.all_images.length === 0) {
      this.setState({ buttonSend: false, all_images_error: true });
    } else if (this.state.all_images.length > 10) {
      this.setState({ max_image_error: true });
    }
    if (
      this.state.all_images.length > 0 &&
      this.state.all_images.length <= 10 &&
      this.state.name !== "" &&
      this.state.categoryChanged !== ""
    ) {
      await all_images.map((element, index) => {
        this.formdata.append("photo[]", element);
      });

      this.setState({ buttonSend: true, max_image_error: false });
    }

    if (this.state.buttonSend) {
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: this.formdata,
        redirect: "follow",
      };

      await fetch(`${APP_URL}createnewproductProizvoditel`, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status === true) {
            (await this.setState({
              buttonSend: false,
              modalBool: true,
            })) && (await this.clearAllData());
          } else if (result.status !== true) {
            if (result.hasOwnProperty("category_name")) {
              this.setState({
                categoryChanged_error: true,
              });
            } else {
              this.setState({
                categoryChanged_error: false,
              });
            }

            if (result.hasOwnProperty("name")) {
              this.setState({
                name_error: true,
              });
            } else {
              this.setState({
                name_error: false,
              });
            }

            if (result.hasOwnProperty("photo")) {
              this.setState({
                all_images_error: true,
              });
            } else {
              this.setState({
                all_images_error: false,
              });
            }

            if (
              result.data?.message ==
              "you already have 3 products under this category"
            ) {
              await this.setState({ limitError: true });
              let set = setTimeout(() => {
                this.setState({ limitError: false });
                this.clearAllData();
                clearTimeout(set);
              }, 3000);
            }
          }
          this.formdata = new FormData();
        })
        .catch((error) => console.log("error", error));
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.getAuthUserProfile();

    this.focusListener = navigation.addListener("focus", () => {
      this.getAuthUserProfile();
    });

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

  findInstring = (cat, cat_arr) => {
    let bool = false;
    for (const cat_arr_item in cat_arr) {
      if (cat == cat_arr[cat_arr_item]) {
        bool = true;
      }
    }

    return bool;
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.main}>
          <Modal visible={this.state.modalBool}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 80, height: 80 }}
                source={require("../../assets/image/flat-color-icons_ok.png")}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 22,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 25,
                  color: "#2D9EFB",
                }}
              >
                Вы успешно{"\n"}добавили продукт
              </Text>

              <TouchableOpacity
                style={{ marginTop: 170 }}
                onPress={async () => {
                  await this.props.navigation.navigate("Praductia", {
                    params: this.props.user_id,
                  });
                  await this.clearAllData();
                }}
              >
                <BlueButton name="В каталог" />
              </TouchableOpacity>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Praductia", {
                params: this.props.user_id,
              });
              this.clearAllData();
            }}
            style={{
              position: "absolute",
              left: 11.66,
              top: 10,
              zIndex: 100,
            }}
          >
            <ArrowGrayComponent />
          </TouchableOpacity>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Poppins_600SemiBold",
                textAlign: "center",
                marginTop: 15,
              }}
            >
              Добавление продукции
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 25,
                  },
                  this.state.name_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Имя продукции*
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                multiline={false}
                placeholder="Кухня ЛРАЙ145 МДФ ПВХ Сатин Бежевый/СИСТЕМА"
                numberOfLines={1}
                keyboardType="default"
                style={[
                  {
                    borderWidth: 1,
                    padding: 10,
                    paddingRight: 0,
                    width: "100%",
                    borderRadius: 5,
                    fontSize: 13.5,
                  },
                  this.state.name_error
                    ? { borderColor: "red" }
                    : { borderColor: "#F5F5F5" },
                ]}
                value={this.state.name}
                onChangeText={(text) => {
                  this.setState({ name: text, name_error: false });
                }}
              />
            </View>

            <View>
              <Text
                style={[
                  {
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  },
                  this.state.categoryChanged_error
                    ? { color: "red" }
                    : { color: "#5B5B5B" },
                ]}
              >
                Категории*
              </Text>
              <View
                style={{
                  position: "relative",
                }}
              >
                <TouchableOpacity
                  style={[
                    {
                      borderWidth: 1,
                      borderColor: "#F5F5F5",
                      padding: 10,
                      width: "100%",
                      borderRadius: 6,
                      position: "relative",
                      height: 45,
                      marginRight: 12,
                    },
                    this.state.categoryChanged_error
                      ? { borderColor: "red" }
                      : { borderColor: "#F5F5F5" },
                  ]}
                  onPress={() => {
                    // if (this.state.categoryChanged == '') {
                    //   this.setState({ categoryChanged: '' })
                    // }
                    this.setState({
                      category: !this.state.category,
                      categoryChanged_error: false,
                    });
                  }}
                >
                  <Text
                    style={{
                      color: "#5B5B5B",
                      fontFamily: "Poppins_500Medium",
                    }}
                  >
                    {this.state.categoryChanged}
                  </Text>

                  <View style={{ position: "absolute", right: 17, bottom: 18 }}>
                    {!this.state.category && (
                      <Svg
                        width="18"
                        height="10"
                        viewBox="0 0 18 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M1 1L9 9L17 1"
                          stroke="#888888"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </Svg>
                    )}
                    {this.state.category && (
                      <Svg
                        width="18"
                        height="10"
                        viewBox="0 0 18 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M1 9L9 1L17 9"
                          stroke="#888888"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </Svg>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={
                  this.state.category
                    ? styles.sOpenCityDropDownActive
                    : styles.sOpenCityDropDown
                }
              >
                <ScrollView nestedScrollEnabled={true}>
                  {this.state.categoryArray.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          textAlign: "left",
                        }}
                        onPress={async () =>
                          await this.setState({
                            categoryChanged: item.category_name,
                            category: false,
                            categoryId: item.category_id,
                            categoryChanged_error: false,
                          })
                        }
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            paddingVertical: 10,
                            fontFamily: "Poppins_500Medium",
                          }}
                        >
                          {item.category_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            {this.findInstring(this.state.categoryChanged, [
              "Кухни",
              "Мебель для ванной",
              "Прихожие",
              "Гардеробные",
              "Гостиные",
              "Кабинеты",
            ]) && (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Корпус
                </Text>

                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="ДСП"
                  keyboardType="default"
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  value={this.state.frame}
                  onChangeText={(text) => this.setState({ frame: text })}
                />
              </View>
            )}

            {this.findInstring(this.state.categoryChanged, [
              "Кухни",
              "Мебель для ванной",
            ]) && (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Столешница
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Камень"
                  keyboardType="default"
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  value={this.state.tabletop}
                  onChangeText={(text) => this.setState({ tabletop: text })}
                />
              </View>
            )}

            {this.findInstring(this.state.categoryChanged, [
              "Кухни",
              "Мебель для ванной",
              "Прихожие",
              "Гардеробные",
              "Гостиные",
              "Кабинеты",
              "Детские",
              "Мебель для спальни ",
              "Межкомнатные перегородки",
            ]) && (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Длина
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="8 метров"
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  value={this.state.length}
                  onChangeText={(text) => this.setState({ length: text })}
                />
              </View>
            )}

            {this.findInstring(this.state.categoryChanged, [
              "Прихожие",
              "Гардеробные",
              "Детские",
              "Межкомнатные перегородки",
            ]) && (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Высота
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="0.5 метров"
                  keyboardType="number-pad"
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  value={this.state.height}
                  onChangeText={(text) => this.setState({ height: text })}
                />
              </View>
            )}

            {this.findInstring(this.state.categoryChanged, [
              "Кухни",
              "Мебель для ванной",
              "Прихожие",
              "Гардеробные",
              "Гостиные",
              "Кабинеты",
              "Детские",
              "Мебель для спальни ",
            ]) && (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Фасады
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Эмаль"
                  keyboardType="default"
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  value={this.state.facades}
                  onChangeText={(text) => this.setState({ facades: text })}
                />
              </View>
            )}

            {this.findInstring(this.state.categoryChanged, [
              "Межкомнатные перегородки",
            ]) && (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Материал
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Эмаль"
                  keyboardType="default"
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  value={this.state.material}
                  onChangeText={(text) => this.setState({ material: text })}
                />
              </View>
            )}

            {this.findInstring(this.state.categoryChanged, [
              "Межкомнатные перегородки",
            ]) && (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Вставки
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Эмаль"
                  keyboardType="default"
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  value={this.state.inserciones}
                  onChangeText={(text) => this.setState({ inserciones: text })}
                />
              </View>
            )}

            {this.findInstring(this.state.categoryChanged, [
              "Островные павильоны",
              "Выставочные стенды",
              "Зоны ресепшн",
            ]) && (
              <View>
                <Text
                  underlineColorAndroid={"transparent"}
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Описание
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  // placeholder="Эмаль"
                  keyboardType="default"
                  multiline
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  value={this.state.description}
                  onChangeText={(text) => this.setState({ description: text })}
                />
              </View>
            )}

            {this.findInstring(this.state.categoryChanged, [
              "Кухни",
              "Мебель для ванной",
              "Прихожие",
              "Детские",
              "Гардеробные",
              "Мебель для спальни ",
              "Гостиные",
              "Кабинеты",
              "Межкомнатные перегородки",
              "Островные павильоны",
              "Выставочные стенды",
              "Зоны ресепшн",
            ]) && (
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                    marginTop: 12,
                  }}
                >
                  Цена
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="1.000.000"
                    keyboardType="number-pad"
                    style={{
                      borderWidth: 1,
                      borderColor: "#F5F5F5",
                      padding: 10,
                      width: "89%",
                      borderRadius: 5,
                      marginRight: 5,
                    }}
                    value={this.state.price}
                    maxLength={9}
                    onChangeText={(text) => {
                      let without_dots = text.split(".").join("");
                      let with_dots = without_dots
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                      this.setState({ price: with_dots });
                    }}
                  />
                  <Image
                    source={require("../../assets/image/apranqiGin.png")}
                    style={{ width: 30, height: 50 }}
                  />
                </View>
              </View>
            )}
            <Text
              style={[
                {
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 15,
                },
                this.state.all_images_error
                  ? { color: "red" }
                  : { color: "#5B5B5B" },
              ]}
            >
              {this.state.all_images_error
                ? "Загрузите фотографию"
                : "Фотографии продукта*"}
            </Text>

            <TouchableOpacity
              onPress={() => this.pickImage()}
              style={{
                width: 165,
                height: 38,
                backgroundColor: "#B5D8FE",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff",
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Загрузить
              </Text>
            </TouchableOpacity>

            {this.state.all_images.length > 0 && (
              <ScrollView
                horizontal={true}
                style={{ marginTop: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: 120,
                    alignItems: "center",
                  }}
                >
                  {this.state.all_images.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginRight: 10,
                          position: "relative",
                          width: 100,
                          height: 100,
                        }}
                      >
                        <Image
                          source={{ uri: item.uri }}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                          }}
                        />

                        <TouchableOpacity
                          onPress={() => this.delateSelectedImage(index)}
                          style={{
                            width: 20,
                            height: 20,
                            position: "absolute",
                            right: 5,
                            top: 5,
                            backgroundColor: "white",
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={require("../../assets/image/ixs.png")}
                            style={{ width: 10, height: 10 }}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            )}

            {this.state.limitError === true && (
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                Превышен лимит добавления товаров в данной категории
              </Text>
            )}
            {this.state.max_image_error === true && (
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                Максимальное количество из. 10 шт
              </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                this.sendProduct();
              }}
              style={{
                alignSelf: "center",
                marginTop: 60,
                marginBottom: 60,
              }}
            >
              <BlueButton name="Добавить" />
            </TouchableOpacity>
          </ScrollView>
        </View>
        {this.state.keyboardOpen === false && (
          <CustomerMainPageNavComponent navigation={this.props.navigation} />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  container: {
    position: "relative",
    paddingBottom: 3,
  },
  sOpenCityDropDown: {
    width: "100%",
    height: 0,
  },
  sOpenCityDropDownActive: {
    width: "100%",
    height: 120,
    elevation: 2,
    borderColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
});
