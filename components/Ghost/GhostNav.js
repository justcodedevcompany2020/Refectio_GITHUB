import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import BlueButton from "../Component/Buttons/BlueButton";

export default class GhostNavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navBar: [
        {
          images: require("../../assets/image/home.png"),
          text: "Главная",
          change: "GhostPage",
          id: 1,
        },
        {
          images: require("../../assets/image/LIVE.png"),
          text: "Заказы",
          change: "Modal",
          id: 2,
        },
        {
          images: require("../../assets/image/akar-icons_heart.png"),
          text: "Избранное",
          change: "Modal",
          id: 3,
        },
        {
          images: require("../../assets/image/carbon_user-avatar.png"),
          text: "Профиль",
          change: "AuthScreen",
          id: 4,
        },
      ],
    };
  }

  goToPages = (e) => {
    this.props.navigation.navigate(e);
  };

  render() {
    return (
      <View style={styles.navBar}>
        {this.state.navBar.map((item, index) => {
          return (
            <TouchableOpacity
              style={{ alignItems: "center", width: "25%" }}
              onPress={() => {
                this.goToPages(item.change);
              }}
              key={index}
            >
              <Image
                source={item.images}
                style={[
                  this.props.active_page == item.text
                    ? styles.navIconsActive
                    : styles.navIcons,
                  index === 1
                    ? {
                        width: 40,
                        height: 14,
                        resizeMode: "contain",
                        marginBottom: 5,
                        marginTop: 9,
                      }
                    : { width: 25, height: 25 },
                ]}
              />
              <Text
                key={index}
                style={
                  this.props.active_page == item.text
                    ? styles.navTextActive
                    : styles.navText
                }
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 3,
    borderTopColor: "#00000010",
  },
  navIcons: {
    tintColor: "#44BBEB",
    width: 25,
    height: 25,
    marginTop: 4,
  },
  navIconsActive: {
    tintColor: "#52A8EF",
    width: 25,
    height: 25,
    marginTop: 4,
  },
  navText: {
    color: "#000",
    fontSize: 10,
    fontFamily: "Poppins_500Medium",
  },
  navTextActive: {
    color: "#52A8EF",
    fontSize: 10,
    fontFamily: "Poppins_500Medium",
  },
});
