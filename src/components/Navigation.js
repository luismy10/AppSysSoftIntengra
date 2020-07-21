import React from 'react';
import { View, StyleSheet, StatusBar, AsyncStorage, ActivityIndicator } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from './Login';
import Principal from './Principal';

class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AppStack = createStackNavigator({ Home: Principal });
const AuthStack = createStackNavigator({ SignIn: Login });

const AppStackNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack
    }
);

export default AppStackNavigator;





