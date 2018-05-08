import React from 'react';
import { StyleSheet, View, ScrollView, DatePickerAndroid, Switch } from 'react-native';
import { Card, colors, WalletHeader, MenuHeader, Button, Text } from '../../components/PocketUI/index';
import realm from '../../providers/realm';
import _ from 'lodash';

export default class ViewCompletedSurveyDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            personList: ''
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
            headerLeft: (
                <Button
                    buttonStyle={{ width: 100, height: 100, backgroundColor: '#4c9689', marginRight: 10 }}
                    fontSize={25}
                    title='Home'
                    onPress={params.goHome}
                />
            )
        };
    }

    state = {
        selectedTab: 'ViewCompletedSurveyDetails'
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        realm.objects('SurveyInformation').filtered('HouseholdID=$0', params.HouseholdID);
        this.setState({
            personList: realm.objects('SurveyInformation').filtered('HouseholdID=$0', params.HouseholdID)
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSubmit: this.handleSubmit.bind(this), goHome: this._goHome.bind(this) });
    }
    _goHome() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToDashboard' });
    }
    handleSubmit() {
        const { dispatch } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const openSurveyCount = realm.objects('SurveyInformation').filtered('status = "saved" && HouseholdID=$0', params.HouseholdID).length;
        if (openSurveyCount > 0) {
            alert('Please save all forms for this household before submitting');
        } else {
            const surveyList = realm.objects('SurveyInformation').filtered('HouseholdID=$0', params.HouseholdID);
            realm.write(() => {
                _.forEach(surveyList, (survey) => {
                    realm.create('SurveyInformation', { surveyID: survey.surveyID, status: 'saved' }, true);
                });
            });
            
            dispatch({ type: 'goToRandomListScreen' });
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View>
                        <WalletHeader
                            headingIcon={'H'}
                            heading={`Household form for HH ID: ${params.HouseholdID}`}
                            rightIcon={'pencil-square'}
                            rightIconClick={() => navigate('HouseholdForm', { HouseholdID: params.HouseholdID })}
                        />
                    </View>
                    {this.state.personList.map((person, index) => (<View key={index}>
                        {(person.AgeGroup != 'H') &&
                            <View>
                                <WalletHeader
                                    headingIcon={person.Sex}
                                    heading={`${person.Name} / ${person.AgeDis} / ${person.AgeGroup == 'C' ? 'Women campaign Form' : 'Children campaign Form'}`}
                                    rightIcon='pencil-square'
                                    rightIconClick={() => person.AgeGroup == 'C' ? navigate('WomenCampaignSurvey', { HouseholdID: params.HouseholdID, person: JSON.parse(JSON.stringify(person)) }) : navigate('ChildCampaignSurvey', { HouseholdID: params.HouseholdID, person: JSON.parse(JSON.stringify(person)) })}
                                />
                            </View>
                        }
                    </View>), this)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        flex: 1,
    },
    headingLetter: {
        color: '#3E4A59',
        fontWeight: '800',
        fontSize: 25,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 35
    }
});
