import React from 'react';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import ClusterFormScreen from '../ClusterFormScreen';
import realm from '../../providers/realm';
import { colors, LoginHeader } from '../../components/PocketUI/index';

export default class HomeScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    componentDidMount() {
        const { dispatch } = this.props.navigation;
        const activeCluster = realm.objects('Cluster').filtered('status = "active"');
        this.requestLocationPermission();
        if (activeCluster.length > 0) {
            dispatch({ type: 'goToDashboard' });
        }
        else {
            return false;
        }
    }

    requestLocationPermission() {
        try {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Location Permission',
                    'message': 'Need permission to update location information'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //console.log("Location permission granted")
            } else {
                //console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: 'white' }}>
                <LoginHeader
                    headerTitle="Enter your cluster information"
                />
                <ClusterFormScreen navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        padding: 0,
    },
});
