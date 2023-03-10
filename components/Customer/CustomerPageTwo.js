import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Share,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Slider from "../slider/Slider";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import BlueButton from "../../components/Component/Buttons/BlueButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider2 from "../slider/Slider2";
import { APP_URL, APP_IMAGE_URL } from "@env";


export default class DesignerPageTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RewardModal: false,

      changed: "",
      sOpenCityDropDown: false,
      active: 0,

      user: [],
      user_bonus_for_designer: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],
      user_id_for_search: "",

      procentArray: [
        {
          to: "0",
          from: "",
          percent: "",
        },
      ],

      urlImage: APP_IMAGE_URL,
      valid_error: false,
      change_category_loaded: false,

      pressCategory: true,
      show_room: "",

      userLink: "",
    };
  }

  getObjectData = async () => {
    let userID = this.props.userID;
    await fetch(`${APP_URL}getOneProizvoditel/user_id=` + userID, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(async (res) => {
        this.setState({
          user: res.data.user,
          user_bonus_for_designer: res.data.user_bonus_for_designer,
          user_category_for_product: res.data.user_category_for_product,
          city_for_sales_user: res.data.city_for_sales_user,
          user_id_for_search: userID,
          changed: res.data.city_for_sales_user[0].city_name,
          show_room: res.data.user[0].show_room,
        });
      });
  };

  loadedDataAfterLoadPage = async () => {
    await this.getObjectData();
    await this.updateProduct(
      this.state.user_category_for_product[0].category_name
    );
    this.setState({ active: 0 });
  };

  componentDidMount() {
    const { navigation } = this.props;
    // this.loadedDataAfterLoadPage();

    this.focusListener = navigation.addListener("focus", () => {
      this.loadedDataAfterLoadPage();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener) {
      this.focusListener();
      // console.log(' END')
    }
  }

  updateProduct = async (category_name) => {
    await this.setState({
      change_category_loaded: true,
    });

    let userID = this.props.userID;

    if (userID == this.state.user_id_for_search) {
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
              // show_plus_button: false
              change_category_loaded: false,
            });

            return false;
          }

          let data = res.data;
          let new_data_result = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].product_image.length < 1) {
              data[i].images = [];
              continue;
            }

            let product_image = data[i].product_image;

            data[i].images = product_image;
          }

          this.setState({
            // user: data.user,
            // user_bonus_for_designer: res.data.user_bonus_for_designer,
            // user_category_for_product: res.data.user_category_for_product,
            // city_for_sales_user: res.data.city_for_sales_user,
            products: data.products,
            // show_plus_button: false,
            // extract: data.user[0].extract,
            // whatsapp: res.data.user[0].watsap_phone
            change_category_loaded: false,
          });
        })
        .catch((error) => console.log("error", error));
    } else {
      let myHeaders = new Headers();
      let userToken = await AsyncStorage.getItem("userToken");
      myHeaders.append("Authorization", "Bearer " + userToken);

      let formdata = new FormData();
      formdata.append("category_name", category_name);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${APP_URL}GetcategoryOneuserprduct`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          // console.log(res, 'GetcategoryOneuserprduct');

          if (res.status === false) {
            this.setState({
              products: [],
              // show_plus_button: false
            });

            return false;
          }

          let data = res.data.data;
          let new_data_result = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].product_image.length < 1) {
              data[i].images = [];
              continue;
            }

            let product_image = data[i].product_image;

            data[i].images = product_image;
          }

          this.setState({
            // user: data,
            user_bonus_for_designer: res.data.data.user_bonus_for_designer,
            // user_category_for_product: res.data.user_category_for_product,
            // city_for_sales_user: res.data.data.city_for_sales_user,
            products: data,
            // show_plus_button: false
          });
        })
        .catch((error) => console.log("error", error));
    }
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

      let userID = this.props.userID;

      if (userID == this.state.user_id_for_search) {
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
                // show_plus_button: false
                change_category_loaded: false,
                pressCategory: true,
              });

              return false;
            }

            let data = res.data;
            let new_data_result = [];

            for (let i = 0; i < data.length; i++) {
              if (data[i].product_image.length < 1) {
                data[i].images = [];
                continue;
              }

              let product_image = data[i].product_image;

              data[i].images = product_image;
            }

            this.setState({
              // user: data.user,
              // user_bonus_for_designer: res.data.user_bonus_for_designer,
              // user_category_for_product: res.data.user_category_for_product,
              // city_for_sales_user: res.data.city_for_sales_user,
              products: data.products,
              // show_plus_button: false,
              // extract: data.user[0].extract,
              // whatsapp: res.data.user[0].watsap_phone
              change_category_loaded: false,
              pressCategory: true,
            });
          })
          .catch((error) => console.log("error", error));
      } else {
        let myHeaders = new Headers();
        let userToken = await AsyncStorage.getItem("userToken");
        myHeaders.append("Authorization", "Bearer " + userToken);

        let formdata = new FormData();
        formdata.append("category_name", category_name);

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        fetch(`${APP_URL}GetcategoryOneuserprduct`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            // console.log(res, 'GetcategoryOneuserprduct');

            if (res.status === false) {
              this.setState({
                products: [],
                change_category_loaded: false,
                pressCategory: true,
                // show_plus_button: false
              });

              return false;
            }

            let data = res.data.data;
            let new_data_result = [];

            for (let i = 0; i < data.length; i++) {
              if (data[i].product_image.length < 1) {
                data[i].images = [];
                continue;
              }

              let product_image = data[i].product_image;

              data[i].images = product_image;
            }

            this.setState({
              // user: data,
              user_bonus_for_designer: res.data.data.user_bonus_for_designer,
              // user_category_for_product: res.data.user_category_for_product,
              // city_for_sales_user: res.data.data.city_for_sales_user,
              products: data,
              change_category_loaded: false,
              pressCategory: true,
              // show_plus_button: false
            });
          })
          .catch((error) => console.log("error", error));
      }
    }

    // this.setState({ active: index })
  };

  // removeInputRow = () => {

  //   let { procentArray } = this.state;

  //   console.log(procentArray, '1')
  //   procentArray.pop();

  //   this.setState({
  //     procentArray: procentArray
  //   })
  //   console.log(procentArray, '2')
  // }

  // addInputRow = () => {

  //   let { procentArray } = this.state;

  //   procentArray.push({
  //     to: '',
  //     from: '',
  //     percent: ''
  //   })
  //   console.log(procentArray, 'procentArray avel')
  //   let newProcentArray = procentArray;

  //   this.setState({
  //     procentArray: newProcentArray
  //   })

  //   console.log(newProcentArray, 'newProcentArray avel')
  // }

  // savePercont = () => {
  //   let { procentArray } = this.state;

  //   let result = [];
  //   let valid_error = false;

  //   for (let i = 0; i < procentArray.length; i++) {

  //     if (procentArray[i].to == '' || procentArray[i].from == '' || procentArray[i].percent == '') {
  //       valid_error = true;
  //       break;
  //     }

  //     let resultString = procentArray[i].to + '^' + procentArray[i].from + '^' + procentArray[i].percent
  //     result.push(resultString)
  //   }

  //   if (valid_error) {

  //     this.setState({
  //       valid_error: true
  //     })

  //     setTimeout(() => {
  //       this.setState({
  //         valid_error: false
  //       })

  //     }, 2000)

  //   } else {

  //     // stex grvuma apin

  //     // result

  //   }

  //   console.log(result);
  // }

  // changeTo = (value, index) => {
  //   let { procentArray } = this.state;
  //   procentArray[index].to = value;

  //   this.setState({
  //     procentArray: procentArray
  //   })
  // }

  // changeFrom = (value, index) => {
  //   let { procentArray } = this.state;
  //   procentArray[index].from = value;

  //   this.setState({
  //     procentArray: procentArray
  //   })
  // }

  // changePercent = (value, index) => {
  //   let { procentArray } = this.state;
  //   procentArray[index].percent = value;

  //   this.setState({
  //     procentArray: procentArray
  //   })
  // }

  // generateShareLink = async (userID) => {
  //   const shareParams =
  //     Platform.OS === "android"
  //       ? {
  //           url: `https://play.google.com/store/apps/details?id=com.JustCode.Refectio`,
  //         }
  //       : {
  //           url: `https://apps.apple.com/am/app/refectio/id1658981599`,
  //         };
  //   const queryParams = Object.keys(shareParams)
  //     .map(
  //       (key) =>
  //         `${encodeURIComponent(key)}=${encodeURIComponent(shareParams[key])}`
  //     )
  //     .join("&");

  //   const shareUrl =
  //     Platform.OS === "android"
  //       ? `https://play.google.com/store/apps/details?id=com.JustCode.Refectio&hl=en_IN&gl=US?${queryParams}`
  //       : `https://apps.apple.com/am/app/refectio/id1658981599${queryParams}`;

  //   try {
  //     await Share.share({
  //       message: shareUrl,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.main}>
          {/* <Modal visible={this.state.RewardModal}>
            <ImageBackground
              source={require('../../assets/image/blurBg.png')}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  // height: ,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  position: 'relative',

                }}>

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    width: 22.5,
                    height: 22.5,
                    right: 21.75,
                    top: 21.75,
                  }}
                  onPress={() => this.setState({ RewardModal: false })}>
                  <Image
                    source={require('../../assets/image/ixs.png')}
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#2D9EFB',
                    fontSize: 26,
                    marginTop: 70,
                    textAlign: 'center',
                    fontFamily: 'Poppins_500Medium',
                  }}>
                  Вознаграждение
                </Text>


                {this.state.valid_error === true &&

                  <Text
                    style={{
                      color: 'red',
                      fontSize: 18,
                      marginTop: 20,
                      textAlign: 'center',
                      fontFamily: 'Poppins_500Medium',
                    }}>
                    Ошибка: заполните все поля.
                  </Text>

                }


                < View style={styles.DesignerRemunerationPercentageParent} >
                  {
                    this.state.procentArray.map((item, index) => {
                      return (
                        <View style={styles.DesignerRemunerationPercentage} key={index}>

                          <Text style={styles.procentText}>От</Text>

                          <TextInput
                            editable={index === 0 ? false : true}
                            keyboardType={'number-pad'}
                            style={styles.procentInput}
                            value={item.to}
                            onChangeText={async (value) => {

                              // await this.setState({ attttttt: value })
                              this.changeTo(value, index)
                              console.log(value)

                            }}
                          />

                          <View style={styles.rubli}>
                            <Svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z" fill="#888888" />
                            </Svg>
                          </View>

                          <Text style={styles.procentText}>До</Text>

                          <TextInput
                            maxLength={10}
                            keyboardType="number-pad"
                            style={styles.procentInput}
                            value={item.from}
                            onChangeText={async (value) => {
                              // await this.setState({ doooooo: value })
                              console.log(value)
                              this.changeFrom(value, index)
                            }}

                          />

                          <View style={styles.rubli}>
                            <Svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z" fill="#888888" />
                            </Svg>
                          </View>

                          <View
                            style={styles.procent}
                          >
                            <TextInput
                              keyboardType="number-pad"
                              maxLength={2}
                              value={item.percent}
                              onChangeText={async (value) => {
                                // await this.setState({ proccccc: value })
                                console.log(value)
                                this.changePercent(value, index)

                              }}
                            />
                            <Text>%</Text>
                          </View>
                        </View>
                      )
                    })
                  }



                  <View View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>

                  

                    {this.state.procentArray.length > 1 &&
                      <TouchableOpacity
                        style={[styles.presoble, { marginRight: 11 }]}
                        onPress={async () => {
                          this.removeInputRow()
                        }}>
                        <Text style={styles.procentText}>Удалить</Text>
                      </TouchableOpacity>

                    }



                   



                    <TouchableOpacity
                      style={styles.presoble}
                      onPress={async () => {
                        this.addInputRow()
                      }}>
                      <Text style={styles.procentText}>Добавить</Text>
                    </TouchableOpacity>


         

                  </View >
                </View >

                <TouchableOpacity
                  style={{ alignSelf: 'center', marginTop: 93, marginBottom: 56 }}
                  onPress={() => { this.savePercont() }}>
                  <BlueButton name="Сохранить" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal> */}

          {this.state.user.length > 0 && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 15 }}
            >
              <View style={styles.campaign}>
                <View style={styles.infoCompanyMain}>
                  <Image
                    source={{
                      uri: this.state.urlImage + this.state.user[0].logo,
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      marginRight: 12,
                      borderColor: "#C8C8C8",
                      borderWidth: 1,
                      resizeMode: "cover",
                      borderRadius: 10,
                    }}
                  />
                  <View style={styles.infoCompany}>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "Raleway_500Medium",
                        }}
                      >
                        {this.state.user[0].company_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#A8A8A8",
                          fontFamily: "Raleway_500Medium",
                        }}
                      >
                        {this.state.user[0].made_in}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 4,
                        }}
                      >
                        {this.state.user[0].saite !== null && (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(this.state.user[0].saite);
                            }}
                          >
                            <Image
                              source={require("../../assets/image/globus.png")}
                              style={{
                                width: 24,
                                height: 24,
                                marginRight: 14,
                              }}
                            />
                          </TouchableOpacity>
                        )}
                        {this.state.user[0].saite == null && (
                          <View style={{ height: 24 }}></View>
                        )}
                        {this.state.user[0].telegram !== null && (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(
                                "https://t.me/" + this.state.user[0].telegram
                              );
                            }}
                          >
                            <Image
                              source={require("../../assets/image/telegram.png")}
                              style={{
                                width: 24,
                                height: 24,
                                marginRight: 14,
                              }}
                            />
                          </TouchableOpacity>
                        )}

                        {this.state.user[0].extract !== null && (
                          <View>
                            <Image
                              source={require("../../assets/image/sidebar.png")}
                              style={{
                                width: 18,
                                height: 24,
                              }}
                            />
                          </View>
                        )}
                      </View>
                    </View>
{/* 
                    <TouchableOpacity
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => {
                        this.generateShareLink();
                      }}
                    >
                      <Svg
                        width={24}
                        height={24}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M18 22a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 15 19c0-.117.008-.238.025-.363s.042-.238.075-.337l-7.05-4.1c-.283.25-.6.446-.95.588-.35.142-.717.213-1.1.212a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 3 12c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 6 9c.383 0 .75.071 1.1.213.35.142.667.338.95.587l7.05-4.1a1.843 1.843 0 0 1-.075-.337A2.734 2.734 0 0 1 15 5c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 18 2c.833 0 1.542.292 2.125.875S21 4.167 21 5s-.292 1.542-.875 2.125A2.893 2.893 0 0 1 18 8c-.383 0-.75-.07-1.1-.212a3.273 3.273 0 0 1-.95-.588L8.9 11.3c.033.1.058.213.075.338a2.747 2.747 0 0 1 0 .725 1.813 1.813 0 0 1-.075.337l7.05 4.1c.283-.25.6-.446.95-.587.35-.141.717-.212 1.1-.213.833 0 1.542.292 2.125.875S21 18.167 21 19s-.292 1.542-.875 2.125A2.893 2.893 0 0 1 18 22Zm0-16a.968.968 0 0 0 .713-.288A.964.964 0 0 0 19 5a.968.968 0 0 0-.288-.713A.964.964 0 0 0 18 4a.968.968 0 0 0-.713.288A.964.964 0 0 0 17 5c0 .283.096.521.288.713.192.192.43.288.712.287ZM6 13a.968.968 0 0 0 .713-.288A.964.964 0 0 0 7 12a.968.968 0 0 0-.288-.713A.964.964 0 0 0 6 11a.968.968 0 0 0-.713.288A.964.964 0 0 0 5 12c0 .283.096.521.288.713.192.192.43.288.712.287Zm12 7a.968.968 0 0 0 .713-.288A.964.964 0 0 0 19 19a.968.968 0 0 0-.288-.713A.964.964 0 0 0 18 18a.968.968 0 0 0-.713.288A.964.964 0 0 0 17 19c0 .283.096.521.288.713.192.192.43.288.712.287Z"
                          fill="#52A8EF"
                        />
                      </Svg>
                    </TouchableOpacity> */}
                  </View>
                </View>

                <View
                  style={{
                    position: "relative",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 9,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "#F5F5F5",
                      width: "50%",
                      borderRadius: 5,
                      position: "relative",
                      height: 24,
                      paddingLeft: 5,
                    }}
                    onPress={() =>
                      this.setState({
                        sOpenCityDropDown: !this.state.sOpenCityDropDown,
                      })
                    }
                  >
                    <Text style={{ fontFamily: "Raleway_400Regular" }}>
                      {this.state.changed}
                    </Text>
                    <View
                      style={{ position: "absolute", right: 17, bottom: 6 }}
                    >
                      {!this.state.sOpenCityDropDown && (
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
                      {this.state.sOpenCityDropDown && (
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
                      this.state.sOpenCityDropDown
                        ? styles.sOpenCityDropDownActive
                        : styles.sOpenCityDropDown
                    }
                  >
                    <ScrollView nestedScrollEnabled={true}>
                      {this.state.city_for_sales_user.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: "100%",
                              justifyContent: "center",
                              textAlign: "left",
                            }}
                            onPress={() =>
                              this.setState({
                                changed: item.city_name,
                                sOpenCityDropDown: false,
                              })
                            }
                          >
                            <Text
                              style={{
                                textAlign: "left",
                                paddingVertical: 10,
                                fontFamily: "Raleway_400Regular",
                              }}
                            >
                              {item.city_name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>

                  <View style={styles.checkBox}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          marginRight: 5,
                          fontFamily: "Raleway_400Regular",
                        }}
                      >
                        Шоурум
                      </Text>
                      <View>
                        {this.state.show_room == null && (
                          <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <Rect
                              x="0.2"
                              y="0.2"
                              width="19.6"
                              height="19.6"
                              rx="3.8"
                              stroke="#52A8EF"
                              stroke-width="0.4"
                            />
                          </Svg>
                        )}
                        {this.state.show_room == "Да" && (
                          <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <Path
                              d="M4 11.4L7.52941 15.4L16 5"
                              stroke="#52A8EF"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <Rect
                              x="0.2"
                              y="0.2"
                              width="19.6"
                              height="19.6"
                              rx="3.8"
                              stroke="#52A8EF"
                              stroke-width="0.4"
                            />
                          </Svg>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 58,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 14,
                    marginBottom: 19,
                    zIndex: -1,
                  }}
                >
                  <View
                    style={[
                      styles.info,
                      {
                        borderRightWidth: 2,
                        borderRightColor: "#EEEEEE",
                      },
                    ]}
                    onPress={() => {
                      this.setState({ RewardModal: true });
                    }}
                  >
                    <Image
                      source={require("../../assets/image/la_percent.png")}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                      }}
                    />
                    <Text style={styles.infoText}>Вознаграждение</Text>
                  </View>
                  <View
                    style={[
                      styles.info,
                      { borderRightWidth: 2, borderRightColor: "#EEEEEE" },
                    ]}
                  >
                    <Image
                      source={require("../../assets/image/clarity_ruble-line.png")}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                      }}
                    />
                    <Text style={styles.infoText}>Запрос{"\n"}стоимости</Text>
                  </View>
                  <View style={styles.info}>
                    <Image
                      source={require("../../assets/image/pcichka.png")}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                      }}
                    />
                    <Text style={styles.infoText}>Бронировать</Text>
                  </View>
                </View>
                <View style={{ zIndex: -1 }}>
                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.state.user_category_for_product.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={async () => {
                            await this.updateProductAfterClickToCategory(
                              item.category_name,
                              index
                            );
                          }}
                          style={
                            this.state.active == index
                              ? styles.categoryButtonActive
                              : styles.categoryButton
                          }
                        >
                          <Text
                            style={
                              this.state.active == index
                                ? styles.categoriesNameActive
                                : styles.categoriesName
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

                {!this.state.change_category_loaded &&
                  this.state.products.map((item, index) => {
                    return (
                      <View key={index} style={{ marginTop: 18 }}>
                        <Slider2 slid={item.product_image} />
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
                            Описание: {item.inserciones}
                          </Text>
                        )}
                        {item.price && (
                          <Text style={{ fontFamily: "Raleway_400Regular" }}>
                            Цена: {item.price} руб.
                          </Text>
                        )}
                      </View>
                    );
                  })}
              </View>
            </ScrollView>
          )}
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
  campaign: {
    width: "100%",
    marginBottom: 34,
  },
  infoCompanyMain: {
    width: "100%",
    // borderWidth: 1,
    // borderColor: '#000',
    flexDirection: "row",
    alignItems: "center",
  },
  infoCompany: {
    width: "67%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoriesName: {
    fontSize: 14,
    fontFamily: "Raleway_600SemiBold",
  },
  categoriesNameActive: {
    fontSize: 14,
    fontFamily: "Raleway_600SemiBold",
    color: "#fff",
  },
  info: {
    width: "33.3%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Raleway_500Medium",
  },
  sOpenCityDropDown: {
    width: "50%",
    height: 0,
    left: 0,
    position: "absolute",
    top: "100%",
    zIndex: 100,
  },
  sOpenCityDropDownActive: {
    width: "50%",
    height: 120,
    left: 0,
    position: "absolute",
    top: "100%",
    elevation: 2,
    borderColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 100,
    backgroundColor: "#fff",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingBottom: 11,
    paddingTop: 9,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginRight: 6,
  },
  categoryButtonActive: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    backgroundColor: "#94D8F4",
    borderRadius: 8,
    marginRight: 6,
  },
  DesignerRemunerationPercentageParent: {
    width: "90%",
    marginTop: 85,
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
    fontSize: 14,
    fontWeight: "400",
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
    borderWidth: 1,
    borderColor: "#F5F5F5",
    borderRadius: 6,
    width: 45,
    height: "100%",
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: "400",
    color: "#888888",
  },
  presoble: {
    width: 90,
    height: 32,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  zakazInfo: {
    fontSize: 14,
    fontFamily: "Raleway_400Regular",
    // marginTop: 5
  },

  DesignerRemunerationPercentageParent: {
    width: "90%",
    marginTop: 85,
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
    fontSize: 14,
    fontWeight: "400",
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
    borderWidth: 1,
    borderColor: "#F5F5F5",
    borderRadius: 6,
    width: 45,
    height: "100%",
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: "400",
    color: "#888888",
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
