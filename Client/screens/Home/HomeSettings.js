import React, { useContext } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../context/ContextApi'
import ColorPallete from '../../constants/ColorPallete'
import { MaterialIcons } from '@expo/vector-icons';


export default function HomeSettings() {
    const {currentUserHandler, currentUser} = useContext(AuthContext)

    const signOutHandler = ()=>{
        // Api call to sign out

        currentUserHandler(null)
    }


  return (
    <View style={styles.container}>
        <View style={{alignItems:"center", marginBottom:16}}>
            <View style={{backgroundColor:ColorPallete.themeColorTwo, padding:20, borderRadius:100, marginBottom:16}}>
                <Image source={require('../../assets/images/metamask-logo.png')} style={{width:50, height:50}} />
            </View>
            <Text style={{color:ColorPallete.textColor, fontWeight:'bold', fontSize:20, marginBottom:4}}>{currentUser.voterName}</Text>
            <Text style={{color:ColorPallete.textColor, fontSize:14}}>{currentUser.voterEmail}</Text>
        </View>

        <Pressable onPress={signOutHandler} style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', backgroundColor:ColorPallete.themeColorTwo, padding:16, paddingVertical:12, borderRadius:8}}>
            <Text style={{color:'red'}}>Logout</Text>
            <MaterialIcons name="chevron-right" size={28} color='red' />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:64,
        paddingHorizontal:16,
        backgroundColor:ColorPallete.bgColor,
        // justifyContent:'space-between'

    }
})
