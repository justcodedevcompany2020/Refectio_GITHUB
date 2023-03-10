import React from "react";
import {
  SafeAreaView,
  Keyboard,
  StyleSheet,
  View,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ImageBackground,
  Linking,
  Platform,
} from "react-native";

import ArrowGrayComponent from "../../assets/image/ArrowGray";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import Svg, { Path, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BlueButton from "../Component/Buttons/BlueButton";
import { AuthContext } from "../AuthContext/context";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { APP_URL, APP_IMAGE_URL } from "@env";

export default class CustomerMyAccauntComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardOpen: false,

      categoryModal: false,
      categoryArray: [],
      categoryItems: [],
      categoryFilter: false,
      category_empty_error: false,
      category_empty_error_text: "",

      gorodModal: false,
      gorodArray: [],
      gorodFilter: false,

      cityItems: [],

      editUserDataModal: false,

      authUserState: [],

      id: "",
      inn: "",
      strana: "",

      editModal: false,
      editModalInn: false,

      made_in_array: [],
      made_in_select: false,
      made_in: "",
      made_in_error: false,

      individual_number: "",

      phone: "",

      RewardModal: false,

      urlImage: APP_IMAGE_URL,

      logo: "",
      companyName: "",
      site: "",
      teleg: "",

      valid_error: false,

      procentArray: [
        {
          start_price: "0",
          before_price: "datark",
          percent: "",
        },
      ],

      delate_category: false,

      delate_accaunt: false,
    };
  }
  static contextType = AuthContext;

  getCityApi = async () => {
    this.setState({
      gorodModal: true,
    });

    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(`${APP_URL}getCityApi`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true) {
          this.setState({ sOpenCityDropDown3: !this.state.sOpenCityDropDown3 });
        }
        this.setState({ cityItems: res.data.city });
      });
  };

  updatedCities = async () => {
    let gorodArraySort = this.state.gorodArray;

    if (gorodArraySort.length == 0) {
      this.setState({
        cities_empty_error: true,
        cities_empty_error_text: "Выберите город!",
      });
      return false;
    } else {
      this.setState({
        cities_empty_error: false,
        cities_empty_error_text: "",
      });
    }

    let new_gorod_sort = [];
    for (let i = 0; i < gorodArraySort.length; i++) {
      let city = gorodArraySort[i].city_id + "^" + gorodArraySort[i].city_name;
      new_gorod_sort.push(city);
    }

    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;

    myHeaders.append("Authorization", AuthStr);

    let formdata = new FormData();
    formdata.append("sales_city[]", new_gorod_sort);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(`${APP_URL}UpdategorodaProdaji`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          this.getAuthUserProfile();
          this.setState({
            gorodModal: false,
            gorodFilter: false,
          });
        }
      })
      .catch((error) => console.log("error", error));

    // ete succesy true ya kanchumenq getAuthUserProfile es funkcian u pagumenq popapy
  };

  getAllCategory = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(`${APP_URL}GetProductCategory`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ categoryItems: result.data.city });
      })
      .catch((error) => console.log("error", error));
  };

  getCountry = async () => {
    await this.setState({ editModal: true });

    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(`${APP_URL}AllCountry`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ made_in_array: result.data });
      })
      .catch((error) => console.log("error", error));
  };

  updateCategory = async () => {
    let categoryArraySort = this.state.categoryArray;

    if (categoryArraySort.length == 0) {
      this.setState({
        category_empty_error: true,
        category_empty_error_text: "Выберите Категории!",
      });
      return false;
    } else {
      this.setState({
        category_empty_error: false,
        category_empty_error_text: "",
      });
    }

    let new_category_sort = [];
    for (let i = 0; i < categoryArraySort.length; i++) {
      let city =
        categoryArraySort[i].category_id +
        "^" +
        categoryArraySort[i].category_name;
      new_category_sort.push(city);
    }

    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;

    myHeaders.append("Authorization", AuthStr);

    let formdata = new FormData();
    formdata.append("product_category[]", new_category_sort);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(`${APP_URL}UpdateCategoryProizvoditel`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status === true) {
          this.getAuthUserProfile();
          await this.setState({
            categoryModal: false,
            categoryFilter: false,
          });
        }
      })
      .catch((error) => console.log("error", error));

    // ete succesy true ya kanchumenq getAuthUserProfile es funkcian u pagumenq popapy
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
          authUserState: res.data,
          gorodArray: res?.data[0].city_of_sales_manufacturer,
          id: res?.data[0].id,
          inn: res?.data[0].individual_number,
          strana: res?.data[0].made_in,
          phone: res?.data[0].phone,
          procentArray: res?.data[0].user_pracient_for_designer,
          categoryArray: res?.data[0].user_category_product,
          logo: res?.data[0].logo,
          companyName: res?.data[0].company_name,
          site:
            res?.data[0].saite !== "null" && res?.data[0].saite !== null
              ? "https://" + res?.data[0].saite
              : "",
          teleg:
            res?.data[0].telegram !== null
              ? "t.me/" + res?.data[0].telegram
              : "t.me/",
        });
      });
  };

  sendMadeIn = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Authorization", AuthStr);

    let formdata = new FormData();
    formdata.append("made_in", this.state.made_in);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${APP_URL}updateManeInProizvoditel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          this.setState({
            editModal: false,
            strana: this.state.made_in,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  sendInn = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Authorization", AuthStr);

    let formdata = new FormData();
    formdata.append("individual_number", this.state.individual_number);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${APP_URL}UpdateIndividualNumberProizvoditel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          this.getAuthUserProfile();
        }
      })
      .catch((error) => console.log("error", error));
  };

  removeInputRow = () => {
    let { procentArray } = this.state;

    procentArray.pop();

    this.setState({
      procentArray: procentArray,
    });
  };

  addInputRow = () => {
    let { procentArray } = this.state;

    procentArray.push({
      start_price: "datark",
      before_price: "datark",
      percent: "",
    });
    let newProcentArray = procentArray;

    this.setState({
      procentArray: newProcentArray,
    });
  };

  savePercont = async () => {
    let { procentArray } = this.state;

    let result = [];
    let valid_error = false;

    for (let i = 0; i < procentArray.length; i++) {
      if (procentArray[i].percent == "") {
        valid_error = true;
        break;
      }

      let resultString =
        procentArray[i].start_price +
        "^" +
        procentArray[i].before_price +
        "^" +
        procentArray[i].percent;
      result.push(resultString);
    }

    if (valid_error) {
      this.setState({
        valid_error: true,
      });

      setTimeout(() => {
        this.setState({
          valid_error: false,
        });
      }, 2000);
    } else {
      let myHeaders = new Headers();
      let userToken = await AsyncStorage.getItem("userToken");
      let AuthStr = "Bearer " + userToken;
      myHeaders.append("Content-Type", "multipart/form-data");
      myHeaders.append("Authorization", AuthStr);

      let formdata = new FormData();
      formdata.append("percent_bonus[]", result);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${APP_URL}UpdatePracentForDesigner`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === true) {
            this.getAuthUserProfile();
            this.setState({ RewardModal: false });
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  changeTo = (value, index) => {
    let { procentArray } = this.state;

    let without_dots = value.split(".").join("");
    let with_dots = without_dots
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    procentArray[index].start_price = with_dots;

    this.setState({
      procentArray: procentArray,
    });
  };

  changeFrom = (value, index) => {
    let { procentArray } = this.state;

    let without_dots = value.split(".").join("");
    let with_dots = without_dots
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    procentArray[index].before_price = with_dots;

    this.setState({
      procentArray: procentArray,
    });
  };

  changePercent = (value, index) => {
    let { procentArray } = this.state;

    procentArray[index].percent = value;

    this.setState({
      procentArray: procentArray,
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    // this.getAuthUserProfile();

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

  // gorod startttttttttt

  enterCheckBox = (items, index) => {
    items.city_id = items.id;
    items.city_name = items.name;

    let filterSort = this.state.gorodArray;

    let find = true;
    filterSort.find((item) => {
      if (item.city_id == items.city_id) {
        find = false;
      }
    });
    if (find) {
      filterSort.push(items);
    }

    this.setState({ gorodArray: filterSort });
  };

  verifyCheckBox = (items) => {
    let filterSort = this.state.gorodArray;
    let find = false;
    filterSort.find((item) => {
      if (item == items) {
        find = true;
      }
    });

    if (find) {
      const index = filterSort.indexOf(items);
      filterSort.splice(index, 1);
    }
    this.setState({ gorodArray: filterSort });
  };

  categoryAdd = async (items, index) => {
    items.category_name = items.name;
    items.category_id = items.id;

    let filterSort = this.state.categoryArray;

    let find = true;
    filterSort.find((item) => {
      if (item.category_id == items.category_id) {
        find = false;
      }
    });
    if (find) {
      filterSort.push(items);
    }

    await this.setState({ categoryArray: filterSort });
  };

  categoryDelate = async (items) => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    myHeaders.append("Authorization", AuthStr);
    await fetch(
      `${APP_URL}validationcategoryId/category_id=${items.category_id}`,
      {
        headers: myHeaders,
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(async (result) => {
        console.log(result);
        if (
          result.status === false &&
          result.message ===
            "Нельзя удалить заполненную категорию. Сначала удалите объекты в разделе Продукция по данной категории"
        ) {
          this.setState({ delate_category: true });
          setTimeout(() => {
            this.setState({ delate_category: false });
          }, 4000);
        } else {
          let filterSort = this.state.categoryArray;
          let find = false;
          filterSort.find((item) => {
            if (item == items) {
              find = true;
            }
          });

          if (find) {
            const index = filterSort.indexOf(items);
            filterSort.splice(index, 1);
          }
          await this.setState({ categoryArray: filterSort });
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  editNameCompany = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    myHeaders.append("Authorization", AuthStr);

    let formdata = new FormData();
    formdata.append("company_name", this.state.companyName);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${APP_URL}updateProfileCompanyName`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.getAuthUserProfile();
      })
      .catch((error) => console.log("error", error));
  };

  editSite = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    myHeaders.append("Authorization", AuthStr);

    let saite = this.state.site.replace("https://", "");

    if (saite === "") {
      saite = null;
    }

    let formdata = new FormData();
    formdata.append("saite", saite);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${APP_URL}updateSaiteProizvaditel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.getAuthUserProfile();
      })
      .catch((error) => console.log("error", error));
  };

  editTeleg = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    myHeaders.append("Authorization", AuthStr);

    let telegram = this.state.teleg.replace("t.me/", "");

    let formdata = new FormData();
    formdata.append("telegram", telegram);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${APP_URL}UpdateTelegramChanel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.getAuthUserProfile();
      })
      .catch((error) => console.log("error", error));
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      this.setState({ logo: result.assets[0].uri });
    }

    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;
    myHeaders.append("Authorization", AuthStr);

    let formdata = new FormData();

    formdata.append("logo", {
      uri: result.assets[0].uri,
      type: "image/jpg",
      name: "photo.jpg",
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${APP_URL}updateLogoProizvoditel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          this.getAuthUserProfile();
        }
      })
      .catch((error) => console.log("error", error));
  };

  logouth = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let userRole = await AsyncStorage.getItem("userRole");
    let AuthStr = "Bearer " + userToken;
    myHeaders.append("Authorization", AuthStr);

    // await this.setState({
    //   userToken: userToken,
    //   role_id:
    // })

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APP_URL}UserLogout`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          let foundUser = {
            userToken: userToken,
            userRole: userRole,
          };
          this.context.signOut(foundUser);
        }
      })
      .catch((error) => console.log("error", error));
  };

  delateAccaunt = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    let AuthStr = "Bearer " + userToken;

    myHeaders.append("Authorization", AuthStr);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APP_URL}deleteMyAccount`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status === true && result.message === "Account Deleted") {
          await this.logouth();
          await this.setState({ delate_accaunt: false });
        }
      });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.main}>
          <Modal visible={this.state.gorodModal}>
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
                  height: "90%",
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  position: "relative",
                  paddingHorizontal: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 18,
                    top: 18,
                  }}
                  onPress={async () => {
                    await this.getAuthUserProfile();
                    await this.setState({ gorodModal: false });
                  }}
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
                  Города
                </Text>
                <View
                  style={{
                    marginTop: 41,
                    height: 50,
                  }}
                >
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.state.gorodArray.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            position: "relative",
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              paddingHorizontal: 16,
                              paddingVertical: 10,
                              backgroundColor: "#F5F5F5",
                              borderRadius: 8,
                              fontFamily: "Poppins_500Medium",
                            }}
                          >
                            {item.city_name}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              this.verifyCheckBox(item);
                            }}
                            style={{
                              position: "absolute",
                              right: -5,
                              top: -5,
                              // borderWidth: 1,
                            }}
                          >
                            <Image
                              source={require("../../assets/image/ixs.png")}
                              style={{
                                width: 12,
                                height: 12,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>

                {/* gorod dropDown start */}
                <View style={styles.gorodFilter}>
                  <View
                    style={{
                      flexDirection: "row",
                      position: "relative",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: "#F5F5F5",
                        padding: 10,
                        width: "100%",
                        borderRadius: 6,
                        position: "relative",
                        height: 45,
                        marginRight: 12,
                      }}
                      onPress={() =>
                        this.setState({ gorodFilter: !this.state.gorodFilter })
                      }
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        Города
                      </Text>
                      <View
                        style={{ position: "absolute", right: 17, bottom: 18 }}
                      >
                        {!this.state.gorodFilter && (
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
                        {this.state.gorodFilter && (
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
                      this.state.gorodFilter
                        ? styles.setGorodFilterActive
                        : styles.setGorodFilter
                    }
                  >
                    <ScrollView nestedScrollEnabled={true}>
                      {this.state.cityItems.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: "100%",
                              justifyContent: "space-between",
                              textAlign: "left",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            onPress={() => {
                              this.enterCheckBox(item, index);
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "left",
                                paddingVertical: 10,
                                fontFamily: "Poppins_500Medium",
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
                {/* gorod dropdown end */}

                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    position: "absolute",
                    bottom: "20%",
                  }}
                  onPress={() => this.updatedCities()}
                >
                  <BlueButton name="Сохранить" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <Modal visible={this.state.categoryModal}>
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
                  height: "90%",
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  position: "relative",
                  paddingHorizontal: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 18,
                    top: 18,
                  }}
                  onPress={async () => {
                    await this.getAuthUserProfile();

                    await this.setState({
                      categoryModal: false,
                      delate_category: false,
                    });
                  }}
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
                  Категории
                </Text>
                <View
                  style={{
                    marginTop: 41,
                    height: 50,
                  }}
                >
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.state.categoryArray.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            position: "relative",
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              paddingHorizontal: 16,
                              paddingVertical: 10,
                              backgroundColor: "#F5F5F5",
                              borderRadius: 8,
                              fontFamily: "Poppins_500Medium",
                            }}
                          >
                            {item.category_name}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              this.categoryDelate(item);
                            }}
                            style={{
                              position: "absolute",
                              right: -5,
                              top: -5,
                              // borderWidth: 1,
                            }}
                          >
                            <Image
                              source={require("../../assets/image/ixs.png")}
                              style={{
                                width: 12,
                                height: 12,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>

                {/* dropDown category start*/}

                <View style={styles.gorodFilter}>
                  <View
                    style={{
                      flexDirection: "row",
                      position: "relative",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: "#F5F5F5",
                        padding: 10,
                        width: "100%",
                        borderRadius: 6,
                        position: "relative",
                        height: 45,
                        marginRight: 12,
                      }}
                      onPress={() =>
                        this.setState({
                          categoryFilter: !this.state.categoryFilter,
                        })
                      }
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        Категории
                      </Text>
                      <View
                        style={{ position: "absolute", right: 17, bottom: 18 }}
                      >
                        {!this.state.categoryFilter && (
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
                        {this.state.categoryFilter && (
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
                      this.state.categoryFilter
                        ? styles.setGorodFilterActive
                        : styles.setGorodFilter
                    }
                  >
                    <ScrollView nestedScrollEnabled={true}>
                      {this.state.categoryItems.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: "100%",
                              justifyContent: "space-between",
                              textAlign: "left",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            onPress={() => {
                              this.categoryAdd(item, index);
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "left",
                                paddingVertical: 10,
                                fontFamily: "Poppins_500Medium",
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
                {this.state.delate_category && (
                  <Text style={{ color: "red", marginTop: 40 }}>
                    Нельзя удалить заполненную категорию. Сначала удалите
                    объекты в разделе Продукция по данной категории
                  </Text>
                )}
                {/* dropDown category end */}

                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    position: "absolute",
                    bottom: "20%",
                  }}
                  onPress={() => {
                    this.updateCategory();
                  }}
                >
                  <BlueButton name="Сохранить" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <Modal visible={this.state.editModal}>
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
                  height: 400,
                  borderRadius: 20,
                  paddingHorizontal: 25,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", right: 18, top: 18 }}
                  onPress={() => this.setState({ editModal: false })}
                >
                  <Image
                    source={require("../../assets/image/ixs.png")}
                    style={{ width: 22.5, height: 22.5 }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <Text
                    style={[
                      {
                        fontFamily: "Poppins_500Medium",
                        lineHeight: 23,
                        fontSize: 15,
                        marginTop: 27,
                        marginBottom: 5,
                      },
                      this.state.made_in_error
                        ? { color: "red" }
                        : { color: "#5B5B5B" },
                    ]}
                  >
                    Страна производства
                  </Text>
                  <TouchableOpacity
                    style={[
                      {
                        borderWidth: 1,
                        padding: 10,
                        width: "100%",
                        borderRadius: 5,
                        position: "relative",
                      },
                      this.state.made_in_error
                        ? { borderColor: "red" }
                        : { borderColor: "#F5F5F5" },
                    ]}
                    onPress={() =>
                      this.setState({
                        made_in_select: !this.state.made_in_select,
                      })
                    }
                  >
                    <Text
                      style={{
                        padding: 5,
                        width: "100%",
                        borderRadius: 5,
                        color: "#5B5B5B",
                      }}
                    >
                      {this.state.made_in == ""
                        ? "Выберите страну"
                        : this.state.made_in}
                    </Text>
                    <View
                      style={{ position: "absolute", right: 17, bottom: 18 }}
                    >
                      {!this.state.made_in_select && (
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
                      {this.state.made_in_select && (
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
                  <View
                    style={
                      this.state.made_in_select
                        ? styles.sOpenCityDropDownActive
                        : styles.sOpenCityDropDown
                    }
                  >
                    <ScrollView nestedScrollEnabled={true}>
                      {this.state.made_in_array.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: "100%",
                              justifyContent: "center",
                              textAlign: "left",
                            }}
                            onPress={async () => {
                              await this.setState({
                                made_in: item.nicename,
                                made_in_select: false,
                              });
                            }}
                          >
                            <Text
                              style={[
                                {
                                  textAlign: "left",
                                  paddingVertical: 7,
                                  fontFamily: "Poppins_500Medium",
                                  borderBottomWidth: 1,
                                  borderBottomColor: "#F5F5F5",
                                },
                              ]}
                            >
                              {item.nicename}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ marginTop: 50 }}
                  onPress={async () => {
                    await this.sendMadeIn();
                  }}
                >
                  <BlueButton name="Сохранить" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <Modal visible={this.state.editModalInn}>
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
                  height: 300,
                  borderRadius: 20,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", right: 18, top: 18 }}
                  onPress={() => this.setState({ editModalInn: false })}
                >
                  <Image
                    source={require("../../assets/image/ixs.png")}
                    style={{ width: 22.5, height: 22.5 }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 30,
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      lineHeight: 23,
                      fontSize: 16,
                      color: "#5B5B5B",
                      marginBottom: 5,
                      textAlign: "left",
                    }}
                  >
                    ИНН
                  </Text>
                </View>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={this.state.inn}
                  keyboardType={"number-pad"}
                  maxLength={12}
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "90%",
                    borderRadius: 5,
                  }}
                  value={this.state.individual_number}
                  onChangeText={(text) =>
                    this.setState({ individual_number: text })
                  }
                />
                <TouchableOpacity
                  style={{ marginTop: 50 }}
                  onPress={async () => {
                    await this.sendInn();
                    this.setState({ editModalInn: false });
                  }}
                >
                  <BlueButton name="Сохранить" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <Modal visible={this.state.editUserDataModal}>
            <ImageBackground
              style={[
                {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 32,
                },
                this.state.keyboardOpen
                  ? { justifyContent: "flex-start" }
                  : { justifyContent: "center" },
              ]}
              source={require("../../assets/image/blurBg.png")}
            >
              <View
                style={{
                  width: "90%",
                  height: 500,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  position: "relative",
                  paddingHorizontal: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 18,
                    top: 18,
                    zIndex: 1,
                  }}
                  onPress={() => this.setState({ editUserDataModal: false })}
                >
                  <Image
                    source={require("../../assets/image/ixs.png")}
                    style={{
                      width: 22.5,
                      height: 22.5,
                    }}
                  />
                </TouchableOpacity>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                  <Text
                    style={{
                      marginTop: 70,
                      fontSize: 26,
                      textAlign: "center",
                      color: "#2D9EFB",
                      fontFamily: "Poppins_500Medium",
                      marginBottom: 20,
                    }}
                  >
                    Изменение данных{"\n"}компании
                  </Text>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        width: 75,
                        height: 75,
                        borderRadius: 8,
                        position: "relative",
                        overflow: "hidden",
                        alignSelf: "center",
                        borderWidth: 1,
                        borderColor: "#888888",
                      }}
                    >
                      <Image
                        source={{ uri: this.state.urlImage + this.state.logo }}
                        style={{ width: "100%", height: "100%" }}
                      />
                      <TouchableOpacity
                        style={{ position: "absolute", right: 0, top: 0 }}
                        onPress={() => {
                          this.pickImage();
                        }}
                      >
                        <Image
                          source={require("../../assets/image/edit.png")}
                          style={{ width: 22, height: 22 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 7,
                        fontFamily: "Poppins_500Medium",
                        fontSize: 15,
                        color: "#5B5B5B",
                      }}
                    >
                      Изменить логотип
                    </Text>

                    <View>
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          lineHeight: 23,
                          fontSize: 15,
                          marginTop: 27,
                          marginBottom: 5,
                          color: "#5B5B5B",
                        }}
                      >
                        Изменить название компании
                      </Text>
                      <View style={{ position: "relative" }}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={this.state.companyName}
                          style={{
                            borderWidth: 1,
                            borderColor: "#F5F5F5",
                            padding: 10,
                            width: "100%",
                            borderRadius: 5,
                          }}
                          value={this.state.companyName}
                          onChangeText={(text) =>
                            this.setState({ companyName: text })
                          }
                        />
                        <TouchableOpacity
                          style={{ position: "absolute", right: 5, top: 15 }}
                          onPress={() => this.editNameCompany()}
                        >
                          <Text
                            style={{
                              fontFamily: "Raleway_600SemiBold",
                              fontSize: 13,
                              color: "#2D9EFB",
                            }}
                          >
                            Сохранить
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View>
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          lineHeight: 23,
                          fontSize: 15,
                          marginTop: 27,
                          marginBottom: 5,
                          color: "#5B5B5B",
                        }}
                      >
                        Изменить ссылку на веб сайт
                      </Text>

                      <View style={{ position: "relative" }}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={"https://www.google.com"}
                          style={{
                            borderWidth: 1,
                            borderColor: "#F5F5F5",
                            padding: 10,
                            width: "100%",
                            borderRadius: 5,
                          }}
                          value={this.state.site}
                          onChangeText={(text) => {
                            if (
                              text == "https://" ||
                              text == "https:/" ||
                              text == "https:" ||
                              text == "https" ||
                              text == "http" ||
                              text == "htt" ||
                              text == "ht" ||
                              text == "h"
                            ) {
                              text = "https://";
                              this.setState({ site: text });
                            } else {
                              let new_text = text.replace("https://", "");

                              this.setState({ site: `https://${new_text}` });
                            }
                          }}
                        />
                        <TouchableOpacity
                          style={{ position: "absolute", right: 5, top: 15 }}
                          onPress={() => this.editSite()}
                        >
                          <Text
                            style={{
                              fontFamily: "Raleway_600SemiBold",
                              fontSize: 13,
                              color: "#2D9EFB",
                            }}
                          >
                            Сохранить
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ marginBottom: 30 }}>
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          lineHeight: 23,
                          fontSize: 15,
                          marginTop: 27,
                          marginBottom: 5,
                          color: "#5B5B5B",
                        }}
                      >
                        Изменить ссылку телеграм
                      </Text>
                      <View style={{ position: "relative" }}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          style={{
                            borderWidth: 1,
                            borderColor: "#F5F5F5",
                            padding: 10,
                            width: "100%",
                            borderRadius: 5,
                          }}
                          onChangeText={(text) => {
                            if (
                              text == "t.me/" ||
                              text == "t.me" ||
                              text == "t.m" ||
                              text == "t." ||
                              text == "t"
                            ) {
                              text = "t.me/";
                              this.setState({ teleg: text });
                            } else {
                              let new_text = text.replace("t.me/", "");

                              this.setState({ teleg: `t.me/${new_text}` });
                            }
                          }}
                          value={this.state.teleg}
                        />

                        <TouchableOpacity
                          style={{ position: "absolute", right: 5, top: 15 }}
                          onPress={() => this.editTeleg()}
                        >
                          <Text
                            style={{
                              fontFamily: "Raleway_600SemiBold",
                              fontSize: 13,
                              color: "#2D9EFB",
                            }}
                          >
                            Сохранить
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </KeyboardAwareScrollView>
              </View>
            </ImageBackground>
          </Modal>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CustomerMainPage")}
            style={{
              position: "absolute",
              top: 10,
              left: 15,
              zIndex: 1,
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
                marginTop: 18.29,
              }}
            >
              Мой профиль
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.authUserState.map((item, index) => {
              return (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: this.state.urlImage + item.logo }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 10,
                      marginTop: 25,
                      marginRight: 15,
                    }}
                  />
                  <View
                    style={{
                      width: "75%",
                      marginTop: 25,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        {item.company_name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 6,
                        }}
                      >
                        {item.telegram !== null && (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL("https://t.me/" + item.telegram);
                            }}
                          >
                            <Image
                              source={require("../../assets/image/telegram.png")}
                              style={{
                                width: 24,
                                height: 24,
                                marginRight: 8,
                              }}
                            />
                          </TouchableOpacity>
                        )}
                        {item.telegram == null && (
                          <View style={{ height: 24 }}></View>
                        )}
                        {item.saite !== "null" && item.saite !== null && (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL("https://" + item.saite);
                            }}
                          >
                            <Image
                              source={require("../../assets/image/admin-site.png")}
                              style={{
                                width: 24,
                                height: 24,
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          editUserDataModal: true,
                        });
                      }}
                    >
                      <Image
                        source={require("../../assets/image/ep_edit.png")}
                        style={{
                          width: 22,
                          height: 22,
                          marginTop: 2,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                  }}
                >
                  Страна производства
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.getCountry();
                  }}
                >
                  <Image
                    source={require("../../assets/image/ep_edit.png")}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 5,
                      marginBottom: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={this.state.strana}
                editable={false}
                style={{
                  borderWidth: 1,
                  borderColor: "#F5F5F5",
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                }}
              />
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
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                  }}
                >
                  ИНН
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ editModalInn: true })}
                >
                  <Image
                    source={require("../../assets/image/ep_edit.png")}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 5,
                      marginBottom: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={this.state.inn}
                editable={false}
                style={{
                  borderWidth: 1,
                  borderColor: "#F5F5F5",
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                }}
              />
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
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                  }}
                >
                  Номер телефона
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("EditPhoneNumber")
                  }
                >
                  <Image
                    source={require("../../assets/image/ep_edit.png")}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 5,
                      marginBottom: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={this.state.phone}
                editable={false}
                style={{
                  borderWidth: 1,
                  borderColor: "#F5F5F5",
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                }}
              />
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
                  style={{
                    fontFamily: "Poppins_500Medium",
                    lineHeight: 23,
                    fontSize: 16,
                    color: "#5B5B5B",
                    marginBottom: 5,
                  }}
                >
                  Пароль
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("EditPasswordCustomer")
                  }
                >
                  <Image
                    source={require("../../assets/image/ep_edit.png")}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 5,
                      marginBottom: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="**********"
                secureTextEntry={true}
                editable={false}
                style={{
                  borderWidth: 1,
                  borderColor: "#F5F5F5",
                  padding: 10,
                  width: "100%",
                  borderRadius: 5,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 34,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                  color: "#333333",
                }}
              >
                Продукция
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  this.props.navigation.navigate("Praductia", {
                    params: this.state.id,
                  });
                }}
                style={{
                  width: 165,
                  height: 38,
                  backgroundColor: "#B5D8FE",
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  Изменить
                </Text>
              </TouchableOpacity>
            </View>

            {/* dropDown  start*/}

            <View style={styles.cityFilter}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 11,
                  color: "#333333",
                }}
              >
                Города (продажи продукции)({this.state.gorodArray.length})
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "83%",
                    borderRadius: 6,
                    position: "relative",
                    height: 45,
                    marginRight: 12,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      color: "#888888",
                    }}
                  >
                    Москва
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.getCityApi();
                  }}
                >
                  <Image
                    source={require("../../assets/image/ep_edit.png")}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* dropDown end */}

            {/* dropDown  start*/}

            <View style={styles.cityFilter}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 11,
                  color: "#333333",
                }}
              >
                Категории ({this.state.categoryArray.length})
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "#F5F5F5",
                    padding: 10,
                    width: "83%",
                    borderRadius: 6,
                    position: "relative",
                    height: 45,
                    marginRight: 12,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      color: "#888888",
                    }}
                  >
                    Кухня
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.getAllCategory();
                    this.setState({ categoryModal: true });
                  }}
                >
                  <Image
                    source={require("../../assets/image/ep_edit.png")}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* dropDown end */}

            {/* vajnagrajdenia tpelu start */}

            <View
              style={{
                width: "100%",
                // height: ,
                backgroundColor: "#fff",
                borderRadius: 20,
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      lineHeight: 23,
                      fontSize: 16,
                      color: "#5B5B5B",
                      marginBottom: 5,
                    }}
                  >
                    Вознаграждение
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ RewardModal: true });
                    }}
                  >
                    <Image
                      source={require("../../assets/image/ep_edit.png")}
                      style={{
                        width: 15,
                        height: 15,
                        marginLeft: 5,
                        marginBottom: 5,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.DesignerRemunerationPercentageParentRead}>
                {this.state.procentArray.map((item, index) => {
                  return (
                    <View
                      style={styles.DesignerRemunerationPercentage}
                      key={index}
                    >
                      <Text style={styles.procentText}>От</Text>

                      <TextInput
                        editable={false}
                        keyboardType={"number-pad"}
                        style={styles.procentInput}
                        value={
                          item.start_price !== "datark" ? item.start_price : ""
                        }
                        placeholder={""}
                      />

                      <View style={styles.rubli}>
                        <Svg
                          width="11"
                          height="15"
                          viewBox="0 0 11 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Path
                            d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z"
                            fill="#888888"
                          />
                        </Svg>
                      </View>

                      <Text style={styles.procentText}>До</Text>

                      <TextInput
                        maxLength={10}
                        keyboardType="number-pad"
                        style={styles.procentInput}
                        value={
                          item.before_price !== "datark"
                            ? item.before_price
                            : ""
                        }
                        placeholder={
                          this.state.procentArray.length <= 1 ? "9.999.999" : ""
                        }
                        editable={false}
                      />

                      <View style={styles.rubli}>
                        <Svg
                          width="11"
                          height="15"
                          viewBox="0 0 11 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Path
                            d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z"
                            fill="#888888"
                          />
                        </Svg>
                      </View>

                      <View style={styles.procent}>
                        <TextInput
                          keyboardType="number-pad"
                          value={item.percent}
                          editable={false}
                          style={{
                            fontSize: 13,
                            fontFamily: "Poppins_400Regular",
                            color: "#888888",
                            width: 23,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                        <Text>%</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            {/* vajnagrajdenia tpelu end */}

            {/* vajnagrajdenia modal start */}

            <Modal visible={this.state.RewardModal}>
              <ImageBackground
                source={require("../../assets/image/blurBg.png")}
                style={[
                  {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  this.state.keyboardOpen === true &&
                    Platform.OS == "ios" && {
                      justifyContent: "flex-start",
                      paddingTop: 40,
                    },
                ]}
              >
                <View
                  style={{
                    width: "90%",
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    position: "relative",
                    // maxHeight: 500,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      width: 22.5,
                      height: 22.5,
                      right: 21.75,
                      top: 21.75,
                    }}
                    onPress={async () => {
                      await this.getAuthUserProfile();
                      await this.setState({ RewardModal: false });
                    }}
                  >
                    <Image
                      source={require("../../assets/image/ixs.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#2D9EFB",
                      fontSize: 26,
                      marginTop: 70,
                      textAlign: "center",
                      fontFamily: "Poppins_500Medium",
                    }}
                  >
                    Вознаграждение
                  </Text>

                  {this.state.valid_error === true && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: 18,
                        marginTop: 20,
                        textAlign: "center",
                        fontFamily: "Poppins_500Medium",
                      }}
                    >
                      Ошибка: заполните все поля.
                    </Text>
                  )}

                  <View style={styles.DesignerRemunerationPercentageParent}>
                    <ScrollView
                      style={{ height: 200 }}
                      showsVerticalScrollIndicator={false}
                    >
                      {this.state.procentArray.map((item, index) => {
                        return (
                          <View
                            style={styles.DesignerRemunerationPercentage}
                            key={index}
                          >
                            <Text style={styles.procentText}>От</Text>

                            <TextInput
                              editable={index === 0 ? false : true}
                              keyboardType={"number-pad"}
                              style={styles.procentInput}
                              underlineColorAndroid="transparent"
                              placeholderTextColor={"#aaaaaa"}
                              placeholder={""}
                              maxLength={9}
                              value={
                                item.start_price !== "datark"
                                  ? item.start_price
                                  : ""
                              }
                              onChangeText={async (value) => {
                                await this.changeTo(value, index);
                              }}
                            />

                            <View style={styles.rubli}>
                              <Svg
                                width="11"
                                height="15"
                                viewBox="0 0 11 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <Path
                                  d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z"
                                  fill="#888888"
                                />
                              </Svg>
                            </View>

                            <Text style={styles.procentText}>До</Text>

                            <TextInput
                              editable={
                                this.state.procentArray.length <= 1
                                  ? false
                                  : true
                              }
                              maxLength={9}
                              keyboardType={"number-pad"}
                              style={styles.procentInput}
                              underlineColorAndroid="transparent"
                              placeholder={
                                this.state.procentArray.length <= 1
                                  ? "9.999.999"
                                  : ""
                              }
                              placeholderTextColor={"#aaaaaa"}
                              value={
                                this.state.procentArray.length <= 1
                                  ? "9.999.999"
                                  : item.before_price &&
                                    item.before_price !== "datark"
                                  ? item.before_price
                                  : ""
                              }
                              onChangeText={async (value) => {
                                await this.changeFrom(value, index);
                              }}
                            />

                            <View style={styles.rubli}>
                              <Svg
                                width="11"
                                height="15"
                                viewBox="0 0 11 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <Path
                                  d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z"
                                  fill="#888888"
                                />
                              </Svg>
                            </View>

                            <View
                              style={[
                                styles.procent,
                                this.state.valid_error
                                  ? { borderColor: "red" }
                                  : { borderColor: "#F5F5F5" },
                              ]}
                            >
                              <TextInput
                                keyboardType="number-pad"
                                maxLength={2}
                                value={item.percent}
                                style={{
                                  color: "#888888",
                                  fontSize: 13,
                                  width: "70%",
                                }}
                                onChangeText={async (value) => {
                                  this.changePercent(value, index);
                                }}
                              />
                              <Text>%</Text>
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>

                    <View
                      View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      {/* jnjel */}

                      {this.state.procentArray.length > 1 && (
                        <TouchableOpacity
                          style={[styles.presoble, { marginRight: 11 }]}
                          onPress={async () => {
                            this.removeInputRow();
                          }}
                        >
                          <Text style={styles.procentText}>Удалить</Text>
                        </TouchableOpacity>
                      )}

                      {/* avelacnel */}

                      <TouchableOpacity
                        style={styles.presoble}
                        onPress={async () => {
                          this.addInputRow();
                        }}
                      >
                        <Text style={styles.procentText}>Добавить</Text>
                      </TouchableOpacity>

                      {/* kojak  */}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      alignSelf: "center",
                      marginTop: 93,
                      marginBottom: 56,
                    }}
                    onPress={() => {
                      this.savePercont();
                    }}
                  >
                    <BlueButton name="Сохранить" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </Modal>
            {/* vajnagrajdenia modal end */}

            <TouchableOpacity
              onPress={async () => {
                await this.logouth();
              }}
              style={{
                width: 165,
                height: 38,
                backgroundColor: "#B5D8FE",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Выйти
              </Text>
            </TouchableOpacity>

            <Modal
              visible={this.state.delate_accaunt}
              transparent
              animationType="slide"
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "80%",
                    borderRadius: 20,
                    backgroundColor: "white",
                    shadowOffset: { height: 10, width: 10 },
                    elevation: 10,
                    shadowColor: "black",
                    shadowOpacity: 0.5,
                    position: "relative",
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins_500Medium",
                      textAlign: "center",
                      marginVertical: 20,
                    }}
                  >
                    Вы уверены, что хотите удалить свой акаунт?{"\n"} Все данные
                    будут утеряны.
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        paddingVertical: 10,
                        width: "40%",
                        alignItems: "center",
                        backgroundColor: "#52A8EF",
                        borderRadius: 10,
                      }}
                      onPress={async () => {
                        await this.delateAccaunt();
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Да, уверен.
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 10,
                        width: "40%",
                        alignItems: "center",
                        backgroundColor: "#52A8EF",
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        this.setState({ delate_accaunt: false });
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Отмена.
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              onPress={() => {
                this.setState({ delate_accaunt: true });
              }}
              style={{
                width: 165,
                height: 38,
                backgroundColor: "#B5D8FE",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Удалить
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {this.state.keyboardOpen === false && (
          <CustomerMainPageNavComponent
            active_page={"Профиль"}
            navigation={this.props.navigation}
          />
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 15,
  },
  container: {
    position: "relative",
    paddingBottom: 3,
  },
  cityFilter: {
    marginTop: 25,
    width: "100%",
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
  gorodFilter: {
    marginTop: 25,
    width: "100%",
  },
  setGorodFilter: {
    width: "100%",
    height: 0,
  },
  setGorodFilterActive: {
    width: "100%",
    height: 120,
    elevation: 2,
    borderColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  DesignerRemunerationPercentageParent: {
    width: "90%",
    marginTop: 5,
    alignSelf: "center",
  },
  DesignerRemunerationPercentageParentRead: {
    width: "100%",
    marginTop: 0,
    alignSelf: "center",
  },
  DesignerRemunerationPercentage: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  procentText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#888888",
  },
  procentInput: {
    borderWidth: 1,
    borderColor: "#F5F5F5",
    borderRadius: 6,
    width: "22%",
    height: "100%",
    paddingLeft: 5,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#888888",
    marginRight: 10,
  },
  rubli: {
    height: "100%",
    width: 21,
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    color: "#888888",
    marginRight: 10,
  },
  procent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    borderRadius: 6,
    width: 45,
    height: "100%",
    paddingLeft: 5,
  },
  presoble: {
    width: 90,
    height: 32,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
