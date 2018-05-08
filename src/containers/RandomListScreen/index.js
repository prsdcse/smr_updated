import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Image } from 'react-native';
import _ from 'lodash';
import * as axios from 'axios';
import realm from '../../providers/realm';
import moment from 'moment';
import {
    colors, FormRow, List, Button, ListItem,
    WalletHeader, RadioButton, Divider, FormInput, Card
} from '../../components/PocketUI/index';

export default class RandomListScreen extends React.PureComponent {
    state = {
        selectedTab: 'RandomListScreen'
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            surveyDetails: []
        };
    }
    componentWillMount(props) {
        const { navigate } = this.props.navigation;
        if (realm.objects('RandomSurvey').length === 0) {
            const ClusterId = JSON.parse(JSON.stringify(realm.objects('Cluster').filtered('status = "active"')))[0].clusterID;
            Alert.alert(
                'Generate Random List',
                'Do you want to generate random list ?',
                [
                    { text: 'Cancel', onPress: () => { navigate('Dashboard'); console.log('cancel generating random list'); }, style: 'cancel' },
                    {
                        text: 'Generate',
                        onPress: () => {
                            const serverURL = realm.objects('ServerDetails')[0].primaryServer;
                            console.log(serverURL);
                            axios.post(serverURL + '/MRSurvey/surveydetails_request.php', {
                                ClusterId
                            })
                                .then((response) => {
                                    if (!response.data.Message) {
                                        realm.write(() => {
                                            realm.create('RandomSurvey', { clusterID: ClusterId, surveyDetails: JSON.stringify(response.data.SurveyDetails), status: 'saved' });

                                            _.forEach(response.data.SurveyDetails, (value) => {
                                                _.forEach(value.IndividualInfo, (individual) => {
                                                    individual.surveyID = Math.floor(new Date().getTime() * Math.random());
                                                    individual.HouseholdID = value.HouseholdID;
                                                    individual.status = 'open';
                                                    individual.surveyData = '';
                                                    individual.HoueholdHead = value.HoueholdHead;
                                                    individual.selectedIndividualCount = String(value.selectedIndividualCount);
                                                    realm.create('SurveyInformation', individual);
                                                });
                                                const householdEntry = {};
                                                householdEntry.Sno = '';
                                                householdEntry.AgeGroup = 'H';
                                                householdEntry.AgeDis = '';
                                                householdEntry.Name = '';
                                                householdEntry.Sex = '';
                                                householdEntry.HouseholdID = value.HouseholdID;
                                                householdEntry.status = 'open';
                                                householdEntry.surveyData = '';
                                                householdEntry.HoueholdHead = '';
                                                householdEntry.selectedIndividualCount = '';
                                                householdEntry.surveyID = Math.floor(new Date().getTime() * Math.random());
                                                realm.create('SurveyInformation', householdEntry);
                                            });
                                        });
                                        this.setState({ surveyDetails: response.data.SurveyDetails, loading: false });
                                    } else {
                                        alert('No List available');
                                        navigate('Dashboard');
                                    }
                                })
                                .catch((error) => {
                                    if (realm.objects('ServerDetails').filtered('status="open"').length > 0) {
                                        const lastUpdatedTime = realm.objects('ServerDetails')[0].updatedTimeStamp;
                                        if (lastUpdatedTime) {
                                            const timeDifference = Math.floor((new Date().getTime() - lastUpdatedTime) / (1000 * 60));
                                            if (timeDifference > 1) {
                                                realm.write(() => {
                                                    realm.create('ServerDetails', { primaryServer: realm.objects('ServerDetails')[0].server2, status: 'updated', updatedTimeStamp: new Date().getTime(), id: 1990 }, true);
                                                });
                                            }
                                        }
                                        else {
                                            realm.write(() => {
                                                realm.create('ServerDetails', { updatedTimeStamp: new Date().getTime(), id: 1990 }, true);
                                            });
                                        }
                                    }
                                    this.setState({
                                        loading: false
                                    });
                                    alert('Server Unavailable. Try again after sometime');
                                    navigate('Dashboard');
                                });
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            const surveyDatafromRealm = JSON.parse(JSON.stringify(realm.objects('SurveyInformation').filtered('status="open" || status="inprogress"')));
            const grouped = _.groupBy(surveyDatafromRealm, 'HouseholdID');
            this.setState({ loading: false, surveyDetails: _.values(grouped) });
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ backgroundColor: '#e9e9e9' }}>
                {(this.state.loading) &&
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                        <Text style={{ fontSize: 28, fontWeight: '500' }}>Loading...</Text>
                    </View>
                }
                {(!this.state.loading && this.state.surveyDetails) &&
                    <ScrollView style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                        {this.state.surveyDetails.map((survey, index) => (<Card
                            key={index}
                            onPress={() => navigate('ViewSurveyDetails', { individualInfo: survey, HouseholdID: survey.HouseholdID ? survey.HouseholdID : survey[0].HouseholdID })}
                            title={`Head Name : ${survey.HoueholdHead ? survey.HoueholdHead : survey[0].HoueholdHead}`}
                            subTitle={`Household ID : ${survey.HouseholdID ? survey.HouseholdID : survey[0].HouseholdID}`}
                            number={`Count : ${survey.selectedIndividualCount ? survey.selectedIndividualCount : survey[0].selectedIndividualCount}`}
                            expiration={`Last Updated : ${moment().format('DD-MM-YYYY h:mm:ss a')}`}
                            moreText='View'
                        />), this)}
                    </ScrollView>
                }
            </ScrollView>
        );
    }
}
