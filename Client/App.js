import AuthMain from './screens/Auth/AuthMain';
import HomeMain from './screens/Home/HomeMain';
import  AuthContextProvider from './context/ContextApi';
import { StatusBar } from 'react-native';

export default function App() {

  const AppNav = ()=>{

    return(
      <>
        <AuthMain />
        <HomeMain/>
      </>
    )
  }

  return (
    <AuthContextProvider>
      {AppNav()}
    </AuthContextProvider>
  );
}

