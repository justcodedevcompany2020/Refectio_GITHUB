// import React, { memo, useEffect, useState } from 'react';
// import { StyleSheet, View, Image, Dimensions, ScrollView, Pressable } from 'react-native';

// const width = Dimensions.get('window').width - 25

import React, { Component, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { APP_URL, APP_IMAGE_URL } from "@env";

const width = Dimensions.get("window").width - 25;

export default function Slider(props) {
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
    return (
      <View>
        <Image
          source={{ uri: APP_IMAGE_URL + item.image }}
          style={{ height: "100%", width: width, resizeMode: "cover" }}
        />
      </View>
    );
  };

  return (
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
          <View
            style={imgActive === index ? styles.dotActive : styles.dot}
            key={index}
          />
        ))}
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
});
