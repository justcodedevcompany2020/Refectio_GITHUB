import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Svg, { Path, Rect } from "react-native-svg";
import BlueButton from "../Component/Buttons/BlueButton";
import { APP_URL, APP_IMAGE_URL } from "@env"
import axios from "axios";

export default class ConfirmTelScreenComponent extends Component {
  constructor(props) {
    super(props)

    this.pin1Ref = React.createRef()
    this.pin2Ref = React.createRef()
    this.pin3Ref = React.createRef()
    this.pin4Ref = React.createRef()


    this.state = {
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      modalVisible: false,
      wrongVerificationMessage: false,
      krknrl: false,
      sendAgainTime: 10,
      phone: null,
      phone_veryfi_code: null,

      error_code: false,
      error_code_text: '',
      timerMinut: 1,
      timerSecond: 60,
      timerBool: false,

    };
  }




  sendPhoneCode = async () => {
    let token = this.props.token

    let AuthStr = `Bearer ${token}`;

    const { phone_veryfi_code } = this.state

    let form = new FormData()
    form.append( "phone_veryfi_code", phone_veryfi_code)

  

    let request = {

      method: 'POST',
      headers: {
        "Authorization": AuthStr
      },
      body: form
    };
    await fetch(`${APP_URL}updateveryficode`, request)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {

          this.setState({
            error_code: false,
            modalVisible: true,
            pin1: '',
            pin2: '',
            pin3: '',
            pin4: '',
          })
          
        }
        else if (result.status === false) {

          if (result.hasOwnProperty('message')) {

            if (result.message == 'code required') {
              this.setState({
                error_code: true,
                error_code_text: 'Код обязателен для заполнения!',
                pin1: '',
                pin2: '',
                pin3: '',
                pin4: '',
              })
              this.pin1Ref.current.focus()
            } else if (result.message == 'wrong verification code') {
              this.setState({
                error_code: true,
                error_code_text: 'Не верный код!',
                pin1: '',
                pin2: '',
                pin3: '',
                pin4: '',
              })
              this.pin1Ref.current.focus()
            }
            setTimeout(() => {
              this.setState({
                error_code_text: '',
                error_code: false
              })
            }, 3000)
          }



        }
      })
      .catch(error => console.log('error', error));
  }

  goToCustomerPage = async () => {

    clearInterval(this.interval);
    await this.setState({
      timerMinut: 1,
      timerBool: true,
      timerSecond: 60,
      modalVisible: false
    })

    this.props.navigation.navigate('CustomerMyAccaunt');
  }

  printTimer = () => {

    let timeer_second = this.state.timerSecond;
    let timer_minute = this.state.timerMinut;
    let time_result = '';

    if (timer_minute == 0) {
      time_result = '00:';

      let sec = '';
      if (timeer_second > 0 && timeer_second < 10) {
        sec = '0' + timeer_second
      } else if (timeer_second > 10) {
        sec = timeer_second
      }

      time_result = time_result + sec;

    } else {

      time_result = '01:00';

    }

    return time_result;

  }

  timer = () => {

    this.interval = setInterval(() => {

      if (this.state.timerSecond == 0) {

        clearInterval(this.interval);

        this.setState({
          timerMinut: 1,
          timerBool: true,
          timerSecond: 60
        })

        console.log('STOP')

        return false;
      }

      this.setState({
        timerMinut: 0,
        timerSecond: this.state.timerSecond - 1
      })

    }, 1000)
  }

  updateCodeSend = async () => {
    if (this.state.timerBool == true) {
      let token = this.props.token
      let AuthStr = "Bearer " + token;
console.log(token);
      let requestOptions = {
        url: `${APP_URL}sendCallUser`,
        method: 'POST',
        headers: { "Authorization": AuthStr },
      };

      await axios(requestOptions)
        .then(result => {

          result = result.data
          if (result.status) {

            this.setState({
              timerBool: false
            })

            clearInterval(this.interval)
            this.timer()

          }

        })
    }
  }


  componentDidMount() {

    const { navigation } = this.props

    clearInterval(this.interval);

    // this.callToPhone()
    console.log(this.props);

    this.focusListener = navigation.addListener("focus", () => {

      this.callToPhone()

      clearInterval(this.interval);
      this.timer()


    });
  }

  goToBack = async () => {
    clearInterval(this.interval);
    await this.setState({
      timerMinut: 1,
      timerBool: true,
      timerSecond: 60,
      modalVisible: false
    })
    this.props.navigation.navigate('RegisteredScreen')
  }





  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener) {
      this.focusListener();
      console.log(' END')
    }
  }




  callToPhone = async () => {
    let token = this.props.token
    let AuthStr = "Bearer " + token;
console.log(token);
    let requestOptions = {
      method: 'POST',
      url: `${APP_URL}sendCallUser`,
      headers: { "Authorization": AuthStr },
    };



    await axios(requestOptions)
      .then(result => {
        console.log(result.data, 'zangggggg');
      })
      .catch(error => console.log('error', error));



  }


  
  render() {
    const { pin1, pin2, pin3, pin4, } = this.state
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <Modal
            visible={this.state.modalVisible}>
            <View style={styles.modalVisible}>
              <View
                style={{
                  marginTop: 174,

                }}>
                <Svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5C20.67 5 5 20.67 5 40C5 59.33 20.67 75 40 75Z" fill="#B5D8FE" />
                  <Path d="M57.6667 24.3333L35 47L25.6667 37.6667L21 42.3333L35 56.3333L62.3333 29L57.6667 24.3333Z" fill="white" />
                </Svg>
              </View>
              <Text
                style={{
                  color: '#2D9EFB',
                  textAlign: 'center',
                  fontSize: 25,
                  marginTop: 27,
                  fontFamily: 'Poppins_500Medium'
                }}>
                Вы успешно{'\n'}зарегистрировались
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 170
                }}
                onPress={async () => {
                  await this.props.navigation.navigate('LoginScreen')
                  await this.setState({ modalVisible: false })
                }}>
                <BlueButton name="Войти" />
              </TouchableOpacity>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => { this.goToBack() }}
            style={{
              position: 'absolute',
              top: 18.29,
              left: 15,
            }}>
            <ArrowGrayComponent />
          </TouchableOpacity>



          <View
            style={{
              marginTop: 86
            }}>
            <Text
              style={{
                fontSize: 26,
                color: '#2D9EFB',
                fontFamily: 'Poppins_500Medium'
              }}>
              Подтверждение {'\n'}Тел. Номера
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: '#52A8EF',
                marginTop: 25,
                lineHeight: 17.61,
                fontFamily: 'Poppins_400Regular'
              }}>
              На ваш номер осуществлён звонок.
              Пожалуйста, введите последние 4 цифры.
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 16,
                color: '#2D9EFB',
                fontSize: 15,
                fontFamily: 'Raleway_500Medium'
              }}>
              {this.printTimer()}
            </Text>
          </View>

          <View style={styles.confirmView}>
            <TextInput
              ref={this.pin1Ref}
              value={pin1}
              style={styles.textInput}
              keyboardType="phone-pad"
              onChangeText={(pin1) => {
                this.setState({ pin1 })
                if (pin1.length) {
                  this.pin2Ref.current.focus()
                } else {
                  this.pin1Ref.current.blur()
                }
              }
              }
              maxLength={1}
            />
            <TextInput
              ref={this.pin2Ref}
              value={pin2}
              style={styles.textInput}
              keyboardType="phone-pad"
              onChangeText={(pin2) => {
                this.setState({ pin2 })
                if (pin2.length) {
                  this.pin3Ref.current.focus()
                } else {
                  this.pin1Ref.current.focus()
                }
              }
              }
              maxLength={1}
            />
            <TextInput
              ref={this.pin3Ref}
              value={pin3}
              style={styles.textInput}
              keyboardType="phone-pad"
              onChangeText={(pin3) => {
                this.setState({ pin3 })
                if (pin3.length) {
                  this.pin4Ref.current.focus()
                } else {
                  this.pin2Ref.current.focus()
                }
              }
              }
              maxLength={1}
            />
            <TextInput
              ref={this.pin4Ref}

              value={pin4}
              style={styles.textInput}
              keyboardType="phone-pad"
              onChangeText={(pin4) => {
                this.setState({ pin4 })
                if (pin4.length) {
                  this.pin4Ref.current.focus()
                } else {
                  this.pin3Ref.current.focus()
                }
              }
              }
              maxLength={1}
            />

          </View>
          <TouchableOpacity onPress={() => {
            this.updateCodeSend()
          }}>
            <Text
              style={{
                fontSize: 14,
                marginTop: 8,
                textAlign: 'center',
                color: '#B5D8FE',
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: '#B5D8FE',
                fontFamily: 'Raleway_500Medium'
              }}>
              Отправить код повторно
            </Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              marginTop: 36
            }}>
            <TouchableOpacity
              onPress={async () => {
                await this.setState({
                  phone_veryfi_code: pin1 + pin2 + pin3 + pin4
                })
                this.sendPhoneCode()
              }}
            >
              <BlueButton name="Подтвердить" />
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: 50,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 18,
    borderColor: '#F5F5F5',
    borderWidth: 2,
  },
  confirmView: {
    marginHorizontal: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  modalVisible: {
    flex: 1,
    alignItems: 'center',
  }
})