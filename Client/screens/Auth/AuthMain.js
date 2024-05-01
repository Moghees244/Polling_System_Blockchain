import React, { useContext } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from './AuthScreen';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { AuthContext } from '../../context/ContextApi';

const Stack = createNativeStackNavigator();

export default function AuthMain() {
    const {currentUser}=useContext(AuthContext)
    
  return (
    <>
        {
            !currentUser &&
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    <Stack.Screen name="AuthScreen" component={AuthScreen} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </Stack.Navigator>
            </NavigationContainer>
        }

    </>
  )
}
