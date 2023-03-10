import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Slider from "../slider/Slider";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import Svg, { Path, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BlueButton from "../Component/Buttons/BlueButton";
import { APP_URL, APP_IMAGE_URL } from "@env";

export default class PraductiaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delateSortBy: [],

      active: 0,
      getAllProducts: [],

      user: [],
      user_bonus_for_designer: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],

      delateProductModal: false,

      change_category_loaded: false,
      pressCategory: true,
    };
  }

  enterCheckBox = (id) => {
    let filterSort = this.state.delateSortBy;
    let find = false;
    filterSort.find((item) => {
      if (item == id) {
        find = true;
      }
    });

    if (find) {
      const index = filterSort.indexOf(id);
      filterSort.splice(index, 1);
    } else {
      filterSort.push(id);
    }
    this.setState({ delateSortBy: filterSort });
  };

  verifyCheckBox = (id) => {
    let filterSort = this.state.delateSortBy;
    let find = false;
    filterSort.find((item) => {
      if (item == id) {
        find = true;
      }
    });
    return find;
  };

  getObjectData = async () => {
    let userID = this.props.user_id;

    await fetch(`${APP_URL}getOneProizvoditel/user_id=` + userID, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        let data = res.data.products;
        if (res.status === false) {
          data = [];
        } else {
          for (let i = 0; i < data.length; i++) {
            if (data[i].product_image.length < 1) {
              data[i].images = [];
              continue;
            }

            let product_image = data[i].product_image;

            data[i].images = product_image;
          }
        }

        this.setState({
          user: res.data.user,
          user_bonus_for_designer: res.data.user_bonus_for_designer,
          user_category_for_product: res.data.user_category_for_product,
          city_for_sales_user: res.data.city_for_sales_user,
        });
      });
  };

  delateProduct = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Authorization", "Bearer " + userToken);

    let formdata = new FormData();
    for (let i = 0; i < this.state.delateSortBy.length; i++) {
      formdata.append("product_id[]", this.state.delateSortBy[i]);
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${APP_URL}deleteAuthUserProduct`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status === true) {
          await this.setState({
            delateProductModal: false,
            delateSortBy: [],
            products: [],
          });
          (await this.updateProduct(
            this.state.user_category_for_product[0]?.category_name
          )) && (await this.getObjectData());
        }
      })
      .catch((error) => console.log("error", error));
  };

  updateProduct = async (category_name) => {
    await this.setState({
      change_category_loaded: true,
    });
    let userID = this.props.user_id;
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    myHeaders.append("Authorization", "Bearer " + userToken);

    let formdata = new FormData();
    formdata.append("category_name", category_name);
    formdata.append("user_id", userID);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${APP_URL}filtergetOneProizvoditel`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === false) {
          this.setState({
            products: [],
            change_category_loaded: false,
          });

          return false;
        }

        let data = res.data;

        if (data.length === 0) {
          data = [];
        } else {
          for (let i = 0; i < data.length; i++) {
            if (data[i].product_image.length < 1) {
              data[i].images = [];
              continue;
            }

            let product_image = data[i].product_image;

            data[i].images = product_image;
          }
        }

        this.setState({
          products: data.products,
          change_category_loaded: false,
        });
      })
      .catch((error) => console.log("error", error));
  };

  updateProductAfterClickToCategory = async (category_name, index) => {
    await this.setState({
      change_category_loaded: true,
    });

    if (this.state.pressCategory) {
      this.setState({
        pressCategory: false,
        active: index,
      });

      let userID = this.props.user_id;

      await this.setState({
        change_category_loaded: true,
      });

      let myHeaders = new Headers();
      let userToken = await AsyncStorage.getItem("userToken");
      myHeaders.append("Authorization", "Bearer " + userToken);

      let formdata = new FormData();
      formdata.append("category_name", category_name);
      formdata.append("user_id", userID);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${APP_URL}filtergetOneProizvoditel`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === false) {
            this.setState({
              products: [],
              change_category_loaded: false,
            });

            return false;
          }

          let data = res.data;
          if (data.length === 0) {
            data = [];
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].product_image.length < 1) {
                data[i].images = [];
                continue;
              }

              let product_image = data[i].product_image;

              data[i].images = product_image;
            }
          }

          this.setState({
            products: data.products,
            change_category_loaded: false,
            pressCategory: true,
          });
        });
    }
  };

  loadedDataAfterLoadPage = async () => {
    await this.getObjectData();
    await this.updateProduct(
      this.state.user_category_for_product[0]?.category_name
    );
    await this.setState({ active: 0 });
  };

  componentDidMount = () => {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("focus", () => {
      this.loadedDataAfterLoadPage();
    });
  };

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener();
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.main}>
          <Modal visible={this.state.delateProductModal}>
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
                  backgroundColor: "#FFFFFF",
                  width: "90%",
                  borderRadius: 20,
                  position: "relative",
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", right: 18, top: 18 }}
                  onPress={() => {
                    this.setState({ delateProductModal: false });
                  }}
                >
                  <Image
                    source={require("../../assets/image/ixs.png")}
                    style={{ width: 22.5, height: 22.5 }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 22,
                    textAlign: "center",
                    marginTop: 70,
                    color: "#2D9EFB",
                  }}
                >
                  {" "}
                  Удаление продукции
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins_400Regular",
                    marginTop: 30,
                    fontSize: 16,
                  }}
                >
                  Подтвердите удаление выбранной{"\n"}продукции
                </Text>

                <TouchableOpacity
                  onPress={async () => {
                    await this.delateProduct();
                  }}
                  style={{ alignSelf: "center", marginTop: 67 }}
                >
                  <BlueButton name="Подтвердить" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({ delateProductModal: false });
                  }}
                  style={{
                    borderWidth: 3,
                    borderColor: "#B5D8FE",
                    width: 285,
                    height: 44,
                    justifyContent: "center",
                    borderRadius: 20,
                    alignSelf: "center",
                    marginTop: 12,
                    marginBottom: 46,
                  }}
                >
                  <Text
                    style={{
                      color: "#B5D8FE",
                      fontSize: 18,
                      textAlign: "center",
                      fontFamily: "Poppins_700Bold",
                    }}
                  >
                    Отменить
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CustomerMyAccaunt")}
            style={{
              position: "absolute",
              left: 15,
              top: 10,
              zIndex: 100,
            }}
          >
            <ArrowGrayComponent />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              marginBottom: 25,
            }}
          >
            <Text
              style={{
                width: "100%",
                marginTop: 15,
                textAlign: "center",
                fontSize: 17,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Продукция
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddProduct", {
                  params: this.props.user_id,
                });
              }}
              style={{
                position: "absolute",
                zIndex: 100,
                right: 55,
                bottom: 0,
              }}
            >
              <Image
                source={require("../../assets/image/plus.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (this.state.delateSortBy.length > 0) {
                  this.setState({ delateProductModal: true });
                }
              }}
              style={{
                position: "absolute",
                zIndex: 100,
                right: 15,
                bottom: 0,
              }}
            >
              <Image
                source={require("../../assets/image/karzina.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 23,
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {this.state.user_category_for_product?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      await this.updateProductAfterClickToCategory(
                        item.category_name
                      );
                      this.setState({ active: index });
                    }}
                    key={index}
                    style={
                      this.state.active === index
                        ? styles.slideButtonActive
                        : styles.slideButton
                    }
                  >
                    <Text
                      style={
                        this.state.active === index
                          ? styles.slideTextActive
                          : styles.slideText
                      }
                    >
                      {item.category_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {this.state.change_category_loaded && (
            <View style={{ marginTop: 200 }}>
              <ActivityIndicator size={100} color={"#C2C2C2"} />
            </View>
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.products.length === 0 ? (
              <View style={{ width: "100%", marginTop: 30 }}>
                <Text
                  style={{
                    fontFamily: "Raleway_400Regular",
                    fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  По выбранной категорий нет продуктов
                </Text>
              </View>
            ) : (
              !this.state.change_category_loaded &&
              this.state.products.map((item, index) => {
                return (
                  <View
                    key={item.id}
                    style={{
                      position: "relative",
                      marginBottom: 18,
                    }}
                  >
                    <View key={item.id} style={styles.checkBox}>
                      <TouchableOpacity
                        key={index}
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => {
                          this.enterCheckBox(item.id);
                        }}
                      >
                        <View>
                          {this.verifyCheckBox(item.id) === false && (
                            <Svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Rect
                                x="0.5"
                                y="0.5"
                                width="24"
                                height="24"
                                rx="3.5"
                                fill="white"
                              />
                              <Rect
                                x="0.5"
                                y="0.5"
                                width="24"
                                height="24"
                                rx="3.5"
                                stroke="#E5E5E5"
                              />
                            </Svg>
                          )}
                          {this.verifyCheckBox(item.id) === true && (
                            <Svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Rect
                                x="0.5"
                                y="0.5"
                                width="24"
                                height="24"
                                rx="3.5"
                                fill="white"
                              />
                              <Path
                                d="M5 14L9.41176 19L20 6"
                                stroke="#1571F0"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <Rect
                                x="0.5"
                                y="0.5"
                                width="24"
                                height="24"
                                rx="3.5"
                                stroke="#E5E5E5"
                              />
                            </Svg>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Slider slid={item.product_image} />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Raleway_600SemiBold",
                          fontSize: 13,
                          marginTop: 5,
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("EditProduct", {
                            product_id: item.id,
                            user_id: item.user_id,
                          });
                        }}
                      >
                        <Image
                          source={require("../../assets/image/ep_edit.png")}
                          style={{ width: 22, height: 22 }}
                        />
                      </TouchableOpacity>
                    </View>
                    {item.facades && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Фасады : {item.facades}
                      </Text>
                    )}
                    {item.frame && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Корпус: {item.frame}
                      </Text>
                    )}
                    {item.tabletop && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Столешница: {item.tabletop}
                      </Text>
                    )}
                    {item.length && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Длина: {item.length} метров*
                      </Text>
                    )}

                    {item.height && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Высота: {item.height} метров*
                      </Text>
                    )}
                    {item.material && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Материал: {item.material}
                      </Text>
                    )}
                    {item.description && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Описание: {item.description}
                      </Text>
                    )}
                    {item.inserciones && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Вставки: {item.inserciones}
                      </Text>
                    )}
                    {item.price && (
                      <Text style={{ fontFamily: "Raleway_400Regular" }}>
                        Цена: {item.price} руб.
                      </Text>
                    )}
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
        <CustomerMainPageNavComponent navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    paddingHorizontal: 15,
  },
  checkBox: {
    position: "absolute",
    zIndex: 100,
    right: 8,
    top: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  slideButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginRight: 6,
  },
  slideButtonActive: {
    backgroundColor: "#94D8F4",
    borderRadius: 8,
    marginRight: 6,
  },
  slideTextActive: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    fontFamily: "Raleway_600SemiBold",
    color: "white",
  },
  slideText: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    fontFamily: "Raleway_600SemiBold",
  },
});
