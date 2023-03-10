import React, { useEffect, useState, useRef, memo } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import { APP_URL, APP_IMAGE_URL } from "@env";

const width = Dimensions.get("window").width - 25;

export default function Slider2(props) {

  const [sliderModal, setSliderModal] = useState(false);
  const [imgActive, setInmageActive] = useState(0);

  const change = (nativeEvent) => {
    const slider = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slider !== imgActive) {
      setInmageActive(slider);
    }
  };

  let sliderItem = ({ item, index }) => {
    return sliderModal === true ? (
      <Image
        source={{ uri: APP_IMAGE_URL + item.image }}
        style={{ height: "100%", width: width, resizeMode: "contain" }}
      />
    ) : (
      <TouchableOpacity onPress={() => setSliderModal(true)}>
        <Image
          source={{ uri: APP_IMAGE_URL + item.image }}
          style={{ height: "100%", width: width, resizeMode: "cover" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal visible={sliderModal}>
        <View style={styles.sliderModal}>
          <TouchableOpacity
            style={{ position: "absolute", right: 18, top: 18, zIndex: 50 }}
            onPress={() => {
              setSliderModal(false);
              setInmageActive(0);
            }}
          >
            <Image
              source={require("../../assets/image/ixs.png")}
              style={[
                { tintColor: "white", width: 30, height: 30 },
                Platform.OS == "ios" ? { marginTop: 25 } : "",
              ]}
            />
          </TouchableOpacity>

          <View>
            <FlatList
              horizontal
              pagingEnabled
              style={{width: width}}
              showsHorizontalScrollIndicator={false}
              data={props.slid}
              keyExtractor={(item) => item.id}
              renderItem={sliderItem}
              onScroll={({ nativeEvent }) => change(nativeEvent)}
            />
            <View style={styles.wrapDot}>
              {props.slid.map((item, index) => (
                <Animated.View
                  style={imgActive === index ? styles.dotActive : styles.dot}
                  key={index}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <FlatList
          horizontal
          pagingEnabled
          style={styles.wrapper}
          showsHorizontalScrollIndicator={false}
          data={props.slid}
          keyExtractor={(item) => item.id}
          renderItem={sliderItem}
          onScroll={({ nativeEvent }) => change(nativeEvent)}
        />
        <View style={styles.wrapDot}>
          {props.slid.map((item, index) => (
            <Animated.View
              style={imgActive === index ? styles.dotActive : styles.dot}
              key={index}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: 176,
  },
  wrapDot: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#1571F0",
    zIndex: 1,
  },
  dot: {
    marginBottom: -30,
    marginHorizontal: 3,
    width: 10,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  dotActive: {
    marginBottom: -30,
    marginHorizontal: 3,
    width: 30,
    height: 5,
    backgroundColor: "#1571F0",
    borderRadius: 3,
  },
  sliderModal: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
