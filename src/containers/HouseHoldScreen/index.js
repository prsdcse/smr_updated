import React from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import realm from '../../providers/realm';
import clear from 'react-native-clear-app-cache';
import {
  colors, Button,
  WalletHeader, RadioButton, Divider, FormInput
} from '../../components/PocketUI/index';

export default class HouseHoldScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      HouseholdStatus1: true,
      HouseholdStatus2: false,
      HouseholdStatus3: false,
      HouseholdStatus4: false,
      HouseholdStatus5: false,
      HouseholdStatus6: false,
      HouseholdID: '',
      HouseholdStatus: '1',
      HouseholdStatusValue: 'Complete, verbal assent provided',
      personList: [],
      clusterID: '',
      villageName: '',
      accuracy: 0,
      latitude: 0,
      longitude: 0,
      loading: false
    };
  }
  static navigationOptions = ({ navigation, navigate }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitleStyle: { marginLeft: 30, fontSize: 23, fontWeight: 'bold', textAlign: 'center', },
      headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 8 },
      headerRight: (
        <Button
          buttonStyle={{ width: 170, height: 100, backgroundColor: '#4c9689' }}
          fontSize={25}
          title='Save HH'
          onPress={params.handleSave}
        />
      ),
      headerLeft: (
        <Button
          buttonStyle={{ width: 100, height: 100, backgroundColor: '#4c9689', marginRight: 10 }}
          fontSize={25}
          title='Home'
          onPress={params.goHome}
        />
      )
    };
  };

  state = {
    selectedTab: 'HouseHold'
  };

  componentWillMount() {
    const { params = {} } = this.props.navigation.state;
    const clusterInfo = realm.objects('Cluster').filtered('status="active"');
    this.props.navigation.setParams({ handleSave: this._handleSave.bind(this), goHome: this._goHome.bind(this) });
    let HouseholdNumber = '';
    if (!params.HouseholdID) {
      const activehouseholdData = realm.objects('HouseholdNumber').filtered('Submitted="active" AND clusterID=$0', clusterInfo[0].clusterID);
      if (activehouseholdData.length === 1) {
        HouseholdNumber = activehouseholdData[0].HouseholdID;
      } else {
        const completedhouseholdData = realm.objects('HouseholdNumber').filtered('Submitted !="active"AND clusterID=$0', clusterInfo[0].clusterID);
        if (completedhouseholdData.length > 0) {
          const householdArray = [];
          _.forEach(completedhouseholdData, (value) => {
            householdArray.push(parseInt(value.HouseholdID));
          });
          HouseholdNumber = String(_.maxBy(householdArray) + 1);
        } else {
          HouseholdNumber = '1';
        }
      }
    } else {
      HouseholdNumber = params.HouseholdID;
    }
    if (params.HouseholdStatus) {
      if (params.HouseholdStatus === '1') {
        this.setState({
          HouseholdStatus1: true,
          HouseholdStatus: '1',
          HouseholdStatusValue: 'Complete, verbal assent provided',
          HouseholdStatus2: false
        });
      } else if (params.HouseholdStatus === '2') {
        this.setState({
          HouseholdStatus1: false,
          HouseholdStatus: '2',
          HouseholdStatusValue: 'Complete, Information provided by neighbor',
          HouseholdStatus2: true
        });
      }
    }
    this.setState({
      HouseholdID: HouseholdNumber,
      clusterID: clusterInfo[0].clusterID,
      villageName: clusterInfo[0].villageName,
      personList: realm.objects('Household').filtered('HouseholdID=$0 AND Submitted= "active"', HouseholdNumber)
    });
  }
  componentDidMount() {

  }
  _goHome() {
    const { navigate } = this.props.navigation;
    navigate('Dashboard');
  }
  async getLocationData() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        this.setState({
          accuracy: position.coords.accuracy,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => this.setState({ loading: false }),
      { enableHighAccuracy: false, timeout: 30000 }
    );
  }
   _handleSave() {
    const { navigate } = this.props.navigation;
    this.setState({ loading: true });
    this.getLocationData().then(() => {
      if (this.state.HouseholdStatus !== '1') {
        if (this.state.HouseholdStatus !== '2') {
          const HouseholdPrimary = Math.floor(Math.random() * 10000000000) + new Date().getTime();
          const householdObj = {
            id: `${this.state.HouseholdID}${new Date().getTime()}`,
            HouseholdPrimary,
            HouseholdID: this.state.HouseholdID,
            HouseholdStatus: this.state.HouseholdStatus,
            Name: '',
            KnowDOB: false,
            DOB: '',
            AgeDays: '',
            Age: '',
            Sex: '',
            IsPersonAvailable: false,
            Submitted: 'inprogress',
            HouseholdStatusValue: this.state.HouseholdStatusValue,
            clusterID: this.state.clusterID,
            UpdatedTime: moment().format('MM-DD-YYYY h:mm:ss a'),
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            accuracy: this.state.accuracy
          };
           realm.write(() => {
            realm.delete(realm.objects('Household').filtered('HouseholdID=$0', this.state.HouseholdID));
            realm.create('Household', householdObj);
            realm.create('HouseholdNumber', { HouseholdStatus: this.state.HouseholdStatus, HouseholdID: this.state.HouseholdID, HouseholdPrimary, Submitted: 'inprogress', clusterID: this.state.clusterID });
          });
          //this.setState({ loading: false });
          ToastAndroid.show(
            'Household information saved',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          
          navigate('Dashboard');
        } else {
          this.savehouseholdInformation();
        }
      } else {
        this.savehouseholdInformation();
      }
    });
  }

  async savehouseholdInformation() {
    const { navigate } = this.props.navigation;
    const HouseholdPrimary = Math.floor(Math.random() * 10000000000) + new Date().getTime();
    const idList = _.map(JSON.parse(JSON.stringify(this.state.personList)), 'id');
    realm.write(() => {
      for (let i = 0; i < idList.length; i++) {
        realm.create('Household', { id: idList[i], Submitted: 'inprogress', HouseholdPrimary, latitude: this.state.latitude, longitude: this.state.longitude, accuracy: this.state.accuracy }, true);
      }
      const householdDetails = realm.objects('Household').filtered('Submitted="inprogress" AND HouseholdStatus!="1" AND HouseholdStatus!= "2" AND HouseholdID=$0', this.state.HouseholdID);
      realm.delete(householdDetails);
      realm.create('HouseholdNumber', { HouseholdStatus: this.state.HouseholdStatus, HouseholdID: this.state.HouseholdID, HouseholdPrimary, Submitted: 'inprogress', clusterID: this.state.clusterID });
    });
    this.setState({
      personList: []
    });
    //this.setState({ loading: false });
    ToastAndroid.show(
      'Household information saved',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    navigate('Dashboard');
	clear.clearAppCache();
  }

  removePerson(removePerson, index) {
    realm.write(() => {
      realm.delete(removePerson);
      this.setState({
        personList: realm.objects('Household').filtered('HouseholdID=$0 AND Submitted= "active"', this.state.HouseholdID)
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <Text style={styles.headingLetterMain}>Household Information</Text>
          {(this.state.loading) &&
            <View>
              <Text style={styles.headingLetterMain}>Saving Household Information</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          }
          <Text style={styles.headingLetter}>{`Cluster ID : ${this.state.clusterID} / Village Name : ${this.state.villageName}  `}</Text>
          <View style={{ flex: 2, flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Text style={styles.headingLetter1}>{'Household Number'}</Text>
            <FormInput
              inputStyle={{ width: 50 }}
              maxLength={3}
              placeholder='HouseHold Number'
              value={this.state.HouseholdID}
              onChangeText={(HouseholdID) => this.setState({ HouseholdID })}
              keyboardType='numeric'
            />
          </View>
          <Text style={styles.headingLetter1}>Household Status</Text>
          <RadioButton
            title='Complete, verbal assent provided'
            textStyle={{ color: '#4B5461', opacity: 0.8, fontSize: 20 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.setState({
              HouseholdStatus1: !this.state.HouseholdStatus1,
              HouseholdStatus2: false,
              HouseholdStatus3: false,
              HouseholdStatus4: false,
              HouseholdStatus5: false,
              HouseholdStatus6: false,
              HouseholdStatus7: false,
              HouseholdStatus: '1',
              HouseholdStatusValue: 'Complete, verbal assent provided'
            })}
            size={17}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            checked={this.state.HouseholdStatus1}
          />
          <RadioButton
            title='Complete, Information provided by neighbor'
            textStyle={{ color: '#4B5461', opacity: 0.8, fontSize: 20 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.setState({
              HouseholdStatus2: !this.state.HouseholdStatus2,
              HouseholdStatus1: false,
              HouseholdStatus3: false,
              HouseholdStatus4: false,
              HouseholdStatus5: false,
              HouseholdStatus6: false,
              HouseholdStatus7: false,
              HouseholdStatus: '2',
              HouseholdStatusValue: 'Complete, Information provided by neighbor'
            })}
            size={17}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            checked={this.state.HouseholdStatus2}
          />
          <RadioButton
            title='Incomplete, Locked House'
            textStyle={{ color: '#4B5461', opacity: 0.8, fontSize: 20 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.setState({
              HouseholdStatus3: !this.state.HouseholdStatus3,
              HouseholdStatus2: false,
              HouseholdStatus1: false,
              HouseholdStatus4: false,
              HouseholdStatus5: false,
              HouseholdStatus6: false,
              HouseholdStatus7: false,
              HouseholdStatus: '3',
              HouseholdStatusValue: 'Incomplete, Locked House'
            })}
            size={17}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            checked={this.state.HouseholdStatus3}
          />
          <RadioButton
            title='Incomplete, No competent responded at home'
            textStyle={{ color: '#4B5461', opacity: 0.8, fontSize: 20 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.setState({
              HouseholdStatus4: !this.state.HouseholdStatus4,
              HouseholdStatus2: false,
              HouseholdStatus3: false,
              HouseholdStatus1: false,
              HouseholdStatus5: false,
              HouseholdStatus6: false,
              HouseholdStatus7: false,
              HouseholdStatus: '4',
              HouseholdStatusValue: 'Incomplete, No competent responded at home'
            })}
            size={17}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            checked={this.state.HouseholdStatus4}
          />
          <RadioButton
            title='Incomplete, Refused'
            textStyle={{ color: '#4B5461', opacity: 0.8, fontSize: 20 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.setState({
              HouseholdStatus5: !this.state.HouseholdStatus5,
              HouseholdStatus2: false,
              HouseholdStatus3: false,
              HouseholdStatus4: false,
              HouseholdStatus1: false,
              HouseholdStatus6: false,
              HouseholdStatus7: false,
              HouseholdStatus: '5',
              HouseholdStatusValue: 'Incomplete, Refused'
            })}
            size={17}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            checked={this.state.HouseholdStatus5}
          />
          <RadioButton
            title='Incomplete, Other'
            textStyle={{ color: '#4B5461', opacity: 0.8, fontSize: 20 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.setState({
              HouseholdStatus6: !this.state.HouseholdStatus6,
              HouseholdStatus2: false,
              HouseholdStatus3: false,
              HouseholdStatus4: false,
              HouseholdStatus5: false,
              HouseholdStatus1: false,
              HouseholdStatus7: false,
              HouseholdStatus: '6',
              HouseholdStatusValue: 'Incomplete, Other'
            })}
            size={17}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            checked={this.state.HouseholdStatus6}
          />
          <RadioButton
            title='Incomplete, Extended absence (per neighbor)'
            textStyle={{ color: '#4B5461', opacity: 0.8, fontSize: 20 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.setState({
              HouseholdStatus7: !this.state.HouseholdStatus7,
              HouseholdStatus1: false,
              HouseholdStatus2: false,
              HouseholdStatus3: false,
              HouseholdStatus4: false,
              HouseholdStatus5: false,
              HouseholdStatus6: false,
              HouseholdStatus: '7',
              HouseholdStatusValue: 'Incomplete, Extended absence (per neighbor)'

            })}
            size={17}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            checked={this.state.HouseholdStatus7}
          />
          {(this.state.HouseholdStatus1 || this.state.HouseholdStatus2) &&
            <Button
              buttonStyle={{ marginTop: 40, marginBottom: 15, backgroundColor: '#4c9689' }}
              title='Add Individual'
              onPress={() =>
                navigate('AddIndividual', { HouseholdID: this.state.HouseholdID, HouseholdStatus: this.state.HouseholdStatus, HouseholdStatusValue: this.state.HouseholdStatusValue, clusterID: this.state.clusterID, villageName: this.state.villageName })
              }
            />
          }
          <Divider />
          {(this.state.HouseholdStatus1 || this.state.HouseholdStatus2) && this.state.personList.map(function (person, index) {
            return (<WalletHeader
              key={index}
              headingIcon={person.Sex}
              heading={`Name : ${person.Name}`}
              heading1={`${person.KnowDOB ? 'DOB  : ' : 'Age : '} ${person.KnowDOB ? person.DOB : person.Age}`}
              rightIcon='trash'
              rightIconClick={() => this.removePerson(person, index)}
            />);
          }, this)}
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 0,
  },
  list: {
    marginTop: 15,
  },
  headingLetter: {
    color: '#3E4A59',
    fontWeight: '800',
    fontSize: 23,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 15,
    flex: 1,
    textAlign: 'center'
  },
  headingLetter1: {
    color: '#3E4A59',
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 15,
    marginTop: 10
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