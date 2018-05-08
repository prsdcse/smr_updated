import React, { PureComponent } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import AppNavigation from "../src/navigations/index";

class App extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            store: configureStore()
        }
    }

    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500
        });
    }
    render() {

        return (
            <Provider store={this.state.store} >
                <AppNavigation />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default App;
