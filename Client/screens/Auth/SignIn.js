import React, { useContext, useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/ContextApi';
import { signIn, viewPolls } from '../../util/ApiFetches';


export default function SignIn({navigation}) {
    const {currentUser, currentUserHandler, tokenHandler, modifyPollingData}=useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailHandler = (text)=>{
        setEmail(text)
    }

    const passwordHandler = (text)=>{
        setPassword(text)
    }

    const handlerSignIn = async ()=>{

        if (email==='' || password==='') return alert('Please fill all the fields.')

        // API call to sign in

        const response = await signIn(email, password)
        currentUserHandler(response)
        tokenHandler(response.token)
        console.log(response)

        const tempPollsData = await viewPolls(response.token)
        modifyPollingData(tempPollsData)
        console.log(tempPollsData.length)
    }

  return (
    <ScrollView contentContainerStyle={{flex:1}} automaticallyAdjustKeyboardInsets={true}>
    <View style={styles.container}>
        <View style={{alignItems:'center', marginBottom:-8}}>
            <View style={{width:40, height:8, backgroundColor:ColorPallete.themeColor, borderRadius:100}}></View>
        </View>

        <View style={styles.middle}>
            <View style={{marginLeft:-12, marginBottom:8}}>
                <MaterialIcons name="poll" size={80} color={ColorPallete.themeColor} />
            </View>
            <Text style={{marginBottom:24, color:ColorPallete.textColor, fontSize:48, fontWeight:'bold'}}><Text style={{color:ColorPallete.textColor}}>Sign In</Text></Text>
            
            
            <View>
                <Text style={{color:ColorPallete.themeColor, fontWeight:'bold', marginBottom:8}}>Email</Text>
                <TextInput inputMode='email' value={email} onChangeText={emailHandler} placeholderTextColor={ColorPallete.themeColor} style={{fontSize:16, backgroundColor:ColorPallete.themeColorTwo, padding:18, borderRadius:8, marginBottom:8, color:ColorPallete.textColor}} placeholder=""  />
            </View>
            <View>
                <Text style={{color:ColorPallete.themeColor, fontWeight:'bold', marginBottom:8}}>Password</Text>
                <TextInput secureTextEntry={true} value={password} onChangeText={passwordHandler} placeholderTextColor={ColorPallete.themeColor} style={{fontSize:16, backgroundColor:ColorPallete.themeColorTwo, padding:18, borderRadius:8, marginBottom:8, color:ColorPallete.textColor}} placeholder=""  />
            </View>

            <Pressable onPress={()=>{navigation.navigate('SignUp')}} style={{marginVertical:8, marginTop:16,}}>
                <Text style={{color:ColorPallete.textColor}}>Don't have an Account? <Text style={{color:ColorPallete.themeColor}}>Register.</Text></Text>
            </Pressable>

            <Pressable style={styles.lower} onPress={handlerSignIn}>
                <Text style={{fontWeight:'bold', color:ColorPallete.textColor}}>Sign In</Text>
            </Pressable>
        </View>
        <View></View>

    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        padding:16,
        paddingTop:64,
        paddingBottom:48,
        backgroundColor:ColorPallete.bgColor
    },
    upper:{

    },
    middle:{

    },
    lower:{
        padding:16,
        paddingVertical:18,
        backgroundColor:ColorPallete.themeColor,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:8
    }
})
