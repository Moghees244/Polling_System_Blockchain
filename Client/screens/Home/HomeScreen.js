import React, { useContext } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../context/ContextApi'
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from '../../constants/ColorPallete';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({navigation}) {

    const {pollingData} = useContext(AuthContext)

    const handleNavigation = (pollData)=>{
        navigation.navigate('PollDetail', {pollData})
    }

    const renderPollingCards = (itemData)=>{

        return (
            <Pressable onPress={()=>handleNavigation(itemData.item)} style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:ColorPallete.themeColorTwo, marginBottom:16, borderRadius:16, padding:16}}>
                <View>
                    <Text style={{marginBottom:16, color:ColorPallete.themeColor, fontWeight:'bold', fontSize:20}}>{itemData.item.title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginRight:12}}>
                            <MaterialIcons name="person" style={{ marginRight:4}} size={20} color={ColorPallete.textColor} />
                            <Text style={{fontWeight:'bold', fontSize:14, color:ColorPallete.textColor}}>{itemData.item.candidatesList.length}</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:'center'}}>
                            <MaterialIcons name="calendar-today" style={{ marginRight:4}} size={18} color={ColorPallete.textColor} />
                            <Text style={{fontWeight:'bold', color:ColorPallete.textColor, fontSize:14}}>{itemData.item.date}</Text>
                        </View>
                    </View>
                </View>
                <MaterialIcons name="chevron-right" size={28} color={ColorPallete.themeColor} />
                
            </Pressable>
        )
    }

    const header=()=>(
        <View style={{marginBottom:16, flexDirection:'row', justifyContent:'space-between', alignItems:"center"}}>
            <Text style={{color:ColorPallete.textColor, fontWeight:'bold', fontSize:16}}>Active Polls</Text>
            <Pressable style={{backgroundColor:ColorPallete.themeColor, borderRadius:100, padding:10}}>
                {/* <MaterialIcons name="person" size={24} color={ColorPallete.bgColor} /> */}
                <Image source={require('../../assets/images/metamask-logo.png')} style={{width:20, height:20}} />
            </Pressable>
        </View>
    )

  return (
    <View style={styles.container}>
        
        {
            pollingData.length == 0 ?
            <>
                {header()}
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <MaterialCommunityIcons name="timer-sand-empty" style={{marginBottom:16}} size={32} color={ColorPallete.themeColor} />
                    <Text style={{color:ColorPallete.textColor}}>No active polls.</Text>
                </View>
            </>
            :
            <FlatList 
                data={pollingData}
                renderItem={renderPollingCards}
                keyExtractor={(item)=>item.id}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={header}
            />

        }


    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:64,
        paddingHorizontal:16,
        backgroundColor:ColorPallete.bgColor
    }
})