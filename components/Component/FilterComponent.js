
import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, ScrollView, StyleSheet, Pressable, Platform } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { Modal } from "react-native";
import { APP_URL, APP_IMAGE_URL } from "@env"


export default class FilterComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: true,
      view1: [
        { companyLogo: require('../../assets/image/category2.png'), category_name: 'Кухни', filterName: 'Кухни', size: 10, lineHeight: 12.9, id: 1 },
        { companyLogo: require('../../assets/image/category1.png'), category_name: 'Прихожие', filterName: 'Прихожие', size: 10, lineHeight: 12.9, id: 2 },
        { companyLogo: require('../../assets/image/category3.png'), category_name: 'Мебель для ванной', filterName: 'Мебель для\nванной', size: 7, lineHeight: 9.03, id: 3 },
        { companyLogo: require('../../assets/image/category7.png'), category_name: 'Мебель для спальни', filterName: 'Мебель для\nспальни', size: 7, lineHeight: 9.03, id: 4 },
        { companyLogo: require('../../assets/image/category5.png'), category_name: 'Гардеробные', filterName: 'Гардеробные', size: 8, lineHeight: 10.32, id: 5 },
        { companyLogo: require('../../assets/image/category9.png'), category_name: 'Гостиные', filterName: 'Гостиные', size: 10, lineHeight: 12.9, id: 6 },
        { companyLogo: require('../../assets/image/category6.png'), category_name: 'Детские', filterName: 'Детские', size: 10, lineHeight: 12.9, id: 7 },
        { companyLogo: require('../../assets/image/category8.png'), category_name: 'Кабинеты', filterName: 'Кабинеты', size: 10, lineHeight: 12.9, id: 8 },
        { companyLogo: require('../../assets/image/category4.png'), category_name: 'Межкомнатные перегородки', filterName: 'Межкомнатные\nперегородки', size: 7, lineHeight: 9.03, id: 9 },
      ],
      view2: [
        { companyLogo: require('../../assets/image/category10.png'), category_name: 'Островные павильоны', filterName: 'Островные\nпавильоны', size: 8, lineHeight: 9.03, id: 10 },
        { companyLogo: require('../../assets/image/category12.png'), category_name: 'Зоны ресепшн', filterName: 'Зоны\nресепшн', size: 8, lineHeight: 9.03, id: 11 },
        { companyLogo: require('../../assets/image/category11.png'), category_name: 'Выставочные стенды', filterName: 'Выставочные\nстенды', size: 8, lineHeight: 9.03, id: 12 },
      ],
      rubli: [
        { icon: require('../../assets/image/rubli1.png'), checked: false, size: 32, id: 1 },
        { icon: require('../../assets/image/rubli2.png'), checked: false, size: 41, id: 2 },
        { icon: require('../../assets/image/rubli3.png'), checked: false, size: 52, id: 3 },
        { icon: require('../../assets/image/rubli4.png'), checked: false, size: 64, id: 4 }
      ],

      sOpenCityDropDown: false,
      rubliActive: null,
      strana: 0,




      meshok: [],
      category_name: [],
      city_name: '',
      made_in: [],
      show_room: '',

      made_in_array: [],
      city_name_array: []
    }
  }

  enterCheckBox = (id, name) => {
    let filterSort = this.state.category_name;
    let find = false

    filterSort.find((item) => {
      if (item == name) {
        find = true
      }
    })

    if (find) {
      const index = filterSort.indexOf(name);
      filterSort.splice(index, 1);
    }
    else {
      filterSort.push(name)
    }
    this.setState({ category_name: filterSort })
  }

  verifyCheckBox = (id, name) => {
    let filterSort = this.state.category_name
    let find = false
    filterSort.find((item) => {
      if (item == name) {
        find = true
      }
    })
    return find
  }


  getCountry = async () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch(`${APP_URL}GetCountry`, requestOptions)
      .then(response => response.json())
      .then(result => {

        let made_in_array = [];

        result.country.forEach((item) => {
          made_in_array.push({
            made_in_name: item.made_in,
            checked: false
          })
        })

        this.setState({
          made_in_array: made_in_array,
          city_name_array: result.city_of_sales
        })
      })
      .catch(error => console.log('error', error));
  }



  getFilterData = async () => {



    let { meshok, category_name, made_in_array, city_name, show_room } = this.state;


    let made_in_result = [];

    made_in_array.forEach((item, index) => {

      if (item.checked) {
        made_in_result.push(item.made_in_name)
      }
    })


    let meshok_new = [];

    meshok.forEach((item, index) => {
      if (item.checked) {
        meshok_new.push(item.id)
      }
    })

    let filter_data = {
      meshok: meshok_new.join(','),
      category_name: category_name,
      made_in_result: made_in_result,
      city_name: city_name,
      show_room: show_room,
    };

    this.props.handler(filter_data);


  }





  componentDidMount() {
    this.getCountry()
  }

  setMeshokInChecked = async (checked_index) => {
    let { rubli } = this.state;

    rubli.forEach((item, index) => {
      if (index == checked_index) {
        item.checked = !item.checked
      }
    })

    this.setState({
      meshok: rubli
    })

  };


  setMadeInChecked = async (checked_index) => {
    let { made_in_array } = this.state;

    made_in_array.forEach((item, index) => {
      if (index == checked_index) {
        made_in_array[index].checked = !made_in_array[index].checked
      }
    })

    this.setState({
      made_in_array: made_in_array
    })

  };


  render() {
    return (
      <Modal
        visible={this.state.filter}
        transparent={true}
      >

        <View style={styles.modalWindow}>
          <View style={[styles.filterIX, Platform.OS == 'ios' ? { marginTop: 20 } : '']}>
            <Text style={{ fontSize: 26, color: "#333333", fontFamily: 'Poppins_500Medium', }}>Фильтр</Text>
            <Pressable onPress={() => { this.props.resetFilterData() }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1.02374 2.35124C0.936579 2.26408 0.867436 2.1606 0.820263 2.04671C0.77309 1.93283 0.74881 1.81076 0.74881 1.68749C0.74881 1.56422 0.77309 1.44216 0.820263 1.32828C0.867436 1.21439 0.936579 1.11091 1.02374 1.02374C1.11091 0.936579 1.21439 0.867436 1.32828 0.820263C1.44216 0.77309 1.56422 0.74881 1.68749 0.74881C1.81076 0.74881 1.93283 0.77309 2.04671 0.820263C2.1606 0.867436 2.26408 0.936579 2.35124 1.02374L12 10.6744L21.6487 1.02374C21.7359 0.936579 21.8394 0.867436 21.9533 0.820263C22.0672 0.77309 22.1892 0.74881 22.3125 0.74881C22.4358 0.74881 22.5578 0.77309 22.6717 0.820263C22.7856 0.867436 22.8891 0.936579 22.9762 1.02374C23.0634 1.11091 23.1326 1.21439 23.1797 1.32828C23.2269 1.44216 23.2512 1.56422 23.2512 1.68749C23.2512 1.81076 23.2269 1.93283 23.1797 2.04671C23.1326 2.1606 23.0634 2.26408 22.9762 2.35124L13.3256 12L22.9762 21.6487C23.0634 21.7359 23.1326 21.8394 23.1797 21.9533C23.2269 22.0672 23.2512 22.1892 23.2512 22.3125C23.2512 22.4358 23.2269 22.5578 23.1797 22.6717C23.1326 22.7856 23.0634 22.8891 22.9762 22.9762C22.8891 23.0634 22.7856 23.1326 22.6717 23.1797C22.5578 23.2269 22.4358 23.2512 22.3125 23.2512C22.1892 23.2512 22.0672 23.2269 21.9533 23.1797C21.8394 23.1326 21.7359 23.0634 21.6487 22.9762L12 13.3256L2.35124 22.9762C2.26408 23.0634 2.1606 23.1326 2.04671 23.1797C1.93283 23.2269 1.81076 23.2512 1.68749 23.2512C1.56422 23.2512 1.44216 23.2269 1.32828 23.1797C1.21439 23.1326 1.11091 23.0634 1.02374 22.9762C0.936579 22.8891 0.867436 22.7856 0.820263 22.6717C0.77309 22.5578 0.74881 22.4358 0.74881 22.3125C0.74881 22.1892 0.77309 22.0672 0.820263 21.9533C0.867436 21.8394 0.936579 21.7359 1.02374 21.6487L10.6744 12L1.02374 2.35124Z" fill="#333333" />
              </Svg>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.firstFilter}>
              <Text style={{ fontSize: 20, color: "#888888", fontFamily: 'Raleway_500Medium', }}>Ценовая категория</Text>
              <View style={{ flexDirection: 'row', }}>


                {
                  this.state.rubli.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={async () => {
                          await this.setMeshokInChecked(index);

                        }}
                        key={item.id}
                        style={item.checked ? styles.rubliActive : styles.rubli}>
                        <Image
                          source={item.icon}
                          style={{ width: item.size, height: 17 }}
                        // resizeMode="center"
                        />


                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>




            <View style={styles.twoFilter}>
              <Text style={{ fontSize: 20, color: "#888888", fontFamily: 'Raleway_500Medium' }}>Категории</Text>
              <View style={{ height: 205 }}>
                <ScrollView
                  style={{
                    width: '100%'
                  }}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',

                      }}>
                      {
                        this.state.view1.map((item, index) => {
                          return (

                            <View
                              key={index}
                              style={{
                                paddingTop: 14,
                                alignContent: 'center',
                                width: '25%',

                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.enterCheckBox(item.id, item.category_name)
                                }}
                                style={{
                                  width: '90%',
                                }}>
                                <Image
                                  source={item.companyLogo}
                                  style={{
                                    width: 47,
                                    height: 45,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                  }} />
                                {
                                  this.verifyCheckBox(item.id, item.category_name) === false &&
                                  <View
                                    style={{
                                      height: 20,
                                      marginTop: 6,
                                      width: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: item.size,
                                        color: "#888888",
                                        textAlign: "center",
                                        fontFamily: 'Poppins_400Regular',
                                        lineHeight: item.lineHeight
                                      }}>
                                      {item.filterName}
                                    </Text>
                                  </View>
                                }
                                {
                                  this.verifyCheckBox(item.id, item.category_name) === true &&
                                  <View
                                    style={{
                                      backgroundColor: '#52A8EF',
                                      height: 20,
                                      borderRadius: 10,
                                      marginTop: 6,
                                      width: '100%',
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: item.size,
                                        color: "#fff",
                                        textAlign: "center",
                                        fontFamily: 'Poppins_400Regular',
                                        lineHeight: item.lineHeight,
                                      }}>
                                      {item.filterName}
                                    </Text>
                                  </View>
                                }
                              </TouchableOpacity>
                            </View>
                          )
                        })
                      }
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        flexWrap: 'wrap',
                        borderTopWidth: 1,
                        borderColor: '#F5F5F5',
                        marginTop: 14,
                        position: "relative",
                      }}>
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: 8,
                          top: -6,
                          left: '40%',
                          color: '#C6C6C6',
                          backgroundColor: '#fff',
                          fontFamily: 'Poppins_400Regular'
                        }}>
                        Коммерческая
                      </Text>

                      {
                        this.state.view2.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                paddingTop: 14,
                                alignContent: 'center',
                                width: '23%',
                                marginRight: '2%',
                                justifyContent: 'flex-start',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.enterCheckBox(item.id, item.category_name)
                                }}
                                style={{
                                  width: '100%',
                                }}>
                                <Image
                                  source={item.companyLogo}
                                  style={{
                                    width: 47,
                                    height: 45,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                  }} />
                                {
                                  this.verifyCheckBox(item.id, item.category_name) === false &&
                                  <View
                                    style={{
                                      height: 20,
                                      marginTop: 6,
                                      width: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: item.size,
                                        color: "#888888",
                                        textAlign: "center",
                                        fontFamily: 'Poppins_400Regular',
                                        lineHeight: item.lineHeight,
                                      }}>
                                      {item.filterName}
                                    </Text>
                                  </View>
                                }
                                {
                                  this.verifyCheckBox(item.id, item.category_name) === true &&
                                  <View
                                    style={{
                                      backgroundColor: '#52A8EF',
                                      height: 20,
                                      borderRadius: 10,
                                      marginTop: 6,
                                      width: '100%',
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: item.size,
                                        color: "#fff",
                                        textAlign: "center",
                                        fontFamily: 'Poppins_400Regular',
                                        lineHeight: item.lineHeight,
                                      }}>
                                      {item.filterName}
                                    </Text>
                                  </View>
                                }
                              </TouchableOpacity>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                </ScrollView>
              </View >
            </View >




            {/* dropDown  start*/}

            <View style={styles.cityFilter}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#888888',
                  marginBottom: 11,
                  fontFamily: 'Raleway_500Medium'
                }}
              >
                Город
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                  position: 'relative',
                  height: 45,
                  backgroundColor: '#52A8EF',
                  justifyContent: 'center'
                }}
                onPress={() => this.setState({ sOpenCityDropDown: !this.state.sOpenCityDropDown })}
              >
                <Text style={{ color: "#FFFFFF", fontFamily: 'Raleway_600SemiBold', lineHeight: 18 }}>{this.state.city_name == '' ? 'Выберите город' : this.state.city_name}</Text>
                <View style={{ position: 'absolute', right: 17, bottom: 18 }}>
                  {!this.state.sOpenCityDropDown &&
                    <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M1 1L9 9L17 1" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                  }
                  {this.state.sOpenCityDropDown &&
                    <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M1 9L9 1L17 9" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                  }

                </View>
              </TouchableOpacity>
              <View
                style={this.state.sOpenCityDropDown ? styles.sOpenCityDropDownActive : styles.sOpenCityDropDown}>
                <ScrollView nestedScrollEnabled={true} >
                  {
                    this.state.city_name_array.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            textAlign: 'left',
                          }}
                          onPress={() => this.setState({ city_name: item.city_name, sOpenCityDropDown: false })}
                        >
                          <Text style={{ textAlign: 'left', paddingVertical: 10, }}>
                            {item.city_name}
                          </Text>

                        </TouchableOpacity>
                      )

                    })
                  }
                </ScrollView>
              </View>
            </View>

            {/* dropDown end */}



            <View style={styles.stranaFilter}>
              <Text style={{ fontSize: 20, color: "#888888", fontFamily: 'Raleway_500Medium' }}>Страна производства</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', }}>

                  {
                    this.state.made_in_array.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {

                            this.setMadeInChecked(index);

                          }}
                          key={index}
                          style={item.checked ? styles.stranaActive : styles.strana}>

                          <Text style={styles.stranaButton}>
                            {item.made_in_name}
                          </Text>

                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </ScrollView>
            </View>
            <View style={styles.yesNoFilter}>
              <Text style={{ fontSize: 20, color: "#888888", fontFamily: 'Raleway_500Medium' }}>Наличие шоурума</Text>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ show_room: this.state.show_room == 'Да' ? '' : 'Да' })
                  }}
                  style={this.state.show_room == 'Да' ? styles.show_room_active : styles.show_room}>
                  <Text
                    style={styles.stranaButton}>
                    Да
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ show_room: this.state.show_room == 'Нет' ? '' : 'Нет' })
                  }}
                  style={this.state.show_room == 'Нет' ? styles.show_room_active : styles.show_room}>
                  <Text
                    style={styles.stranaButton}>
                    Нет
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginBottom: 56
              }}>
              <TouchableOpacity
                style={{ width: 165, height: 38, backgroundColor: '#B5D8FE', justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}
                onPress={() => {

                  this.getFilterData();
                }}>
                <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'Poppins_500Medium' }}>
                  Применить
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: 165, height: 38, marginTop: 20, backgroundColor: '#B5D8FE', justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}
                onPress={() => {
                  this.props.resetFilterData();
                }}>
                <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'Poppins_500Medium' }}>
                  Сбросить
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View >

      </Modal >
    )
  }
}


const styles = StyleSheet.create({
  modalWindow: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  filterIX: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '5%',
    paddingBottom: '2%',

  },
  firstFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 10

  },
  twoFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 10
  },
  cityFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },

  stranaFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 10
  },
  stranaButton: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Raleway_600SemiBold',
    padding: 0
  },
  yesNoFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 10,
    marginBottom: 60
  },
  sOpenCityDropDown: {
    width: '100%',
    height: 0,
  },
  sOpenCityDropDownActive: {
    width: '100%',
    height: 120,
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff'
  },
  rubli: {
    paddingVertical: 8,
    backgroundColor: "#B5D8FE",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  rubliActive: {
    paddingVertical: 8,
    backgroundColor: "#52A8EF",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  stranaActive: {
    paddingHorizontal: 15,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: "#52A8EF",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  strana: {
    paddingHorizontal: 15,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: "#B5D8FE",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  show_room: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "#B5D8FE",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  show_room_active: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "#52A8EF",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
})