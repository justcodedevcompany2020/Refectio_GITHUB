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

export default class ZakaziLiveComponent extends React.Component {
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
          active_page={"Брони"}
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
// import CustomerMainPageNavComponent from "./CustomerMainPageNav";

// export default class CustomerMyBroniComponent extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             filterSortBy: [],
//             broni: [
//                 {
//                     id: 1,
//                     date: '01.02.22',
//                     categir: 'Кухонная мебель',
//                     stranaa: 'г. Москва',
//                     data: [
//                         { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//                         { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//                     ],
//                     comp: [
//                         { name: 'Алексей\nСмирнов', rubli: '250.000Руб' },

//                     ]

//                 },
//                 {
//                     id: 2,
//                     date: '01.02.22',
//                     categir: 'Кухонная мебель',
//                     stranaa: 'г. Москва',
//                     data: [
//                         { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//                         { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//                     ],
//                     comp: [
//                         { name: 'Алексей\nСмирнов', rubli: '250.000Руб' },
//                     ]

//                 },
//                 {
//                     id: 3,
//                     date: '01.02.22',
//                     categir: 'Кухонная мебель',
//                     stranaa: 'г. Москва',
//                     data: [
//                         { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//                         { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//                     ],
//                     comp: [
//                         { name: 'Алексей\nСмирнов', rubli: '250.000Руб' },
//                     ]

//                 },
//                 {
//                     id: 4,
//                     date: '01.02.22',
//                     categir: 'Кухонная мебель',
//                     stranaa: 'г. Москва',
//                     data: [
//                         { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//                         { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//                     ],
//                     comp: [
//                         { name: 'Алексей\nСмирнов', rubli: '250.000Руб' },
//                     ]

//                 },
//                 {
//                     id: 5,
//                     date: '01.02.22',
//                     categir: 'Кухонная мебель',
//                     stranaa: 'г. Москва',
//                     data: [
//                         { name: 'Алексей Петров', number: '+7(909)099-99-99' },
//                         { name: 'Ирина Петрова', number: '+7(808)088-88-88' },
//                     ],
//                     comp: [
//                         { name: 'Алексей\nСмирнов', rubli: '250.000Руб' },
//                     ]

//                 },
//             ],

//             // data: [],

//         }
//     }

//     // handleGetBrone = async () => {
//     //     let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjg5NTc2ZmE0NjAyM2QxMzQwYjU4OWY4NDNlM2Q2NDA2ZTVlMWViZGYyNGE2YWQxM2I3YzA5NGE5ZTUxYjFiMmZjZTc0NjQ5YWEyMjYwNzAiLCJpYXQiOjE2NjAxMzEzOTguMTY0ODYyLCJuYmYiOjE2NjAxMzEzOTguMTY0ODcsImV4cCI6MTY5MTY2NzM5OC4xNDM4MDIsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.UT5Kyu9OW-uMoiytiEj0lpXst5KNZ9Gw3ylrtrjadAtu684zftmVUmf8t0Lo2icgB6_xNAy7TMIjHICJEuuQBtxXS-500gTEmv_SDvZbXI3RCDDgpzpJdXNdjjmHV5NjUyrzhOdMvJyGRQThQ4AwiKfCh5jS4_wxTHLk3GT0ySiyoU6D75689c2siamvyV6-Yy6peI8kDKHsQvUfpGIYQ30ChULAts1oWFms7UoIaE-YCCqa1JF3pSRzfjmNqhKYPXPJYj-6mtD8Rjzp79wELCzKM20eYNIVi70Bh8uA-GbZNb9ik-VkfTo_sE40BkTsl8EZh7DRvaIhjXnrN0aybCssnFTbzUgQ4lVg_k43RKUBUvAVDT2kmKiz4YEAeUeDYL50gK63HEfXbEg8KWVg2Hc4U3HczZI21RHm7h4Fbfwj0Vc8cB6hrro_j-OAGsBRXLHp2jMR-VbvuJzG9gCJc1dg8xtKHqdXxY1wNyUVhD7cH0w9bb2mBPHIvYge3GHsfuIvkPmTYK4Pmz8d1W1EAoY_yUDXOXB8sF1bKX0gqk62AO8EcATrOSvhkzEAw7ePsgFav75ABkY_weA-iIF2mkwB_rnUwwIaRNoEV_q2-0UEdFBf_BJ9F2JxYPFcvm_ehHElwKYd9M4x0roHj7NJMC_M6qUcxSOs86Az4FtuJNM'
//     //     let AuthStr = 'Bearer ' + userToken;
//     //     fetch('http://80.78.246.59/Refectio/public/api/GetMyBrone', {
//     //         method: 'GET',
//     //         headers: {
//     //             'Authorization': AuthStr,
//     //         },
//     //     }).then((response) => {
//     //         return response.json()
//     //     }).then((res) => {
//     //         // console.log(res, 'data')
//     //         let data = res.data.book.data
//     //         // console.log(data,'sd');
//     //         this.setState({
//     //             data: data
//     //         })

//     //     })
//     // }

//     // componentDidMount() {
//     //     const { navigation } = this.props;
//     //     this.handleGetBrone()
//     //     this.focusListener = navigation.addListener("focus", () => {
//     //         this.handleGetBrone()
//     //     });
//     // }

//     // componentWillUnmount() {
//     //     if (this.focusListener) {
//     //         this.focusListener();
//     //     }
//     // }

//     render() {
//         // {
//         //     this.state.data.map((res) => {
//         //         console.log(res.designer_name, 'res')
//         //     })
//         // }

//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <View style={styles.main}>

//                     <Text
//                         style={{
//                             fontSize: 24,
//                             fontFamily: 'Poppins_500Medium',
//                             color: '#1571F0',
//                             marginVertical: 11,
//                         }}>
//                         Мои Брони
//                     </Text>
//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         {this.state.broni.map((item, index) => {
//                             return (
//                                 <View key={index} style={styles.sortMain}>
//                                     <View style={styles.sorts}>
//                                         <View
//                                             style={{
//                                                 flexDirection: 'row',
//                                             }}>
//                                             <Text
//                                                 style={{
//                                                     fontSize: 25,
//                                                     fontFamily: 'Poppins_500Medium',
//                                                     marginRight: 14,
//                                                     color: '#1571F0'
//                                                 }}>
//                                                 {item.id}
//                                             </Text>
//                                             <Text
//                                                 style={{
//                                                     marginTop: 5,
//                                                     fontSize: 20,
//                                                     fontFamily: 'Poppins_300Light',
//                                                     color: '#C4C4C4'
//                                                 }}>
//                                                 {item.date}
//                                             </Text>
//                                         </View>

//                                     </View>
//                                     <View
//                                         style={{
//                                             flexDirection: 'row',
//                                             justifyContent: 'space-between',
//                                             marginBottom: 2
//                                         }}>
//                                         <Text style={{
//                                             fontSize: 12,
//                                             fontFamily: 'Poppins_500Medium',
//                                         }}>
//                                             {item.categir}
//                                         </Text>
//                                         <Text style={{
//                                             fontSize: 12,
//                                             fontFamily: 'Poppins_500Medium',
//                                         }}>
//                                             {item.stranaa}
//                                         </Text>
//                                     </View>

//                                     {item.data.map((res, index) => {
//                                         return (
//                                             <View
//                                                 key={index}
//                                                 style={{
//                                                     flexDirection: 'row',
//                                                     justifyContent: 'space-between',
//                                                     alignItems: 'center',
//                                                 }}>
//                                                 <Text style={{
//                                                     fontSize: 18,
//                                                     fontFamily: 'Poppins_400Regular',
//                                                 }}>
//                                                     {res.name}
//                                                 </Text>
//                                                 <Text style={{
//                                                     fontSize: 14,
//                                                     fontFamily: 'Poppins_300Light',
//                                                 }}>
//                                                     {res.number}
//                                                 </Text>
//                                             </View>
//                                         )
//                                     })}
//                                     <View style={{ width: '100%', borderWidth: 1, borderColor: '#EBEBEB', marginVertical: 5 }}></View>
//                                     {item.comp.map((res, index) => {
//                                         return (
//                                             <View
//                                                 key={index}
//                                                 style={{
//                                                     flexDirection: 'row',
//                                                     justifyContent: 'space-between',
//                                                     alignItems: 'flex-end',
//                                                 }}>
//                                                 <Text style={{
//                                                     fontSize: 18,
//                                                     fontFamily: 'Poppins_600SemiBold',
//                                                 }}>
//                                                     {res.name}
//                                                 </Text>
//                                                 <Text style={{
//                                                     fontSize: 17,
//                                                     fontFamily: 'Poppins_300Light',
//                                                 }}>
//                                                     {res.rubli}
//                                                 </Text>
//                                             </View>
//                                         )
//                                     })}

//                                 </View>
//                             )
//                         })

//                         }
//                         {/*  {this.state.data.map((res, index) => {
//                         return (
//                             <View
//                                 key={index}
//                                 style={styles.sortMain}
//                             >
//                                 <View style={styles.sorts}>
//                                     <View
//                                         style={{
//                                             flexDirection: 'row',
//                                         }}>
//                                         <Text
//                                             style={{
//                                                 fontSize: 25,
//                                                 fontWeight: '500',
//                                                 marginRight: 14
//                                             }}>
//                                             {index + 1}
//                                         </Text>
//                                         <Text
//                                             style={{
//                                                 marginTop: 11,
//                                             }}>
//                                             {res.created_at}
//                                         </Text>
//                                     </View>
//                                 </View>
//                                 <View>

//                                 </View>
//                                 <View>
//                                 <Text>{res.designer_name}</Text>
//                                 <Text>{res.designer_surname}</Text>
//                                 <Text>{res.book_proizvoditel[0].price}</Text>
//                                 </View>
//                                 </View>
//                                 )

//                     })}*/}

//                     </ScrollView>
//                 </View>
//                 <CustomerMainPageNavComponent active_page={'Брони'} navigation={this.props.navigation} />
//             </SafeAreaView>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     main: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingHorizontal: 15,
//     },
//     sortMain: {
//         width: '100%',
//         borderWidth: 3,
//         marginBottom: 15,
//         borderColor: '#E5E5E5',
//         borderRadius: 10,
//         padding: 10,
//     },
//     sorts: {
//         width: '100%',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     }
// })
