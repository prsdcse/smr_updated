import React from 'react';
import { StyleSheet, DatePickerAndroid, ScrollView, View, Alert, ToastAndroid } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import ValidationComponent from 'react-native-form-validator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import realm from '../../providers/realm';
import { Button, FormInput, Text } from '../../components/PocketUI';


export default class HouseHoldSurvey extends ValidationComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
            headerRight: (
                <Button
                    buttonStyle={{ width: 170, height: 100, backgroundColor: '#4c9689' }}
                    title='Save'
                    onPress={params.handleSubmit}
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
    }
    state = {
        selectedTab: 'HouseHoldSurvey'
    };
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.household_status = [
            { value: '01', label: 'Agreed to participate' },
            { value: '02', label: 'Locked,no household member at home, or no competent respondent at home at time of visit' },
            { value: '03', label: 'Refused' },
            { value: '99', label: 'other' },
			{ value: '04', label: 'Ineligible' }
        ];
        this.optionList = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '88', label: 'Dont Know' }];

        this.optionListOneTwo = [
            { value: '01', label: 'One' },
            { value: '02', label: 'Two' }];

        this.optionListMother = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '03', label: 'Mother not alive' }];

        this.optionListBoolean = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' }];

        this.relationship = [
            { value: '01', label: 'Head of household' },
            { value: '02', label: 'Wife or husband' },
            { value: '03', label: 'Son or daughter' },
            { value: '04', label: 'Brother or sister' },
            { value: '05', label: 'In-Law' },
            { value: '06', label: 'parent or grand parent' },
            { value: '07', label: 'Other relative' },
            { value: '08', label: 'Other' }
        ];

        this.migratoryCategory = [
            { value: '01', label: 'Urban slum with migration' },
            { value: '02', label: 'Nomads' },
            { value: '03', label: 'Brick kilns' },
            { value: '04', label: 'Construction sites' },
            { value: '99', label: 'Other' }];

        this.householdCategory = [
            { value: '01', label: 'Owned' },
            { value: '02', label: 'Rented' },
            { value: '03', label: 'Provided free of charge by relative/employer' },
            { value: '88', label: 'Dont know' },
            { value: '99', label: 'Other, Specify' }
        ];


        this.religion = [
            { value: '01', label: 'Hindu' },
            { value: '02', label: 'Muslim' },
            { value: '03', label: 'Christian' },
            { value: '04', label: 'Sikh' },
            { value: '05', label: 'Buddhist' },
            { value: '06', label: 'Jain' },
            { value: '07', label: 'No religion' },
            { value: '99', label: 'Other religion' }
        ];

        this.headofHouseholdEducation = [
            { value: '01', label: 'Professional or honors' },
            { value: '02', label: 'Graduate' },
            { value: '03', label: 'Senior/Higher Secondary' },
            { value: '04', label: 'High School Certificate' },
            { value: '05', label: 'Middle School Certificate' },
            { value: '06', label: 'Primary School Certificate' },
            { value: '07', label: 'Illiterate' },
            { value: '88', label: 'Don’t know' }
        ];


        this.householdOccupation = [
            { value: '01', label: 'Professionals/Managers/Officials/legislators' },
            { value: '02', label: 'Technicians and associate professionals' },
            { value: '03', label: 'Clerks/Clerical support workers' },
            { value: '04', label: 'Service and sales workers' },
            { value: '05', label: 'Agricultural and fishery workers' },
            { value: '06', label: 'Craft and related trade workers' },
            { value: '07', label: 'Homemaker' },
            { value: '08', label: 'Unemployed' },
            { value: '09', label: 'Student' },
            { value: '88', label: 'Don’t know' }
        ];

        this.caste = [
            { value: '01', label: 'General' },
            { value: '02', label: 'Schedule Caste (SC)' },
            { value: '03', label: 'Schedule Tribe (ST)' },
            { value: '04', label: 'Other Backward Class (OBC)' },
            { value: '05', label: 'None of them' },
            { value: '06', label: 'No Response' },
            { value: '88', label: 'Don’t know' }
        ];

        this.housingMaterial = [
            { value: '01', label: 'Kuchha' },
            { value: '02', label: 'Pucca' },
            { value: '03', label: 'Semi-pucca' },
            { value: '88', label: 'Don’t know' },
            { value: '99', label: 'Other' }
        ];

        this.healthFacility = [
            { value: '01', label: 'Public health sector' },
            { value: '02', label: 'Private health sector' },
            { value: '99', label: 'Other' },
            { value: '03', label: 'None' }
        ];
        this.toiletFacility = [
            { value: '01', label: 'Own toilet (outside or inside house)' },
            { value: '02', label: 'Shared common toilet' },
            { value: '03', label: 'Public toilet' },
            { value: '04', label: 'No facilities/uses open space' }
        ];

        this.state = {
            editedField: false,
            h1hhid: '',
            h6astatusvis1: '',
			startTime: moment().format('DD-MM-YYYY h:mm:ss a'),
            h6astatusothsp: '',
            h8respondentname: '',
            h9relationship: '',
            h16hhstatus: '',
            h16hhstatusothsp: '',
            h17hhreligion: '',
            h18hhbpl: '',
            h19hheducation: '',
            h20hhoccupation: '',
            h21hhcaste: '',
            h22hhmaterials: '',
            h22hhmaterothsp: '',
            h22atoilettype: '',
            h24mobile: '',
            h26vaxfacilitytyp: '',
            h32avisits: '',
            h32bdateofvisit: '',
            h31intcomments: '',
            h27latitude: '',
            h28longitude: '',
            updatedTime: '',
			endTime: ''
        };

        this.styles = StyleSheet.create({
            container: {
                flex: 1,
                padding: 20,
                backgroundColor: '#ffffff',
            },
            title: {
                fontSize: 30,
                alignSelf: 'center',
                marginBottom: 30
            },
            buttonText: {
                fontSize: 18,
                color: 'white',
                alignSelf: 'center'
            },
            button: {
                height: 36,
                backgroundColor: '#48BBEC',
                borderColor: '#48BBEC',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
                alignSelf: 'stretch',
                justifyContent: 'center'
            }
        });
    }

    async openDatePicker(value) {
        const { params } = this.props.navigation.state;
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const newState = {};
                const dayV = `0${day}`.slice('-2');
                const monthV = `0${month + 1}`.slice('-2');
                newState[value] = `${dayV}-${monthV}-${year}`;
                this.setState(newState);
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message);
        }
    }

    _goHome() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToDashboard' });
    }
    onChange(value) {
        this.setState({ formValue: value });
    }
    getLocationDetails() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                this.setState({
                    accuracy: position.coords.accuracy,
                    h27latitude: position.coords.latitude,
                    h28longitude: position.coords.longitude
                });
            },
            (error) => console.log('location is not available'),
            { enableHighAccuracy: false, timeout: 30000 }
        );
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.props.navigation.setParams({ handleSubmit: this.onPress.bind(this), goHome: this._goHome.bind(this) });
		
        const householdSurveyData = realm.objects('SurveyInformation').filtered('AgeGroup="H" && status="saved" && HouseholdID=$0', params.HouseholdID);
        if (householdSurveyData.length > 0) {
            console.log('JSON.parse(JSON.stringify(householdSurveyData)).surveyData', JSON.parse(JSON.parse(JSON.stringify(householdSurveyData))[0].surveyData));
            const surveyDataFromDB = JSON.parse(JSON.parse(JSON.stringify(householdSurveyData))[0].surveyData);
            this.setState(surveyDataFromDB);
            this.setState({ editedField: true });
        }
    }

    validateRadioOptions() {
        const validation = [];
        const otherStateFields = ['accuracy', 'editedField', 'h1hhid', 'h6astatusothsp',
            'h8respondentname', 'h16hhstatusothsp', 'h22hhmaterothsp', 'h27latitude', 'h28longitude',
            'h31intcomments', 'h32bdateofvisit', 'updatedTime','endTime'];
        if (this.state.h6astatusvis1) {
            if (this.state.h6astatusvis1 !== '01') {
                _.forEach(Object.keys(this.state), (fieldKey) => {
                    validation[fieldKey] = true;
                });
            } else {
                _.forEach(Object.keys(this.state), (fieldKey) => {
                    if (otherStateFields.indexOf(fieldKey) === -1) {
                        if (!this.state[fieldKey] || (this.state[fieldKey] === -1)) {
                            if (this.state[fieldKey] === 0) {
                                validation[fieldKey] = true;
                            } else {
                                validation[fieldKey] = false;
                            }
                        } else {
                            validation[fieldKey] = true;
                        }
                    } else {
                        validation[fieldKey] = true;
                    }
                });
            }
        } else {
            validation.h6astatusvis1 = false;
        }
        console.log('validation', validation);
        return validation;
    }

    onPress() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        if (this.state.h6astatusvis1 === '01') {
            this.validate({
                h8respondentname: { required: true },
                h31intcomments: { required: true }
            });
        }
        if (this.state.h6astatusvis1 === '99') {
            this.validate({
                h6astatusothsp: { required: true },
            });
        }
        if (this.state.h16hhstatus === '99') {
            this.validate({
                h16hhstatusothsp: { required: true },
            });
        }
        if (this.state.h22hhmaterials === '99') {
            this.validate({
                h22hhmaterothsp: { required: true },
            });
        }
        /* if (this.state.h32avisits === '01') {
            this.validate({
                h22hhmaterothsp: { required: true },
            });
        } */

        const RadioValidations = this.validateRadioOptions();
        console.log('RadioValidations', RadioValidations);

        console.log('this.isFormValid()', this.isFormValid());
        console.log('error', this.getErrorMessages());
        console.log('RadioValidations.includes(false)', _.includes(_.values(RadioValidations), false));

        if (this.isFormValid() && !(_.includes(_.values(RadioValidations), false))) {
			this.state.h1hhid=params.HouseholdID;
			this.state.updatedTime=moment().format('DD-MM-YYYY h:mm:ss a');
            
            let surveyID;
            if (this.state.editedField) {
                surveyID = realm.objects('SurveyInformation').filtered('AgeGroup = "H" && status = "saved" && HouseholdID=$0', params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'saved' }, true);
                    ToastAndroid.show(
                        'Household Survey information updated',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    navigate('CompletedSurveyDetails');
                });
            } else {
				this.state.endTime=moment().format('DD-MM-YYYY h:mm:ss a');
                
				surveyID = realm.objects('SurveyInformation').filtered('AgeGroup = "H" && status = "open" && HouseholdID=$0', params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'inprogress' }, true);
                    ToastAndroid.show(
                        'Household Survey information saved',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    navigate('RandomListScreen');
                });
            }
        } else {
            Alert.alert(
                'Validation Error',
                'Mandatory Fields are missing',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        console.log('this.state', this.state);
        return (
            <ScrollView style={this.styles.container}>
                <View style={{ backgroundColor: '#4c9689', height: 50, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500', textAlign: 'center' }}>Household Characteristics (HC) Form</Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>1. Household ID</Text>
                    <FormInput
                        ref="h1hhid"
                        editable={false}
                        value={params.HouseholdID}
                    />
                </View>
                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                    <Text style={styles.headingLetter}>3. Status of interview</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal
                        radio_props={this.household_status}
                        initial={this.state.h6astatusvis1index === 0 ? 0 : (this.state.h6astatusvis1index ? this.state.h6astatusvis1index : -1)}
                        onPress={(value, index) => {
                            this.setState({ h6astatusvis1: value, h6astatusvis1index: index });
                        }}
                    />
                    {(this.state.h6astatusvis1 === '99') &&
                        <View>
                            <Text style={styles.headingLetter}>Others Specify</Text>
                            <FormInput
                                ref='h6astatusothsp'
                                value={this.state.h6astatusothsp}
                                onChangeText={(name) => this.setState({ h6astatusothsp: name })}
                            />
                        </View>
                    }
                </View >
                {this.state.h6astatusvis1 === '01' &&
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>4. Respondent name to household questionnaire</Text>
                            <FormInput
                                ref='h8respondentname'
                                value={this.state.h8respondentname}
                                onChangeText={(name) => this.setState({ h8respondentname: name })}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>5. Respondent relationship to head of household</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.relationship}
                                initial={this.state.h9relationshipindex === 0 ? 0 : (this.state.h9relationshipindex ? this.state.h9relationshipindex : -1)}
                                onPress={(value, index) => { this.setState({ h9relationship: value, h9relationshipindex: index });  }}
                            />
                        </View>
                        <View style={{ backgroundColor: '#4c9689', height: 50, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500', textAlign: 'center' }}>Household Information</Text>
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>8. What is the religion of the household?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.religion}
                                initial={this.state.h17hhreligionindex === 0 ? 0 : (this.state.h17hhreligionindex ? this.state.h17hhreligionindex : -1)}
                                onPress={(value, index) => { this.setState({ h17hhreligion: value, h17hhreligionindex: index });  }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>9. Does someone in the household have BPL card?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionList}
                                initial={this.state.h18hhbplindex === 0 ? 0 : (this.state.h18hhbplindex ? this.state.h18hhbplindex : -1)}
                                onPress={(value, index) => { this.setState({ h18hhbpl: value, h18hhbplindex: index });  }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>10. Head of household education</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.headofHouseholdEducation}
                                initial={this.state.h19hheducationindex === 0 ? 0 : (this.state.h19hheducationindex ? this.state.h19hheducationindex : -1)}
                                onPress={(value, index) => { this.setState({ h19hheducation: value, h19hheducationindex: index });  }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>11. Head of household Occupation</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.householdOccupation}
                                initial={this.state.h20hhoccupationindex === 0 ? 0 : (this.state.h20hhoccupationindex ? this.state.h20hhoccupationindex : -1)}
                                onPress={(value, index) => { this.setState({ h20hhoccupation: value, h20hhoccupationindex: index });  }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>12. What is your caste?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.caste}
                                initial={this.state.h21hhcasteindex === 0 ? 0 : (this.state.h21hhcasteindex ? this.state.h21hhcasteindex : -1)}
                                onPress={(value, index) => { this.setState({ h21hhcaste: value, h21hhcasteindex: index });  }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>7. Is household ?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.householdCategory}
                                initial={this.state.h16hhstatusindex === 0 ? 0 : (this.state.h16hhstatusindex ? this.state.h16hhstatusindex : -1)}
                                onPress={(value, index) => { this.setState({ h16hhstatus: value, h16hhstatusindex: index });  }}
                            />
                        </View>
                        {(this.state.h16hhstatus === '99') &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>7a. Other house status?</Text>
                                <FormInput
                                    ref="h16hhstatusothsp"
                                    value={this.state.h16hhstatusothsp}
                                    onChangeText={(name) => this.setState({ h16hhstatusothsp: name })}
                                />
                            </View>
                        }
                        <View style={{ backgroundColor: '#4c9689', height: 50, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500', textAlign: 'center' }}>Household Material and Assets</Text>
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>22. Housing materials</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.housingMaterial}
                                initial={this.state.h22hhmaterialsindex === 0 ? 0 : (this.state.h22hhmaterialsindex ? this.state.h22hhmaterialsindex : -1)}
                                onPress={(value, index) => { this.setState({ h22hhmaterials: value, h22hhmaterialsindex: index });  }}
                            />
                        </View>
                        {(this.state.h22hhmaterials == '99') &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>22. Others Specify</Text>
                                <FormInput
                                    ref="h22hhmaterothsp"
                                    value={this.state.h22hhmaterothsp}
                                    onChangeText={(name) => this.setState({ h22hhmaterothsp: name })}
                                />
                            </View>
                        }

                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>22A. Type of toilet household members use?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.toiletFacility}
                                initial={this.state.h22atoilettypeindex === 0 ? 0 : (this.state.h22atoilettypeindex ? this.state.h22atoilettypeindex : -1)}
                                onPress={(value, index) => { this.setState({ h22atoilettype: value, h22atoilettypeindex: index });  }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>24. Does the mother own a mobile phone?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListMother}
                                initial={this.state.h24mobileindex === 0 ? 0 : (this.state.h24mobileindex ? this.state.h24mobileindex : -1)}
                                onPress={(value, index) => { this.setState({ h24mobile: value, h24mobileindex: index });  }}
                            />
                        </View>
                        <View style={{ backgroundColor: '#4c9689', height: 50, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500', textAlign: 'center' }}>Nearby health facility &amp; health seeking behaviors</Text>
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>17. What type of health facility would you usually take your child to for vaccinations? </Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.healthFacility}
                                initial={this.state.h26vaxfacilitytypindex === 0 ? 0 : (this.state.h26vaxfacilitytypindex ? this.state.h26vaxfacilitytypindex : -1)}
                                onPress={(value, index) => { this.setState({ h26vaxfacilitytyp: value, h26vaxfacilitytypindex: index });  }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>32A. Number of visits made to complete the enrollment? </Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListOneTwo}
                                initial={this.state.h32avisitsindex === 0 ? 0 : (this.state.h32avisitsindex ? this.state.h32avisitsindex : -1)}
                                onPress={(value, index) => { this.setState({ h32avisits: value, h32avisitsindex: index });  }}
                            />
                        </View>
                        {(this.state.h32avisits == '02') &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>32b. Date of first visit?</Text>
                                <FormInput
                                    ref="h32bdateofvisit"
                                    value={this.state.h32bdateofvisit}
                                    onChangeText={(name) => this.setState({ h32bdateofvisit: name })}
                                    onFocus={() => {
                                        this.openDatePicker('h32bdateofvisit');
                                    }}
                                />
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>18. Interviewer's comments</Text>
                            <FormInput
                                ref="h31intcomments"
                                value={this.state.h31intcomments}
                                onChangeText={(name) => this.setState({ h31intcomments: name })}
                            />
                        </View>
                    </View>
                }
				<View>
                    <Button
                        buttonStyle={{ marginTop: 40, marginBottom: 15, backgroundColor: '#4c9689' }}
                        title='Get Location Details'
                        onPress={() =>
                            this.getLocationDetails()
                        }
                    />
                </View>
				<View style={{ marginBottom: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    Longitude = {this.state.h27latitude}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    Longitude = {this.state.h28longitude}
                </Text>
				</View>
            </ScrollView >
        );
    }
}
const styles = StyleSheet.create({
    headingLetter: {
        color: '#3E4A59',
        fontWeight: '700',
        fontSize: 22,
        marginLeft: 20,
        marginTop: 10,
    },
    headingLetterErr: {
        color: 'red',
        fontWeight: '700',
        fontSize: 22,
        marginLeft: 20,
        marginTop: 10,
    }
});
