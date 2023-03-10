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

export default class CustomerRewardsComponent extends React.Component {
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
// import { StyleSheet, SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, ScrollView } from "react-native";
// import Svg, { Path, Rect } from "react-native-svg";
// import ArrowGrayComponent from "../../assets/image/ArrowGray";
// import CustomerMainPageNavComponent from "./CustomerMainPageNav";

// export default class CustomerRewardsComponent extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       filterSortBy: [],
//       broni: [
//         {
//           id: 1,
//           date: '01.02.22',
//           categir: 'Кухонная мебель',
//           stranaa: 'г. Москва',
//           data: [
//             { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//             { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//           ],
//           comp: [
//             { name: 'Алексей\nСмирнов', rubli1: '300.000Руб(10%)', rubli: '300.000Руб' },

//           ]

//         },
//         {
//           id: 2,
//           date: '01.02.22',
//           categir: 'Кухонная мебель',
//           stranaa: 'г. Москва',
//           data: [
//             { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//             { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//           ],
//           comp: [
//             { name: 'Алексей\nСмирнов', rubli1: '300.000Руб(10%)', rubli: '300.000Руб' },
//           ]

//         },
//         {
//           id: 3,
//           date: '01.02.22',
//           categir: 'Кухонная мебель',
//           stranaa: 'г. Москва',
//           data: [
//             { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//             { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//           ],
//           comp: [
//             { name: 'Алексей\nСмирнов', rubli1: '300.000Руб(10%)', rubli: '300.000Руб' },
//           ]

//         },
//         {
//           id: 4,
//           date: '01.02.22',
//           categir: 'Кухонная мебель',
//           stranaa: 'г. Москва',
//           data: [
//             { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//             { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//           ],
//           comp: [
//             { name: 'Алексей\nСмирнов', rubli1: '300.000Руб(10%)', rubli: '300.000Руб' },
//           ]

//         },
//         {
//           id: 5,
//           date: '01.02.22',
//           categir: 'Кухонная мебель',
//           stranaa: 'г. Москва',
//           data: [
//             { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//             { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//           ],
//           comp: [
//             { name: 'Алексей\nСмирнов', rubli1: '300.000Руб(10%)', rubli: '300.000Руб' },
//           ]

//         },
//       ],

//       // data: [],

//     }
//   }

//   // handleGetBrone = async () => {
//   //     let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjg5NTc2ZmE0NjAyM2QxMzQwYjU4OWY4NDNlM2Q2NDA2ZTVlMWViZGYyNGE2YWQxM2I3YzA5NGE5ZTUxYjFiMmZjZTc0NjQ5YWEyMjYwNzAiLCJpYXQiOjE2NjAxMzEzOTguMTY0ODYyLCJuYmYiOjE2NjAxMzEzOTguMTY0ODcsImV4cCI6MTY5MTY2NzM5OC4xNDM4MDIsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.UT5Kyu9OW-uMoiytiEj0lpXst5KNZ9Gw3ylrtrjadAtu684zftmVUmf8t0Lo2icgB6_xNAy7TMIjHICJEuuQBtxXS-500gTEmv_SDvZbXI3RCDDgpzpJdXNdjjmHV5NjUyrzhOdMvJyGRQThQ4AwiKfCh5jS4_wxTHLk3GT0ySiyoU6D75689c2siamvyV6-Yy6peI8kDKHsQvUfpGIYQ30ChULAts1oWFms7UoIaE-YCCqa1JF3pSRzfjmNqhKYPXPJYj-6mtD8Rjzp79wELCzKM20eYNIVi70Bh8uA-GbZNb9ik-VkfTo_sE40BkTsl8EZh7DRvaIhjXnrN0aybCssnFTbzUgQ4lVg_k43RKUBUvAVDT2kmKiz4YEAeUeDYL50gK63HEfXbEg8KWVg2Hc4U3HczZI21RHm7h4Fbfwj0Vc8cB6hrro_j-OAGsBRXLHp2jMR-VbvuJzG9gCJc1dg8xtKHqdXxY1wNyUVhD7cH0w9bb2mBPHIvYge3GHsfuIvkPmTYK4Pmz8d1W1EAoY_yUDXOXB8sF1bKX0gqk62AO8EcATrOSvhkzEAw7ePsgFav75ABkY_weA-iIF2mkwB_rnUwwIaRNoEV_q2-0UEdFBf_BJ9F2JxYPFcvm_ehHElwKYd9M4x0roHj7NJMC_M6qUcxSOs86Az4FtuJNM'
//   //     let AuthStr = 'Bearer ' + userToken;
//   //     fetch('http://80.78.246.59/Refectio/public/api/GetMyBrone', {
//   //         method: 'GET',
//   //         headers: {
//   //             'Authorization': AuthStr,
//   //         },
//   //     }).then((response) => {
//   //         return response.json()
//   //     }).then((res) => {
//   //         // console.log(res, 'data')
//   //         let data = res.data.book.data
//   //         // console.log(data,'sd');
//   //         this.setState({
//   //             data: data
//   //         })

//   //     })
//   // }

//   enterCheckBox = (id) => {
//     let filterSort = this.state.filterSortBy;
//     let find = false
//     filterSort.find((item) => {
//       if (item == id) {
//         find = true
//       }
//     })

//     if (find) {
//       const index = filterSort.indexOf(id);
//       filterSort.splice(index, 1);
//     }
//     else {
//       filterSort.push(id)
//     }
//     this.setState({ filterSortBy: filterSort })
//   }

//   verifyCheckBox = (id) => {
//     let filterSort = this.state.filterSortBy
//     let find = false
//     filterSort.find((item) => {
//       if (item == id) {
//         find = true
//       }
//     })
//     return find
//   }

//   // componentDidMount() {
//   //     const { navigation } = this.props;
//   //     this.handleGetBrone()
//   //     this.focusListener = navigation.addListener("focus", () => {
//   //         this.handleGetBrone()
//   //     });
//   // }

//   // componentWillUnmount() {
//   //     if (this.focusListener) {
//   //         this.focusListener();
//   //     }
//   // }

//   render() {
//     // {
//     //     this.state.data.map((res) => {
//     //         console.log(res.designer_name, 'res')
//     //     })
//     // }

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

//             <TouchableOpacity style={{ width: '48%', alignItems: 'center', paddingVertical: 8, borderColor: '#E6E6E6', borderWidth: 1, borderRadius: 10 }}
//               onPress={() => {
//                 this.props.navigation.navigate('CheckDesigner')
//               }}>
//               <Text style={{ fontFamily: 'Raleway_600SemiBold', color: '#333333', fontSize: 15 }}>Мои дизайнеры</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={{ width: '48%', alignItems: 'center', paddingVertical: 8, backgroundColor: '#378DFE', borderRadius: 10, }}>
//               <Text style={{ fontFamily: 'Raleway_600SemiBold', color: '#fff', fontSize: 15 }}>Вознаграждения</Text>
//             </TouchableOpacity>

//           </View>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             {
//               this.state.broni.map((item, index) => {
//                 return (
//                   <View key={index} style={styles.sortMain}>
//                     <View style={styles.sorts}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 25,
//                             fontFamily: 'Poppins_500Medium',
//                             marginRight: 14,
//                             color: '#A8A8A8'
//                           }}>
//                           {item.id}
//                         </Text>
//                         <Text
//                           style={{
//                             marginTop: 6,
//                             color: '#C4C4C4',
//                             fontSize: 20,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                           {item.date}
//                         </Text>
//                       </View>
//                       <View key={item.id} style={styles.checkBox}>
//                         <TouchableOpacity
//                           style={{
//                             borderRadius: 5,
//                             overflow: 'hidden',
//                           }}
//                           onPress={() => {
//                             this.enterCheckBox(item.id)
//                           }}>
//                           {this.verifyCheckBox(item.id) === false &&
//                             <Text
//                               style={{
//                                 paddingBottom: 7,
//                                 paddingTop: 5,
//                                 paddingHorizontal: 15,
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 backgroundColor: '#52A8EF',
//                                 color: '#fff',
//                                 fontFamily: 'Raleway_600SemiBold',
//                                 fontSize: 13,
//                               }}>
//                               Подтвердить
//                             </Text>
//                           }
//                           {this.verifyCheckBox(item.id) === true &&
//                             <Text
//                               style={{
//                                 paddingBottom: 7,
//                                 paddingTop: 5,
//                                 paddingHorizontal: 15,
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 backgroundColor: '#B5D8FE',
//                                 borderRadius: 5,
//                                 color: '#fff',
//                                 fontFamily: 'Raleway_600SemiBold',
//                                 fontSize: 13,
//                               }}>
//                               Оплачено
//                             </Text>
//                           }
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         marginBottom: 2
//                       }}>
//                       <Text style={{
//                         fontSize: 12,
//                         fontFamily: 'Poppins_500Medium',
//                       }}>
//                         {item.categir}
//                       </Text>
//                       <Text style={{
//                         fontSize: 12,
//                         fontFamily: 'Poppins_500Medium',
//                       }}>
//                         {item.stranaa}
//                       </Text>
//                     </View>

//                     {item.data.map((res, index) => {
//                       return (
//                         <View
//                           key={index}
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                           }}>
//                           <Text style={{
//                             fontSize: 18,
//                             fontFamily: 'Poppins_400Regular',
//                           }}>
//                             {res.name}
//                           </Text>
//                           <Text style={{
//                             fontSize: 14,
//                             fontFamily: 'Poppins_300Light',
//                           }}>
//                             {res.number}
//                           </Text>
//                         </View>
//                       )
//                     })}
//                     <View style={{ width: '100%', borderWidth: 1, borderColor: '#EBEBEB', marginVertical: 5 }}></View>
//                     {item.comp.map((res, index) => {
//                       return (
//                         <View
//                           key={index}
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                           }}>
//                           <Text style={{
//                             fontSize: 18,
//                             fontFamily: 'Poppins_600SemiBold',
//                           }}>
//                             {res.name}
//                           </Text>
//                           <View>
//                             <Text style={{
//                               fontSize: 13,
//                               marginTop: 3,
//                               fontFamily: 'Poppins_300Light',
//                             }}>
//                               {res.rubli1}
//                             </Text>
//                             <Text style={{
//                               fontSize: 17,
//                               color: '#77ADF6',
//                               textAlign: 'right',
//                               fontFamily: 'Poppins_500Medium',
//                             }}>
//                               {res.rubli}
//                             </Text>
//                           </View>
//                         </View>
//                       )
//                     })}

//                   </View>
//                 )
//               })
//             }
//           </ScrollView>
//         </View>
//         <CustomerMainPageNavComponent active_page={'Дизайнеры'} navigation={this.props.navigation} />
//       </SafeAreaView>
//     )
//   }
// }
// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//   },
//   sortMain: {
//     width: '100%',
//     borderWidth: 3,
//     marginBottom: 15,
//     borderColor: '#E5E5E5',
//     borderRadius: 10,
//     padding: 10,
//   },
//   sorts: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   }
// })
