import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import _ from 'lodash';
import {
    colors, FormRow, List, Button, ListItem,
    WalletHeader, RadioButton, Divider, FormInput, Card
} from '../../components/PocketUI/index';
import realm from '../../providers/realm';
import moment from 'moment';
import * as axios from 'axios';
export default class CompletedSurveyDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Completed Survey',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
            headerRight: (
                <Button
                    buttonStyle={{ width: 170, height: 100, backgroundColor: '#4c9689' }}
                    title='Submit'
                    onPress={params.handleSubmit}
                />
            ),
        };
    }
    state = {
        selectedTab: 'CompletedSurveyDetails'
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            surveyDetails: [],
            surveyDatafromRealm: ''
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSubmit: this.handleSubmit.bind(this) });
    }
    componentWillMount() {
        const surveyDatafromRealm = realm.objects('SurveyInformation').filtered('status="saved"');
        const grouped = _.groupBy(surveyDatafromRealm, 'HouseholdID');
        this.setState({ loading: false, surveyDetails: _.values(grouped), surveyDatafromRealm });
    }

    handleSubmit() {
        const { dispatch } = this.props.navigation;
        /* NetInfo.isConnected.fetch().then(isConnected => {
            alert('isConnected', isConnected);
        }); */
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        if (this.state.surveyDetails.length > 0) {
            Alert.alert(
                'Submit Survey Information',
                'Do you want to submit Survey Details for the cluster ',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    {
                        text: 'OK',
                        onPress: () => {
                            this.setState({
                                loading: true
                            });
                            const postData = {
                                surveyDetails: this.state.surveyDatafromRealm
                            };
                            const serverURL = realm.objects('ServerDetails')[0].primaryServer;
                            console.log(serverURL);
                            axios.post(serverURL + '/MRSurvey/Survey_information.php', postData)
                                .then((response) => {
                                    console.log(response);

                                    //let idList = [];
                                    realm.write(() => {
                                        const completedSurvey = JSON.parse(JSON.stringify(realm.objects('SurveyInformation').filtered('status="saved"')));
                                        _.forEach(completedSurvey, (survey) => {
                                            realm.create('SurveyInformation', { surveyID: survey.surveyID, status: 'completed' }, true);
                                        });
                                        if (realm.objects('BloodSample').filtered('Submitted="active" && clusterID=$0', clusterID).length > 0) {
                                            const bloodSampleData = JSON.parse(JSON.stringify(realm.objects('BloodSample').filtered('Submitted="active" && clusterID=$0', clusterID)));
                                            _.forEach(bloodSampleData, (bloodSample) => {
                                                realm.create('BloodSample', { id: bloodSample.id, Submitted: 'completed' }, true);
                                            });
                                        }
                                        this.setState({
                                            loading: false
                                        });
                                        Alert.alert(
                                            'Survey Submission',
                                            'Survey data submitted to server successfully',
                                            [
                                                { text: 'OK', onPress: () => dispatch({ type: 'goToDashboard' }) },
                                            ],
                                            { cancelable: false }
                                        );
                                    });
                                })
                                .catch((error) => {
                                    console.log(JSON.stringify(error));
                                    if (JSON.stringify(error).status == '503' || JSON.stringify(error).status == '503') {
                                        if (realm.objects('ServerUnavailable').length == 0) {
                                            realm.write(() => {
                                                realm.create('ServerUnavailable', { updatedTimeStamp: new Date() });
                                            });
                                        } else {
                                            const lastUpdatedTime = JSON.parse(JSON.stringify(realm.objects('ServerUnavailable')))[0].updatedTimeStamp;
                                            const timeDifference = Math.floor((new Date().getTime() - lastUpdatedTime) / (1000 * 60));
                                            if (timeDifference > 15) {

                                            }
                                        }
                                    }
                                    this.setState({
                                        loading: false
                                    });
                                    dispatch({ type: 'goToDashboard' });
                                });
                            console.log('submit clutser information', postData);
                        }
                    },
                ],
                { cancelable: false }
            );
        } else {
            alert('No Forms to submit');
        }
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                {(this.state.loading) &&
                    <ScrollView style={{ backgroundColor: 'white', opacity: 0.7 }}>
                        <View style={{ marginTop: 250, marginLeft: 160 }}>
                            {/* <Image
                                source={require('../../images/loader.gif')}
                            /> */}
                            <Text style={{ fontSize: 40, marginTop: 100 }}>Loading....</Text>
                        </View>
                    </ScrollView>
                }
                {(!this.state.loading) && this.state.surveyDetails.map((survey, index) => (<Card
                    key={index}
                    onPress={() => navigate('ViewCompletedSurveyDetails', { individualInfo: survey[0].IndividualInfo, HouseholdID: survey[0].HouseholdID })}
                    title={`Head Name : ${survey[0].HoueholdHead}`}
                    subTitle={`Household ID : ${survey[0].HouseholdID}`}
                    number={`Count : ${survey[0].selectedIndividualCount}`}
                    expiration={`Last Updated : ${moment().format('DD-MM-YYYY h:mm:ss a')}`}
                    moreText='View'
                />), this)}
            </ScrollView>
        );
    }
}
