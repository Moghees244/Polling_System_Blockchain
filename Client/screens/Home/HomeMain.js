import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import HomeSettings from './HomeSettings';
import ColorPallete from '../../constants/ColorPallete';
import { AuthContext } from '../../context/ContextApi';
import DUMMY_DATA from '../../constants/DummyData';
import PollDetail from './PollDetail';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenStack = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PollDetail" component={PollDetail} />
        </Stack.Navigator>
    )
}

export default function HomeMain() {

    const {pollingData, modifyPollingData, currentUser} = useContext(AuthContext)

    // useEffect(()=>{
    //     modifyPollingData(DUMMY_DATA)
    // },[])

  return (
    <>
        {
            currentUser &&
            <NavigationContainer>
                <Tab.Navigator screenOptions={{
                    tabBarActiveTintColor:ColorPallete.themeColor,
                    tabBarInactiveTintColor:"#ccc",
                    tabBarStyle:{
                        backgroundColor:ColorPallete.bgColor,
                        borderTopWidth:0,
                    },
                    
                }}>

                    <Tab.Screen name="Home" component={HomeScreenStack} options={{
                        headerShown:false,
                        tabBarIcon:({color,size})=>(
                            <MaterialIcons name="poll" size={size} color={color}/>
                        )
                    }}/>
                    <Tab.Screen name="HomeSettings" component={HomeSettings} options={{
                        title:"Settings",
                        headerShown:false,
                        tabBarIcon:({color,size})=>(
                            <MaterialIcons name="settings" size={size} color={color}/>
                        )
                    }}/>
                </Tab.Navigator>
            </NavigationContainer>
        }
    </>
  )
}
