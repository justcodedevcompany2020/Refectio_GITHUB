import React, { Component } from "react";
import { SafeAreaView, View, Image, TouchableOpacity } from "react-native";
import LogoComponent from "../../assets/image/Logo";
import BlueButton from "../Component/Buttons/BlueButton";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
export default class AuthScreenComponent extends Component {
  constructor(props) {
    super(props)
  }

  goToLogin = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  goToRegistered = () => {
    this.props.navigation.navigate('RegisteredScreen')
  }


  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>




        <View
          style={{
            marginTop: 20,
            width: '100%',
            alignItems: 'center',
            position: 'relative',
          }}>
          <LogoComponent />

          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('GhostPage') }}
            style={{
              position: 'absolute',
              left: 15,
            }}>
            <ArrowGrayComponent />
          </TouchableOpacity>

        </View>


        <Image
          source={require('../../assets/image/Logosss.png')}
          style={{
            width: '70%',
            height: '50%',
            resizeMode: 'cover',
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 70,
          }}
        />



        <TouchableOpacity
          onPress={() => { this.goToLogin() }}

        >
          <BlueButton
            name="Войти"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { this.goToRegistered() }}
          style={{ marginTop: 20 }}
        >
          <BlueButton
            name="Зарегистрироваться"
          />
        </TouchableOpacity>



      </SafeAreaView>
    )
  }
}


