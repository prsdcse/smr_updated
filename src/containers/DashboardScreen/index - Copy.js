import React from 'react';
import { View, StyleSheet, Text, Alert, ScrollView, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import realm from '../../providers/realm';
import { ProfileMenuHeader, colors } from '../../components/PocketUI/index';

export default class DashboardScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      clusterID: '',
      villageName: '',
      categoryA: '-',
      categoryB: '-',
      categoryC: '-',
      TypeA: 0,
      TypeB: 0,
      TypeC: 0,
      clusterPrimaryID: '',
      surveyDetails: [],
      loading: false
    };
  }
  async loadCategoryDetails() {
    realm.write(() => {
      if (realm.objects('ServerDetails').length === 0) {
        realm.create('ServerDetails', { status: 'open', updatedTimeStamp: 0, id: 1990, primaryServer: 'http://112.133.207.124:82' });
      }
    });

    const clusterDetails = JSON.parse(JSON.stringify(realm.objects('Cluster').filtered('status="active"')));
    this.setState({
      clusterPrimaryID: clusterDetails[0].clusterPrimaryID,
      clusterID: clusterDetails[0].clusterID,
      villageName: clusterDetails[0].villageName,
      categoryA: realm.objects('Household').filtered('clusterID=$0 AND Category="A" AND Submitted="inprogress"', clusterDetails[0].clusterID).length,
      categoryB: realm.objects('Household').filtered('clusterID=$0 AND Category="B" AND Submitted="inprogress"', clusterDetails[0].clusterID).length,
      categoryC: realm.objects('Household').filtered('clusterID=$0 AND Category="C" AND Submitted="inprogress"  ', clusterDetails[0].clusterID).length,
    });
    this.setState({
      TypeA: realm.objects('BloodSample').filtered('clusterID=$0 AND Submitted="active" AND Type="A"', clusterDetails[0].clusterID) ?
        realm.objects('BloodSample').filtered('clusterID=$0 AND Submitted="active" AND Type="A"', clusterDetails[0].clusterID).length : 0,
      TypeB: realm.objects('BloodSample').filtered('clusterID=$0 AND Submitted="active" AND Type="B"', clusterDetails[0].clusterID) ?
        realm.objects('BloodSample').filtered('clusterID=$0 AND Submitted="active" AND Type="B"', clusterDetails[0].clusterID).length : 0,
      TypeC: realm.objects('BloodSample').filtered('clusterID=$0 AND Submitted="active" AND Type="C"', clusterDetails[0].clusterID) ?
        realm.objects('BloodSample').filtered('clusterID=$0 AND Submitted="active" AND Type="C"', clusterDetails[0].clusterID).length : 0
    });
  }
  componentWillMount() {
    this.loadCategoryDetails();
  }
  deleteCluster() {
    Alert.alert(
      'Delete Cluster Information',
      'Do you want to delete cluster information',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ loading: true });
            realm.write(() => {
              const householdDetails = JSON.parse(JSON.stringify(realm.objects('Household')));
              _.forEach(householdDetails, (house) => {
                realm.create('Household', { id: house.id, Submitted: 'deleted' }, true);
              });
              const householdNumberDetails = JSON.parse(JSON.stringify(realm.objects('HouseholdNumber')));
              _.forEach(householdNumberDetails, (household) => {
                realm.create('HouseholdNumber', { HouseholdPrimary: household.HouseholdPrimary, Submitted: 'deleted' }, true);
              });
              realm.create('Cluster', {
                clusterPrimaryID: this.state.clusterPrimaryID,
                status: 'deleted'
              }, true);
              realm.delete(realm.objects('RandomSurvey'));
              realm.delete(realm.objects('SurveyDetails'));
              realm.delete(realm.objects('SurveyInformation'));
              if (realm.objects('BloodSample').filtered('Submitted!="deleted"').length > 0) {
                const bloodsampleid = realm.objects('BloodSample').filtered('Submitted="active" || Submitted="completed" && clusterID=$0', this.state.clusterID)[0].id;
                realm.create('BloodSample', { id: bloodsampleid, Submitted: 'deleted' }, true);
              }
              this.setState({ loading: false });
              this.navigateToSignIn();
              if (realm.objects('ServerDetails').length > 0) {
                realm.create('ServerDetails', { status: 'open', updatedTimeStamp: 0, id: 1990, primaryServer: 'http://112.133.207.124:82' }, true);
              }
              else {
                realm.create('ServerDetails', { status: 'open', updatedTimeStamp: 0, id: 1990, primaryServer: 'http://112.133.207.124:82' });
              }
            });
          }
        },
      ],
      { cancelable: false }
    );
  }
  navigateToSignIn() {
    const { dispatch } = this.props.navigation;
    dispatch({ type: 'goToHome' });
  }
  showClusterHisttory() {
    const { dispatch } = this.props.navigation;
    dispatch({ type: 'ClusterHistoryScreen' });
  }
  generateRandomSurvey(props) {
    const { dispatch } = this.props.navigation;
    dispatch({ type: 'goToRandomListScreen' });
  }
  gotoHouseholdScreen() {
    const { dispatch } = this.props.navigation;
    dispatch({ type: 'goToHouseHold' });
  }
  gotoEditHouseholdScreen() {
    const { dispatch } = this.props.navigation;
    dispatch({ type: 'goToViewCluster' });
  }

  gotoCompletedSurvey() {
    const { navigate } = this.props.navigation;
    const surveyDatafromRealm = JSON.parse(JSON.stringify(realm.objects('RandomSurvey')))[0].surveyDetails;
    this.setState({ surveyDetails: surveyDatafromRealm });
    navigate('CompletedSurveyDetails', { surveyDetails: surveyDatafromRealm });
  }
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <ScrollView>
          {this.state.loading &&
            <ActivityIndicator size="large" color="#0000ff" />
          }
          {(this.state.clusterID) &&
            <ProfileMenuHeader
              headingIcon="IMRVI"
              heading={`${this.state.clusterID} - ${this.state.villageName}`}
              icon1Title="Add Household"
              icon2Title="Edit Household"
              icon3Title="Survey Details"
              icon4Title="Completed Survey"
              icon5Title="Cluster History"
              icon6Title="Cluster Logout"
              onPressIcon1={this.gotoHouseholdScreen.bind(this)}
              onPressIcon2={this.gotoEditHouseholdScreen.bind(this)}
              onPressIcon3={this.generateRandomSurvey.bind(this)}
              onPressIcon4={this.gotoCompletedSurvey.bind(this)}
              onPressIcon5={this.showClusterHisttory.bind(this)}
              onPressIcon6={this.deleteCluster.bind(this)}
              navigation={this.props.navigation}
            />
          }
          <View>
            <Text style={styles.headingLetter1}>Census --> A : {this.state.categoryA} || B : {this.state.categoryB} || C : {this.state.categoryC}</Text>
            <Text style={styles.headingLetter2}>Blood Collected --> A : {this.state.TypeA} || B : {this.state.TypeB} || C : {this.state.TypeC}</Text>
          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  headingLetter1: {
    color: 'green',
    fontWeight: '700',
    fontSize: 23,
    marginLeft: 20,
    marginTop: 50,
    textAlign: 'center'
  },
  headingLetter2: {
    color: 'red',
    fontWeight: '700',
    fontSize: 23,
    marginLeft: 20,
    marginTop: 10,
    textAlign: 'center'
  },
  headingLetterMain: {
    color: '#3E4A59',
    fontWeight: '800',
    fontSize: 30,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 30,
    flex: 1,
    textAlign: 'center'
  }
});
