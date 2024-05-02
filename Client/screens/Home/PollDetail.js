import React, { useContext, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/ContextApi';
import * as LocalAuthentication from 'expo-local-authentication';
import { vote } from '../../util/ApiFetches';

export default function PollDetail({navigation, route}) {
    const {token, pollingData, currentUser, currentUserHandler, modifyPollingData} = useContext(AuthContext);
    const [selected, setSelected] = useState(null);

    const pollData = route.params.pollData;
    const options = Object.entries(pollData.options);
    const alreadyVoted = currentUser.UserVotes.find((vote) => vote.poll == pollData.id);

    const handleNavigation = () => {
        navigation.goBack();
    };

    const handleVote = async () => {
        // Check if a candidate is selected
        // return
        if (selected == null) return;

        // Authenticate using fingerprint
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to Vote',
                fallbackLabel: 'Use Passcode',
            });

            if (result.success) {
                // If authentication is successful, proceed with the voting process
                const voteData = {
                    poll: pollData.id,
                    option: selected,
                };
                currentUserHandler({
                    ...currentUser,
                    UserVotes: [...currentUser.UserVotes, voteData],
                });

                let temp = pollingData;
                temp.forEach((poll) => {
                    if (poll.id == pollData.id) {
                        ++poll.options[selected]
                    }
                });
                modifyPollingData(temp);

                Alert.alert('Vote Successful', 'Your vote has been recorded.');
                // navigation.goBack();
            } else {
                Alert.alert('Authentication Failed', result.error || 'Failed to authenticate.');
            }
        } catch (error) {
            Alert.alert('Authentication Error', error.message || 'Error during authentication.');
        }

        const result = await vote(token, pollData.id, selected);
        navigation.goBack();
    };

    const renderCandidatesList = (itemData) => {
        const handleSelection = () => {
            if (alreadyVoted) return;

            setSelected(itemData.item[0]);
        };

        let isSelected = selected == itemData.item[0] || currentUser.UserVotes.find((poll) => poll.poll == pollData.id && poll.option == itemData.item[0]);

        return (
            <Pressable onPress={handleSelection} style={[{flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:ColorPallete.themeColorTwo, marginBottom:10, borderRadius:16, padding:16}, isSelected && styles.selected]}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontSize:14, color:ColorPallete.textColor, margin:8}}>{itemData.index + 1}.</Text>
                    <Text style={{fontWeight:'bold', fontSize:20, color:ColorPallete.textColor}}>{itemData.item[0]}</Text>
                </View>
                <View style={{flexDirection:"row", alignItems:'center'}}>
                    <MaterialIcons name="poll" size={24} color={ColorPallete.textColor}/>
                    <Text style={{fontSize:16, fontWeight:'bold', color:ColorPallete.textColor, marginLeft:4}}>{itemData.item[1]}</Text>
                </View>
            </Pressable>
        )
    };

    const headerComponents = () => {
        return (
            <View>
                <Pressable onPress={handleNavigation} style={{flexDirection:"row", alignItems:'center', marginBottom:16, marginLeft:-10}}>
                    <MaterialIcons name="chevron-left" size={28} color={ColorPallete.themeColor} />
                    <Text style={{color:ColorPallete.themeColor, fontWeight:'bold', fontSize:16}}>Back</Text>
                </Pressable>

                <View>
                    <Text style={{fontSize:32, fontWeight:'bold', color:ColorPallete.themeColor, marginBottom:8}}>{pollData.question}</Text>
                    <Text style={{fontSize:14, color:ColorPallete.textColor, marginBottom:16}}>Placing a vote is an immutable process and will not be undone in any case.</Text>
                    <Text style={{fontSize:16, fontWeight:'bold', color:ColorPallete.textColor, marginBottom:16}}>Select Candidate <Text style={{color:ColorPallete.themeColor}}>({options.length})</Text></Text>
                </View>
            </View>
        );
    };

    const footerComponents = () => {
        return (
            <>
                {!alreadyVoted && (
                    <Pressable onPress={handleVote} style={{marginTop:12, padding:16, borderRadius:8, alignItems:'center', justifyContent:'center', backgroundColor:ColorPallete.themeColor}}>
                        <Text style={{color:ColorPallete.textColor, fontWeight:'bold', fontSize:16}}>Vote</Text>
                    </Pressable>
                )}
            </>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={options}
                renderItem={renderCandidatesList}
                keyExtractor={(item) =>  Math.floor(Math.random() * 1000) + 1}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={headerComponents}
                ListFooterComponent={footerComponents}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:16,
        paddingTop:64,
        backgroundColor:ColorPallete.bgColor,
    },
    selected: {
        borderWidth:2, 
        borderColor:ColorPallete.themeColor,
        padding:14,
    },
});
