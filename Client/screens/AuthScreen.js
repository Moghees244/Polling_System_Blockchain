import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ColorPallete from "../constants/ColorPallete";
import { MaterialIcons } from '@expo/vector-icons';
import { useContext } from "react";
import { AuthContext } from "../context/ContextApi";


export default function AuthScreen() {
  const {currentUserHandler, currentUser}=useContext(AuthContext)

    const handlerSignIn = ()=>{
        // Api call to sign in

        console.log('first')

        currentUserHandler(
            {
                id:1,
                name:"John Doe",
                votedPolls:[]
            }
        )
    }
  return (
    <>
        {
            !currentUser &&
            <View style={styles.container}>
                <View style={{alignItems:'center', marginBottom:-8}}>
                    <View style={{width:40, height:8, backgroundColor:ColorPallete.themeColor, borderRadius:100}}></View>
                </View>

                <View style={styles.middle}>
                    <View style={{marginLeft:-12, marginBottom:8}}>
                        <MaterialIcons name="poll" size={80} color={ColorPallete.themeColor} />
                    </View>
                    <Text style={{marginBottom:8, color:ColorPallete.textColor, fontSize:48, fontWeight:'bold'}}>It's time{'\n'}to make{'\n'}a <Text style={{color:ColorPallete.themeColor}}>VOTE!</Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:16, color:ColorPallete.textColor}}>Welcome to <Text style={{color:ColorPallete.themeColor, fontWeight:'bold'}}>Decentralized Voting</Text>.</Text>
                </View>

                <Pressable style={styles.lower} onPress={handlerSignIn}>
                    <Text style={{fontWeight:'bold', color:ColorPallete.textColor, marginRight:8}}>Continue with <Text style={{color:ColorPallete.bgColor}}>Metamask</Text></Text>
                    <Image source={require('../assets/images/metamask-logo.png')} style={{width:32, height:32}} />
                </Pressable>

            </View>
        }
    </>
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
        paddingVertical:10,
        backgroundColor:ColorPallete.themeColor,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    }
})
