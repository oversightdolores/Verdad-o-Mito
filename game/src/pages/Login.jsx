import { Button, View, Text } from "react-native";
import {useAuth0} from 'react-native-auth0';

const Login = () => {
    const {authorize, user, isLoading, error, clearSession} = useAuth0();

    const login = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    const logout = async () => {
      try {
          clearSession();
      } catch (e) {
          console.log(e);
      }
  };
  
console.log(user)
  if(isLoading) {
    return (
      <View>
        <Text>SDK is Loading</Text>
      </View>
    )
  }

  if (!user && !isLoading) {
    return (
        <View>
            <Button onPress={login} title="Log in" />
            <Button onPress={logout} title="Log out" />

        </View>
    );
}

if (user) {
    return (
        <View>
            <Text>Logged in as {user.name}</Text>
            <Button onPress={logout} title="Log out" />
        </View>
    );
}

if (error) {
    return (
        <View>
            <Text>{error.message}</Text>
        </View>
    );
}

}


export default Login