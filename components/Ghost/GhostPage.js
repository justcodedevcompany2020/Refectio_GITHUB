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
  Platform,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Slider from "../slider/Slider";
import GhostNavComponent from "./GhostNav";
import FilterComponent from "../Component/FilterComponent";
import * as Font from "expo-font";
import { APP_URL, APP_IMAGE_URL } from "@env";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

import {
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light_Italic,
  Raleway_400Regular_Italic,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black_Italic,
} from "@expo-google-fonts/raleway";
import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";

const customFonts = {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,

  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light_Italic,
  Raleway_400Regular_Italic,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black_Italic,

  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
};

export default class GhostPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      keyboardOpen: false,
      getAllProducts: [],
      countMeshok: 0,

      fontsLoaded: false,

      searchUser: "",

      page: 1,
      isLoading: false,
      isLastPage: false,
    };

    this.handler = this.handler.bind(this);
    this.resetFilterData = this.resetFilterData.bind(this);
  }

  getProductsFunction = async () => {
    const { page, getAllProducts, isLastPage } = this.state;

    this.setState({
      searchUserButton: false,
      searchUser: "",
    });

    if (isLastPage) {
      return;
    }
    this.setState({ isLoading: true });
    await fetch(`${APP_URL}GetAllProduct?page=${page}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true) {
          let data = res.data.data.data;
          // console.log(data);

          if (data?.length > 0) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].user_product_limit1.length < 1) {
                data[i].images = [];
                continue;
              }

              let product_image = data[i].user_product_limit1[0].product_image;

              data[i].images = product_image;
            }

            this.setState({
              getAllProducts: [...getAllProducts, ...data],
              page: page + 1,
              isLoading: false,
            });
          } else {
            this.setState({
              isLastPage: true,
              isLoading: false,
            });
          }
        } else {
          this.setState({
            isLastPage: true,
            isLoading: false,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  handler(filter_data) {
    let meshok = filter_data.meshok;
    let category_name =
      filter_data.category_name.length > 0
        ? filter_data.category_name.join(",")
        : "";
    let made_in_result =
      filter_data.made_in_result.length > 0
        ? filter_data.made_in_result.join(",")
        : "";
    let city_name = filter_data.city_name;
    let show_room = filter_data.show_room;

    let formdata = new FormData();
    formdata.append("meshok", meshok); //Ценовая категория
    formdata.append("category_name", category_name); //Категории
    formdata.append("city_name", city_name); // Город
    formdata.append("made_in", made_in_result); // Страна произволства
    formdata.append("show_room", show_room);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    fetch(`${APP_URL}filterProizvoditel`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (!res.status) {
          this.setState({
            getAllProducts: [],
            filter: false,
          });

          return false;
        }
        let data = res.data.user;

        let filtered_category_name = res.data.returnCategoryNameArray[0];

        for (let i = 0; i < data.length; i++) {
          if (data[i].user_product_limit1.length < 1) {
            data[i].images = [];
            continue;
          }
          let product_image = data[i].user_product_limit1[0].product_image;
          data[i].images = product_image;

          if (res.data.returnCategoryNameArray.length > 0) {
            let new_user_product_limit = data[i].user_product_limit1;

            new_user_product_limit.filter((item, index) => {
              if (item.category_name === filtered_category_name) {
                let product_image = item.product_image;
                data[i].images = product_image;
              }
            });
          }
        }
        this.setState({
          getAllProducts: data,
          filter: false,
        });
      })
      .catch((error) => console.log("error", error));
  }

  resetFilterData = async () => {
    this.getProductsFunction();
    await this.setState({
      filter: false,
    });
    console.log("click to resetFilterData");
  };

  modalState = async () => {
    await this.setState({
      filter: true,
    });
  };

  searchUser = async (text) => {
    await this.setState({ searchUser: text });

    let formdata = new FormData();
    formdata.append("company_name", this.state.searchUser);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${APP_URL}searchProizvoditel`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true) {
          let data = res.data.user;
          let new_data_result = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].user_product_limit1.length < 1) {
              data[i].images = [];
              continue;
            }

            let product_image = data[i].user_product_limit1[0].product_image;

            data[i].images = product_image;
          }

          // console.log(data, 'res.data.data.data');

          this.setState({
            getAllProducts: data,
          });
        } else if (res.status === false) {
          this.setState({
            getAllProducts: [],
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  formImageData = new FormData();

  componentDidMount() {
    const { navigation } = this.props;

    this.getProductsFunction();
    Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });

    this.focusListener = navigation.addListener("focus", () => {
      this.getProductsFunction();
      Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
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
      console.log("Bum END");
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

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  renderItem = ({ item, index }) => {
    let count = item.meshok;
    return (
      item.user_product_limit1.length !== 0 && (
        <View key={index} style={styles.campaign}>
          <TouchableOpacity
            onPress={async () => {
              this.props.navigation.navigate("GhostPageTwo", {
                params: item.id,
              });
            }}
          >
            <View style={styles.infoCompanyMain}>
              <Image
                source={{ uri: APP_IMAGE_URL + item.logo }}
                style={{
                  width: 70,
                  height: 70,
                  marginRight: 12,
                  borderColor: "#C8C8C8",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              />
              <View style={styles.infoCompany}>
                <View style={{ width: "70%" }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 20,
                      fontFamily: "Raleway_700Bold",
                      marginBottom: 6,
                    }}
                  >
                    {item.company_name}
                  </Text>

                  {count == null ? (
                    <View style={{ width: 15, height: 20.5 }}></View>
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      {[...new Array(Number(count))].map((value, i) => (
                        <Image
                          key={i}
                          source={require("../../assets/image/meshok.png")}
                          style={{
                            width: 15,
                            height: 20.5,
                            marginRight: 3,
                          }}
                        />
                      ))}
                    </View>
                  )}
                </View>

                <Text
                  key={index}
                  style={{
                    fontSize: 16,
                    color: "#A8A8A8",
                    fontFamily: "Raleway_500Medium",
                    paddingTop: 5,
                  }}
                >
                  {item.made_in}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <ScrollView
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {item.user_category_product.map((ite, ind) => {
                return (
                  <Text key={ite.id} style={styles.categoriesName}>
                    {ite.category_name}
                  </Text>
                );
              })}
            </ScrollView>
          </View>
          <Slider slid={item.images} />
        </View>
      )
    );
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;
    return (
      <View style={{ marginVertical: 10 }}>
        <ActivityIndicator size={50} color={"#C2C2C2"} />
      </View>
    );
  };

  handleLoadMore = () => {
    this.getProductsFunction();
  };

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    } else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.main}>
            {this.state.filter && (
              <FilterComponent
                handler={this.handler}
                resetFilterData={this.resetFilterData}
              />
            )}

            <View style={styles.searchParent}>
              <TouchableOpacity
                onPress={() => {
                  this.getProductsFunction();
                }}
              >
                {this.state.searchUser !== "" ? (
                  <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M1.46343 2.89891C1.39564 2.83476 1.34186 2.7586 1.30518 2.67479C1.26849 2.59097 1.24961 2.50114 1.24961 2.41042C1.24961 2.31969 1.26849 2.22986 1.30518 2.14604C1.34186 2.06223 1.39564 1.98607 1.46343 1.92192C1.53122 1.85777 1.6117 1.80689 1.70027 1.77217C1.78885 1.73745 1.88378 1.71958 1.97965 1.71958C2.07552 1.71958 2.17045 1.73745 2.25902 1.77217C2.3476 1.80689 2.42808 1.85777 2.49587 1.92192L10 9.02439L17.5041 1.92192C17.5719 1.85777 17.6524 1.80689 17.741 1.77217C17.8295 1.73745 17.9245 1.71958 18.0204 1.71958C18.1162 1.71958 18.2112 1.73745 18.2997 1.77217C18.3883 1.80689 18.4688 1.85777 18.5366 1.92192C18.6044 1.98607 18.6581 2.06223 18.6948 2.14604C18.7315 2.22986 18.7504 2.31969 18.7504 2.41042C18.7504 2.50114 18.7315 2.59097 18.6948 2.67479C18.6581 2.7586 18.6044 2.83476 18.5366 2.89891L11.031 10L18.5366 17.1011C18.6044 17.1652 18.6581 17.2414 18.6948 17.3252C18.7315 17.409 18.7504 17.4989 18.7504 17.5896C18.7504 17.6803 18.7315 17.7701 18.6948 17.854C18.6581 17.9378 18.6044 18.0139 18.5366 18.0781C18.4688 18.1422 18.3883 18.1931 18.2997 18.2278C18.2112 18.2626 18.1162 18.2804 18.0204 18.2804C17.9245 18.2804 17.8295 18.2626 17.741 18.2278C17.6524 18.1931 17.5719 18.1422 17.5041 18.0781L10 10.9756L2.49587 18.0781C2.42808 18.1422 2.3476 18.1931 2.25902 18.2278C2.17045 18.2626 2.07552 18.2804 1.97965 18.2804C1.88378 18.2804 1.78885 18.2626 1.70027 18.2278C1.6117 18.1931 1.53122 18.1422 1.46343 18.0781C1.39564 18.0139 1.34186 17.9378 1.30518 17.854C1.26849 17.7701 1.24961 17.6803 1.24961 17.5896C1.24961 17.4989 1.26849 17.409 1.30518 17.3252C1.34186 17.2414 1.39564 17.1652 1.46343 17.1011L8.96902 10L1.46343 2.89891Z"
                      fill="black"
                    />
                  </Svg>
                ) : (
                  <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M17.7656 16.6895L12.6934 11.6172C13.4805 10.5996 13.9063 9.35547 13.9063 8.04688C13.9063 6.48047 13.2949 5.01172 12.1895 3.9043C11.084 2.79687 9.61133 2.1875 8.04688 2.1875C6.48242 2.1875 5.00977 2.79883 3.9043 3.9043C2.79687 5.00977 2.1875 6.48047 2.1875 8.04688C2.1875 9.61133 2.79883 11.084 3.9043 12.1895C5.00977 13.2969 6.48047 13.9063 8.04688 13.9063C9.35547 13.9063 10.5977 13.4805 11.6152 12.6953L16.6875 17.7656C16.7024 17.7805 16.72 17.7923 16.7395 17.8004C16.7589 17.8084 16.7797 17.8126 16.8008 17.8126C16.8218 17.8126 16.8427 17.8084 16.8621 17.8004C16.8815 17.7923 16.8992 17.7805 16.9141 17.7656L17.7656 16.916C17.7805 16.9011 17.7923 16.8835 17.8004 16.864C17.8084 16.8446 17.8126 16.8238 17.8126 16.8027C17.8126 16.7817 17.8084 16.7609 17.8004 16.7414C17.7923 16.722 17.7805 16.7043 17.7656 16.6895V16.6895ZM11.1406 11.1406C10.3125 11.9668 9.21484 12.4219 8.04688 12.4219C6.87891 12.4219 5.78125 11.9668 4.95313 11.1406C4.12695 10.3125 3.67188 9.21484 3.67188 8.04688C3.67188 6.87891 4.12695 5.7793 4.95313 4.95313C5.78125 4.12695 6.87891 3.67188 8.04688 3.67188C9.21484 3.67188 10.3145 4.125 11.1406 4.95313C11.9668 5.78125 12.4219 6.87891 12.4219 8.04688C12.4219 9.21484 11.9668 10.3145 11.1406 11.1406Z"
                      fill="black"
                    />
                  </Svg>
                )}
              </TouchableOpacity>
              <TextInput
                placeholder="Поиск"
                placeholderTextColor="#000"
                style={{
                  width: "85%",
                  height: "90%",
                  borderColor: "#D9D9D9",
                  borderRightWidth: 1,
                  color: "#000",
                  fontSize: 15,
                }}
                value={this.state.searchUser}
                onChangeText={(text) => {
                  this.searchUser(text);
                }}
              />
              <TouchableOpacity onPress={() => this.modalState()}>
                <Svg
                  width="23"
                  height="19"
                  viewBox="0 0 23 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M22.4375 3.25H19.2344C18.8438 1.45312 17.2812 0.125 15.4062 0.125C13.5312 0.125 11.9688 1.45312 11.5781 3.25H0.5625V4.8125H11.5781C11.9688 6.60938 13.5312 7.9375 15.4062 7.9375C17.2812 7.9375 18.8438 6.60938 19.2344 4.8125H22.4375V3.25ZM15.4062 6.375C14.0781 6.375 13.0625 5.35938 13.0625 4.03125C13.0625 2.70312 14.0781 1.6875 15.4062 1.6875C16.7344 1.6875 17.75 2.70312 17.75 4.03125C17.75 5.35938 16.7344 6.375 15.4062 6.375ZM0.5625 15.75H3.76562C4.15625 17.5469 5.71875 18.875 7.59375 18.875C9.46875 18.875 11.0312 17.5469 11.4219 15.75H22.4375V14.1875H11.4219C11.0312 12.3906 9.46875 11.0625 7.59375 11.0625C5.71875 11.0625 4.15625 12.3906 3.76562 14.1875H0.5625V15.75ZM7.59375 12.625C8.92188 12.625 9.9375 13.6406 9.9375 14.9688C9.9375 16.2969 8.92188 17.3125 7.59375 17.3125C6.26562 17.3125 5.25 16.2969 5.25 14.9688C5.25 13.6406 6.26562 12.625 7.59375 12.625Z"
                    fill="black"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            {this.state.getAllProducts.length == 0 &&
              this.state.isLoading === false && (
                <Text
                  style={{ fontSize: 20, marginTop: 50, textAlign: "center" }}
                >
                  Данных не найдено
                </Text>
              )}

            <FlatList
              showsVerticalScrollIndicator={false}
              renderItem={this.renderItem}
              data={this.state.getAllProducts}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={this.renderFooter}
            />
          </View>
          {this.state.keyboardOpen === false && (
            <GhostNavComponent
              active_page={"Главная"}
              navigation={this.props.navigation}
            />
          )}
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 15,
    position: "relative",
  },
  nameCompanyParent: {
    marginTop: 12,
    paddingLeft: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  user: {
    width: 30,
    height: 30,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  myComponyName: {
    fontSize: 22,
    marginLeft: 10,
    fontFamily: "Raleway_700Bold",
  },
  searchParent: {
    marginVertical: 17,
    width: "100%",
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  campaign: {
    width: "100%",
    marginBottom: 34,
  },
  infoCompanyMain: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  infoCompany: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoriesName: {
    fontSize: 13,
    fontFamily: "Montserrat_400Regular",
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginRight: 11,
  },
});
