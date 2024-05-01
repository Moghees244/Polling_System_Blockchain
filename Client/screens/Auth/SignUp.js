import React, { useContext, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/ContextApi';


export default function SignUp({navigation}) {
    const {currentUser, currentUserHandler}=useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const emailHandler = (text)=>{
        setEmail(text)
    }

    const passwordHandler = (text)=>{
        setPassword(text)
    }

    const nameHandler = (text)=>{
        setName(text)
    }

    const handlerSignUp = ()=>{

        if (email==='' || password==='' || name==='') return alert('Please fill all the fields.')

        // API call to sign in


        console.log(email, password, name)
        currentUserHandler(
            {
                id:1,
                name:"John Doe",
                email:email,
                votedPolls:[]
            }
        )
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
            <Text style={{marginBottom:24, color:ColorPallete.textColor, fontSize:48, fontWeight:'bold'}}><Text style={{color:ColorPallete.textColor}}>Sign Up</Text></Text>
            
            
            <View>
                <Text style={{color:ColorPallete.themeColor, fontWeight:'bold', marginBottom:8}}>Name</Text>
                <TextInput value={name} onChangeText={nameHandler} placeholderTextColor={ColorPallete.themeColor} style={{fontSize:16, backgroundColor:ColorPallete.themeColorTwo, padding:18, borderRadius:8, marginBottom:8, color:ColorPallete.textColor}} placeholder=""  />
            </View>
            <View>
                <Text style={{color:ColorPallete.themeColor, fontWeight:'bold', marginBottom:8}}>Email</Text>
                <TextInput value={email} onChangeText={emailHandler} placeholderTextColor={ColorPallete.themeColor} style={{fontSize:16, backgroundColor:ColorPallete.themeColorTwo, padding:18, borderRadius:8, marginBottom:8, color:ColorPallete.textColor}} placeholder=""  />
            </View>
            <View>
                <Text style={{color:ColorPallete.themeColor, fontWeight:'bold',}}>Password</Text>
                <TextInput value={password} onChangeText={passwordHandler} placeholderTextColor={ColorPallete.themeColor} style={{fontSize:16, backgroundColor:ColorPallete.themeColorTwo, padding:18, borderRadius:8, marginBottom:8, color:ColorPallete.textColor}} placeholder=""  />
            </View>


            <Pressable onPress={()=>{navigation.goBack()}} style={{marginVertical:8, marginTop:16,}}>
                <Text style={{color:ColorPallete.textColor}}>Already have an Account? <Text style={{color:ColorPallete.themeColor}}>SignIn.</Text></Text>
            </Pressable>

            <Pressable style={styles.lower} onPress={handlerSignUp}>
                <Text style={{fontWeight:'bold', color:ColorPallete.textColor}}>Sign Up</Text>
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
