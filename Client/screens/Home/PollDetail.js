import React, { isValidElement, useContext, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/ContextApi';

export default function PollDetail({navigation, route}) {
    const {pollingData, currentUser, currentUserHandler, modifyPollingData}=useContext(AuthContext)
    const [selected, setSelected] = useState(null)

    const pollData = route.params.pollData
    const alreadyVoted = currentUser.votedPolls.find((poll)=>poll.pollId==pollData.id)
    
    const handleNavigation = ()=>{
        navigation.goBack()
    }
    
    const handleVote = ()=>{
        // Api call to vote


        if(selected==null)
            return
        
        const voteData= {
            pollId:pollData.id,
            candidateId:selected
        }
        currentUserHandler(
            {
                ...currentUser,
                votedPolls:[...currentUser.votedPolls, voteData]
            }
        )

        let temp = pollingData
        temp.forEach((poll)=>{
            if(poll.id==pollData.id){
                poll.candidatesList.forEach((candidate)=>{
                    if(candidate.id==selected){
                        candidate.votes++
                    }
                }
                )
            }
        }
        )
        modifyPollingData(temp)



        // navigation.goBack()
    }
    
    
    let count=0
    const renderCandidatesList = (itemData)=>{
        
        const handleSelection = ()=>{
            if (alreadyVoted)
                return

            setSelected(itemData.item.id)
        }
        
        let isSelected=selected==itemData.item.id || currentUser.votedPolls.find((poll)=>poll.pollId==pollData.id && poll.candidateId==itemData.item.id)
        
        count++
        return(
            <Pressable onPress={handleSelection} style={[{flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:ColorPallete.themeColorTwo, marginBottom:10, borderRadius:16, padding:16}, isSelected && styles.selected]}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontSize:14, color:ColorPallete.textColor, margin:8}}>{count}.</Text>
                    <Text style={{fontWeight:'bold', fontSize:20, color:ColorPallete.textColor}}>{itemData.item.name}</Text>
                </View>
                <View style={{flexDirection:"row", alignItems:'center'}}>
                    <MaterialIcons name="poll" size={24} color={ColorPallete.textColor}/>
                    <Text style={{fontSize:16, fontWeight:'bold', color:ColorPallete.textColor, marginLeft:4}}>{itemData.item.votes}</Text>
                </View>
            </Pressable>
        )
    }

    const headerComponents =()=>{
        return(
            <View>
                <Pressable onPress={handleNavigation} style={{flexDirection:"row", alignItems:'center', marginBottom:16, marginLeft:-10}}>
                    <MaterialIcons name="chevron-left" size={28} color={ColorPallete.themeColor} />
                    <Text style={{color:ColorPallete.themeColor, fontWeight:'bold', fontSize:16}}>Back</Text>
                </Pressable>

                <View>
                    <Text style={{fontSize:32, fontWeight:'bold', color:ColorPallete.themeColor, marginBottom:8}}>{pollData.title}</Text>
                    <Text style={{fontSize:14, color:ColorPallete.textColor, marginBottom:16}}>Placing a vote is an immutable process and will not be undo in any case.</Text>
                    <Text style={{fontSize:16, fontWeight:'bold', color:ColorPallete.textColor, marginBottom:16}}>Select Candidate <Text style={{color:ColorPallete.themeColor}}>({pollData.candidatesList.length})</Text></Text>
                </View>
            </View>
        )
    }

    const footerComponents =()=>{
        return(
            <>
                {
                    !alreadyVoted &&
                    <Pressable onPress={handleVote} style={{marginTop:12, padding:16, borderRadius:8, alignItems:'center', justifyContent:'center', backgroundColor:ColorPallete.themeColor}}>
                        <Text style={{color:ColorPallete.textColor, fontWeight:'bold', fontSize:16}}>Vote</Text>
                    </Pressable>
                }
            </>
        )
    }

  return (
    <View style={styles.container}>

        <FlatList
            data={pollData.candidatesList}
            renderItem={renderCandidatesList}
            keyExtractor={(item)=>item.id}
            showsVerticalScrollIndicator={false}

            ListHeaderComponent={headerComponents}
            ListFooterComponent={footerComponents}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:64,
        backgroundColor:ColorPallete.bgColor
    },
    selected:{
        borderWidth:2, 
        borderColor:ColorPallete.themeColor,
        padding:14
    }
})
