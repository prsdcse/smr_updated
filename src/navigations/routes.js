import React from 'react';
//import { Button } from '../components/PocketUI';
import HomeScreen from '../containers/HomeScreen/index';
import DashboardScreen from '../containers/DashboardScreen/index';
import HouseHoldScreen from '../containers/HouseHoldScreen/index';
import AddIndividualScreen from '../containers/AddIndividualScreen/index';
import ViewClusterScreen from '../containers/ViewClusterScreen/index';
import ViewHouseholdDetails from '../containers/ViewHouseholdDetails/index';
import EditIndividual from '../containers/EditIndividual/index';
import RandomListScreen from '../containers/RandomListScreen/index';
import ViewSurveyDetails from '../containers/ViewSurveyDetails/index';
import ViewCompletedSurveyDetails from '../containers/ViewCompletedSurveyDetails/index';
import HouseholdSurvey from '../containers/HouseholdSurvey/index';
import CompletedSurveyDetails from '../containers/CompletedSurveyDetails/index';
import WomenCampaignSurvey from '../containers/WomenCampaignSurvey/index';
import ChildCampaignSurvey from '../containers/ChildCampaignSurvey/index';
import ClusterHistoryScreen from '../containers/ShowClusterHistory/index';

const Routes = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Cluster Information',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold', color: '#fff' },
            headerStyle: { height: 60, padding: 10, backgroundColor: '#4c9689' },
            headerLeft: null
        }
    },
    Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
            title: 'Survey Dashboard',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, padding: 10, backgroundColor: '#4c9689' },
            headerLeft: null
        }
    },
    HouseHold: {
        screen: HouseHoldScreen,
        navigationOptions: {
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, padding: 10, backgroundColor: '#4c9689' }
        }
    },
    AddIndividual: {
        screen: AddIndividualScreen,
        navigationOptions: {
            title: 'Add Household Individual',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, padding: 10, backgroundColor: '#4c9689' }
        }
    },
    ViewCluster: {
        screen: ViewClusterScreen
    },
    ViewHousehold: {
        screen: ViewHouseholdDetails
    },
    EditIndividual: {
        screen: EditIndividual
    },
    RandomListScreen: {
        screen: RandomListScreen
    },
    ViewSurveyDetails: {
        screen: ViewSurveyDetails
    },
    ViewCompletedSurveyDetails: {
        screen: ViewCompletedSurveyDetails
    },
    HouseholdForm: {
        screen: HouseholdSurvey
    },
    CompletedSurveyDetails: {
        screen: CompletedSurveyDetails
    },
    WomenCampaignSurvey: {
        screen: WomenCampaignSurvey
    },
    ChildCampaignSurvey: {
        screen: ChildCampaignSurvey
    },
    ClusterHistoryScreen: {
        screen: ClusterHistoryScreen
    },
    /*
    WomenCampaignSurvey: {
        screen: WomenCampaignSurvey,
        navigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state;
            return {
                title: 'Women Campaign Survey',
                headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
                headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
                headerRight: (
                    <Button
                        buttonStyle={{ width: 170, height: 100, backgroundColor: '#4c9689' }}
                        title='Save'
                        onPress={params.handleSubmit}
                    />
                )
            }
        }
    } */
};

export default Routes;
