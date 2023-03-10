import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";

export default class CheckDesignerComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={{ flex: 1 }}>
          <Text style={styles.pageInfo}>Страница в разработке.</Text>
        </View>
        <CustomerMainPageNavComponent
          active_page={"Дизайнеры"}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  pageInfo: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 30,
    color: "red",
  },
});

// import React, { Component } from "react";
// import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, ScrollView } from "react-native";
// import Svg, { Path } from "react-native-svg";
// import ArrowGrayComponent from "../../assets/image/ArrowGray";
// import CustomerMainPageNavComponent from "./CustomerMainPageNav";

// export default class CheckDesignerComponent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       designers: [
//         {
//           name: 'Алексей',
//           pakupk: 'Покупки',
//           pakupkTiv: 14,
//           kalichestva: 'Брони',
//           obshiy: '(Общее количество)',
//           mesyac: '(За 3 месяца)',
//           kalichestvaTiv: 17,
//           mesyacTiv: 3,
//           stoyimost: 'Средная стоимость',
//           stoyimostTiv: '300.000р',
//           vsevo: 'Всего покупок',
//           rubli: '2,000,000 руб'
//         },
//         {
//           name: 'Сергей',
//           pakupk: 'Покупки',
//           pakupkTiv: 14,
//           kalichestva: 'Брони',
//           obshiy: '(Общее количество)',
//           mesyac: '(За 3 месяца)',
//           kalichestvaTiv: 17,
//           mesyacTiv: 3,
//           stoyimost: 'Средная стоимость',
//           stoyimostTiv: '300.000р',
//           vsevo: 'Всего покупок',
//           rubli: '2,000,000 руб'
//         },
//         {
//           name: 'Алексей',
//           pakupk: 'Покупки',
//           pakupkTiv: 14,
//           kalichestva: 'Брони',
//           obshiy: '(Общее количество)',
//           mesyac: '(За 3 месяца)',
//           kalichestvaTiv: 17,
//           mesyacTiv: 3,
//           stoyimost: 'Средная стоимость',
//           stoyimostTiv: '300.000р',
//           vsevo: 'Всего покупок',
//           rubli: '2,000,000 руб'
//         },
//         {
//           name: 'Сергей',
//           pakupk: 'Покупки',
//           pakupkTiv: 14,
//           kalichestva: 'Брони',
//           obshiy: '(Общее количество)',
//           mesyac: '(За 3 месяца)',
//           kalichestvaTiv: 17,
//           mesyacTiv: 3,
//           stoyimost: 'Средная стоимость',
//           stoyimostTiv: '300.000р',
//           vsevo: 'Всего покупок',
//           rubli: '2,000,000 руб'
//         },
//         {
//           name: 'Алексей',
//           pakupk: 'Покупки',
//           pakupkTiv: 14,
//           kalichestva: 'Брони',
//           obshiy: '(Общее количество)',
//           mesyac: '(За 3 месяца)',
//           kalichestvaTiv: 17,
//           mesyacTiv: 3,
//           stoyimost: 'Средная стоимость',
//           stoyimostTiv: '300.000р',
//           vsevo: 'Всего покупок',
//           rubli: '2,000,000 руб'
//         },
//         {
//           name: 'Сергей',
//           pakupk: 'Покупки',
//           pakupkTiv: 14,
//           kalichestva: 'Брони',
//           obshiy: '(Общее количество)',
//           mesyac: '(За 3 месяца)',
//           kalichestvaTiv: 17,
//           mesyacTiv: 3,
//           stoyimost: 'Средная стоимость',
//           stoyimostTiv: '300.000р',
//           vsevo: 'Всего покупок',
//           rubli: '2,000,000 руб'
//         },
//         {
//           name: 'Алексей',
//           pakupk: 'Покупки',
//           pakupkTiv: 14,
//           kalichestva: 'Брони',
//           obshiy: '(Общее количество)',
//           mesyac: '(За 3 месяца)',
//           kalichestvaTiv: 17,
//           mesyacTiv: 3,
//           stoyimost: 'Средная стоимость',
//           stoyimostTiv: '300.000р',
//           vsevo: 'Всего покупок',
//           rubli: '2,000,000 руб'
//         },
//         {
//           name: 'Сергей',
//           pakupk: 'Покупки',
//           pakupkTiv: 14,
//           kalichestva: 'Брони',
//           obshiy: '(Общее количество)',
//           mesyac: '(За 3 месяца)',
//           kalichestvaTiv: 17,
//           mesyacTiv: 3,
//           stoyimost: 'Средная стоимость',
//           stoyimostTiv: '300.000р',
//           vsevo: 'Всего покупок',
//           rubli: '2,000,000 руб'
//         },

//       ],
//       calichestva: false,
//       changed: 'По кол. покупок'
//     }
//   }

//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.main}>
//           <TouchableOpacity
//             onPress={() => this.props.navigation.navigate('CustomerMainPage')}
//             style={{
//               position: 'absolute',
//               top: 10,
//               left: 10,
//             }}>
//             <ArrowGrayComponent />
//           </TouchableOpacity>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginLeft: 35,
//               marginTop: 13,
//               justifyContent: 'space-between',
//               paddingBottom: 18
//             }}>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontFamily: 'Poppins_500Medium',
//                 color: '#1571F0'
//               }}>
//               Дизайнеры
//             </Text>
//           </View>

//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

//             <TouchableOpacity style={{ width: '47%', alignItems: 'center', paddingVertical: 8, backgroundColor: '#378DFE', borderRadius: 10 }}>
//               <Text style={{ fontFamily: 'Raleway_600SemiBold', color: '#fff', fontSize: 15 }}>Мои дизайнеры</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={{ width: '47%', alignItems: 'center', paddingVertical: 8, borderColor: '#E6E6E6', borderWidth: 1, borderRadius: 10 }}
//               onPress={() => {
//                 this.props.navigation.navigate('CustomerRewards')
//               }}>
//               <Text style={{ fontFamily: 'Raleway_600SemiBold', color: '#333333', fontSize: 15 }}>Вознаграждения</Text>
//             </TouchableOpacity>

//           </View>

//           <View
//             style={{
//               position: 'relative',
//               marginTop: 9,
//               marginBottom: 15,
//               height: 30
//             }}>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#F5F5F5',
//                 width: '47%',
//                 borderRadius: 5,
//                 position: 'relative',
//                 justifyContent: 'center',
//                 height: '100%',
//                 paddingLeft: 12,
//                 paddingBottom: 3,
//                 // marginLeft: 5,
//               }}
//               onPress={() => {
//                 this.setState({ calichestva: !this.state.calichestva })
//               }}>

//               <Text style={{ fontFamily: 'Raleway_400Regular', }}>{this.state.changed}</Text>

//               <View style={{ position: 'absolute', right: 12, bottom: 8 }}>
//                 {!this.state.calichestva &&
//                   <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <Path d="M1 1L9 9L17 1" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//                   </Svg>
//                 }
//                 {this.state.calichestva &&
//                   <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <Path d="M1 9L9 1L17 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//                   </Svg>
//                 }
//               </View>

//             </TouchableOpacity>
//             <View
//               style={this.state.calichestva ? styles.sOpenCityDropDownActive : styles.sOpenCityDropDown}>
//               <ScrollView nestedScrollEnabled={true}>
//                 {/* {
//                   this.state.city_for_sales_user.map((item, index) => {
//                     return (
//                       <TouchableOpacity
//                         key={index}
//                         style={{
//                           width: '100%',
//                           justifyContent: 'center',
//                           textAlign: 'left',
//                         }}
//                         onPress={() => this.setState({ changed: item.city_name, sOpenCityDropDown: false })}
//                       >
//                         <Text style={{ textAlign: 'left', paddingVertical: 10, fontFamily: 'Raleway_400Regular', }}>
//                           {item.city_name}
//                         </Text>

//                       </TouchableOpacity>
//                     )

//                   })
//                 } */}
//               </ScrollView>
//             </View>
//           </View>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View
//               style={{
//                 width: '100%',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 justifyContent: 'space-between',
//               }}>
//               {
//                 this.state.designers.map((item, index) => {
//                   return (
//                     <View
//                       key={index}
//                       style={{
//                         width: '48%',
//                         borderRadius: 10,
//                         backgroundColor: '#F5F5F5',
//                         padding: 8,
//                         marginBottom: 15
//                       }}>
//                       <Text
//                         style={{
//                           textAlign: 'center',
//                           fontSize: 15,
//                           fontFamily: 'Poppins_600SemiBold',
//                         }}>
//                         {item.name}
//                       </Text>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                           marginTop: 18,
//                           alignItems: 'center',
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 12,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.pakupk}
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.pakupkTiv}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                           marginTop: 5,
//                           alignItems: 'center',
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 12,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.kalichestva}
//                           <Text
//                             style={{
//                               fontSize: 8,
//                               fontFamily: 'Poppins_300Light',
//                             }}>
//                             {item.obshiy}
//                           </Text>
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.kalichestvaTiv}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                           marginTop: 5,
//                           alignItems: 'center',
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 12,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.kalichestva}
//                           <Text
//                             style={{
//                               fontSize: 8,
//                               fontFamily: 'Poppins_300Light',
//                             }}>
//                             {item.mesyac}
//                           </Text>
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.mesyacTiv}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           marginTop: 5,
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 12,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.stoyimost}
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             fontFamily: 'Poppins_500Medium',
//                           }}>
//                           {item.stoyimostTiv}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           marginTop: 15,
//                         }}>
//                         <Text
//                           style={{
//                             textAlign: 'center',
//                             fontSize: 12,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.vsevo}
//                         </Text>
//                         <Text
//                           style={{
//                             textAlign: 'center',
//                             fontSize: 14,
//                             color: '#1571F0',
//                             marginTop: 3,
//                             fontFamily: 'Poppins_500Medium',
//                           }}>
//                           {item.rubli}
//                         </Text>
//                       </View>
//                     </View>
//                   )
//                 })
//               }
//             </View>
//           </ScrollView>
//         </View>
//         <CustomerMainPageNavComponent active_page={'Дизайнеры'} navigation={this.props.navigation} />
//       </SafeAreaView >
//     )
//   }

// }

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: 'white',
//     position: 'relative',
//     paddingHorizontal: 15,
//   }
// })
