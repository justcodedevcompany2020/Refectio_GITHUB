import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomerMainPageNavComponent from "../CustomerMainPageNav";
import { APP_URL, APP_IMAGE_URL, APP_PUBLIC_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ZakaziLiveComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInfoCustomer: false,

      data: [],
      page: 1,
      isLoading: false,
      isLastPage: false,
    };
  }

  clearAllData = () => {
    this.setState({
      data: [],
      page: 1,
      isLoading: false,
      isLastPage: false,
    });
  };

  fetchData = async () => {
    const { page, data, isLastPage } = this.state;

    let token = await AsyncStorage.getItem("userToken");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (isLastPage) {
      return;
    }
    this.setState({ isLoading: true });
    fetch(`${APP_URL}GetManufacterOrders?page=${page}`, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === true) {
          if (responseJson.data.data.length > 0) {
            this.setState({
              data: [...data, ...responseJson?.data?.data],
              page: page + 1,
              isLoading: false,
            });
          } else {
            this.setState({
              isLastPage: true,
              isLoading: false,
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.fetchData();

    const focusListener = navigation.addListener("focus", () => {
      this.fetchData();
    });
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener();
      console.log(" END");
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.clounParnt}
        onPress={() => {
          this.props.navigation.navigate("LiveZakazchikSingl", {
            params: item.id,
          });
          this.clearAllData();
        }}
      >
        <Image
          source={{ uri: APP_PUBLIC_URL + item.photo }}
          style={styles.clounImg}
          resizeMode="contain"
        />

        <View
          style={{
            paddingLeft: 10,
            justifyContent: "space-between",
            height: 82,
          }}
        >
          <Text style={styles.nickName}>
            {item.name} {item.surname}
          </Text>

          <Text style={styles.vnestiDanniy}>Внести данные</Text>
        </View>
      </TouchableOpacity>
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
    this.fetchData();
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Modal visible={this.state.modalInfoCustomer}>
            <ImageBackground
              source={require("../../../assets/image/blurBg.png")}
              style={styles.blurBg}
            >
              <View style={styles.whiteBox}>
                <Text style={styles.info}>
                  После того, как дизайнер добавит заказчика, вы сможете внести
                  данные по изготавливаемым изделиям. У дизайнера информация
                  (готовность, дата доставки) по всем производителям для одного
                  заказчика будет в одном месте.
                </Text>

                <TouchableOpacity
                  style={styles.buttonOk}
                  onPress={() => {
                    this.setState({ modalInfoCustomer: false });
                  }}
                >
                  <Text style={styles.textOk}>Ок</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dontShow}
                  onPress={() => {
                    this.setState({ modalInfoCustomer: false });
                  }}
                >
                  <Text style={styles.dontShowText}>Больше не показывать</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <Text style={styles.pageName}>Заказы Live</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 13,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity style={styles.activePage}>
              <Text
                style={{
                  fontFamily: "Raleway_600SemiBold",
                  color: "#fff",
                  fontSize: 15,
                }}
              >
                Активные
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.arxivePage}
              onPress={() => {
                // this.props.navigation.navigate('CustomerRewards')
              }}
            >
              <Text
                style={{
                  fontFamily: "Raleway_600SemiBold",
                  color: "#333333",
                  fontSize: 15,
                }}
              >
                Архив
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
          />
        </View>
        <CustomerMainPageNavComponent
          active_page={"Заказы"}
          navigation={this.props.navigation}
        />
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
  blurBg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteBox: {
    width: "90%",
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  info: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    textAlign: "center",
    padding: 5,
    marginBottom: 45,
  },
  buttonOk: {
    width: "80%",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B5D8FE",
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 12,
  },
  textOk: {
    fontFamily: "Poppins_700Bold",
    color: "#fff",
    fontSize: 18,
  },
  dontShow: {
    width: "80%",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#B5D8FE",
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 43,
  },
  dontShowText: {
    color: "#B5D8FE",
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
  },
  pageName: {
    color: "#378DFE",
    marginTop: 11,
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
  },
  activePage: {
    width: "47%",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#378DFE",
    borderRadius: 10,
    marginRight: 10,
  },
  arxivePage: {
    width: "47%",
    alignItems: "center",
    paddingVertical: 8,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
  },
  clounImg: {
    width: 82,
    height: 82,
  },
  nickName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  vnestiDanniy: {
    color: "#52A8EF",
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
  clounParnt: {
    flexDirection: "row",
    height: 99,
    borderBottomWidth: 1,
    borderColor: "#EBEBEB",
    marginTop: 15,
  },
});
