import React from 'react';
import { StyleSheet, ScrollView, View, Alert, DatePickerAndroid, ToastAndroid } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import ValidationComponent from 'react-native-form-validator';
import RadioForm from 'react-native-simple-radio-button';
import realm from '../../providers/realm';
import { Button, FormInput, Text } from '../../components/PocketUI';


export default class WomenCampaignSurvey extends ValidationComponent {
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
        selectedTab: 'WomenCampaignSurvey'
    };

    async openDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const dayV = `0${day}`.slice('-2');
                const monthV = `0${month + 1}`.slice('-2');
                this.setState({ w3adobdt: `${dayV}-${monthV}-${year}`, selectedDate: `${year}${monthV}${dayV}` });
                const AgeDays = Math.floor(this.getAgeDays(this.state.w3adobdt));
                const AgeMonths = Math.floor(parseInt(AgeDays) / 30.4368);
                if (AgeMonths > 179 && AgeMonths < 600) {
                    this.setState({
                        eligible: true
                    });
                } else {
                    this.setState({
                        eligible: false
                    });
                }
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message);
        }
    }

    //Radio Button OPtions to be added
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.optionList = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '88', label: 'Dont Know' }];

        this.optionListBoolean = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' }];

        this.optionListConsent = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No, Refused due to Blood collection' },
            { value: '03', label: 'No, Refused due to Other reason' },
			{ value: '04', label: 'Locked house' }];

        this.optionListRelation = [
            { value: '01', label: 'Mother' },
            { value: '02', label: 'Father' },
            { value: '03', label: 'Grand Parent' }];

        this.maritalStatus = [
            { value: '01', label: 'Married' },
            { value: '02', label: 'Unmarried' },
            { value: '03', label: 'Separated' },
            { value: '04', label: 'Widowed' }
        ];

        this.mrdoseoptions = [
            { value: '01', label: 'Yes, Documented' },
            { value: '02', label: 'Yes, Reported' },
            { value: '03', label: 'No' },
            { value: '88', label: 'Dont Know' }
        ];

        this.bloodreasonoptions = [
            { value: '01', label: 'Not present' },
            { value: '02', label: 'Sickness' },
            { value: '03', label: 'Refusal' },
            { value: '99', label: 'Other, specify' }
        ];

        this.specimenmethodoptions = [
            { value: '01', label: 'One fingerprick' },
            { value: '02', label: 'Two fingerprick' },
            { value: '03', label: 'Venepuncture' }
        ];

        this.specimenqualityoptions = [
            { value: '01', label: 'Adequate' },
            { value: '02', label: 'Inadequate' }
        ];

        this.specimenproblemoptions = [
            { value: '01', label: 'No problem' },
            { value: '02', label: 'Could not be completed because participant was crying, moving too much, other reasons' },
            { value: '03', label: 'Participant or Guardian asked to stop' },
            { value: '99', label: 'Others, specify' }
        ];

        this.dbssampleoptions = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '03', label: 'NA' }
        ];

        this.spotsCollectedoptions = [
            { value: '01', label: '1' },
            { value: '02', label: '2' },
            { value: '03', label: '3' },
            { value: '04', label: '4' },
            { value: '05', label: '5' }
        ];

        this.adequateoptions = [
            { value: '01', label: '100%' },
            { value: '02', label: '75-99%' },
            { value: '03', label: '50-74%' },
            { value: '04', label: '<50%' },
            { value: '05', label: 'Not Collected' }
        ];

        this.dbsspecimenproblemoptions = [
            { value: '01', label: 'No problem' },
            { value: '02', label: 'Could not be completed because participant was crying, moving too much, other reasons' },
            { value: '03', label: 'Participant or guardian asked to stop' },
            { value: '04', label: 'Could not spot all five circles because blood flow was very slow or blood clotted' },
            { value: '99', label: 'Others, specify' }
        ];

        //Fieldname to be added
        this.state = {
            clusterID: '',
            editedField: false,
            eligible: true,
            selectedDate: '',
            surveyType: '',
            w2name: '',
            w2aconsent: '',
            w3dob: '',
            w3adobdt: '',
            w4age: '',
            w5maritalstat: '',
            w6children: '',
            w7livehhcampaign: '',
            w8mrcampaigndose: '',
            w9mrvaxhistory: '',
            w11intcomments: '',
            ws1scollect: '',
            ws1ascollectno: '',
            ws1bscollectoth: '',
            ws1scollecthow: '',
            ws4sspecid: '',
            ws5squal: '',
            ws6sproblem: '',
            ws6asprobsp: '',
            ws7dcollect: '',
            ws7adcollectno: '',
            ws7bdcollectoth: '',
            ws11dspots: '',
            ws12adqual1: '',
            ws12bdqual2: '',
            ws12cdqual3: '',
            ws12ddqual4: '',
            ws12edqual5: '',
            ws13dproblem: '',
            ws13adprobsp: '',
            ws15intcomments: ''
        };

        this.styles = StyleSheet.create({
            container: {
                flex: 1,
                marginTop: 50,
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
    getAgeDays() {
        const now = moment();
        const end = moment(this.state.selectedDate);
        const duration = moment.duration(now.diff(end));
        const days = duration.asDays();
        return days;
    }
    _goHome() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToDashboard' });
    }
    componentWillMount() {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        this.props.navigation.setParams({ handleSubmit: this.onPress.bind(this), goHome: this._goHome.bind(this) });
        const { params } = this.props.navigation.state;
        const surveyType = realm.objects('Cluster').filtered('status = "active"')[0].surveyType;
        const womenSurveyData = realm.objects('SurveyInformation').filtered('status = "saved" && Sno = $0 && AgeGroup = $1 && HouseholdID=$2', params.person.Sno, params.person.AgeGroup, params.HouseholdID);
        console.log('womenSurveyData', JSON.parse(JSON.stringify(womenSurveyData)));
        if (womenSurveyData.length > 0) {
            const surveyDataFromDB = JSON.parse(JSON.parse(JSON.stringify(womenSurveyData))[0].surveyData);
            this.setState(surveyDataFromDB);
            this.setState({ editedField: true });
        }
        this.setState({ surveyType, clusterID });
    }

    checkValidationField(fieldName, validation) {
        if (!this.state[fieldName] || (this.state[fieldName] === -1)) {
            if (this.state[fieldName] === 0) {
                validation[fieldName] = true;
            } else {
                validation[fieldName] = false;
            }
        } else {
            validation[fieldName] = true;
        }
    }

    validateRadioOptions() {
        const validation = [];
        const otherStateFields = ['editedField', 'eligible', 'w2name',
            'w4age', 'w11intcomment', 'ws1bscollectoth', 'ws6asprobsp', 'ws7bdcollectoth',
            'ws13adprobsp', 'ws15intcomments'];
        if (this.state.w2aconsent) {
            if (this.state.w2aconsent === '01') {
                this.checkValidationField('w3dob', validation);
                if (!this.state.eligible) {
                    _.forEach(_.keys(this.state), (fieldKey) => {
                        validation[fieldKey] = true;
                    });
                } else {
                    const generalOptions = ['w5maritalstat', 'w9mrvaxhistory'];
                    _.forEach(generalOptions, (fieldKey) => {
                        this.checkValidationField(fieldKey, validation);
                    });

                    if (this.state.surveyType === '02') {
                        const surveyTypeOptions = ['w7livehhcampaign', 'w8mrcampaigndose'];
                        _.forEach(surveyTypeOptions, (fieldKey) => {
                            this.checkValidationField(fieldKey, validation);
                        });
                    } else {
                        validation.w7livehhcampaign = validation.w8mrcampaigndose = true;
                    }
                    if (this.state.w2aconsent === '01') {
                        if (this.state.ws1scollect === '01') {
                            const capillarSampleCollected = ['ws1scollecthow', 'ws5squal', 'ws6sproblem'];
                            _.forEach(capillarSampleCollected, (fieldKey) => {
                                this.checkValidationField(fieldKey, validation);
                            });
                        } else if (this.state.ws1scollect === '02') {
                            this.checkValidationField('ws1ascollectno', validation);
                        } else {
                            validation.ws1scollect = false;
                        }
                        if (this.state.ws7dcollect === '01') {
                            const capillarSampleCollected = ['ws11dspots', 'ws12adqual1', 'ws12adqual2',
                                'ws12adqual3', 'ws12adqual4', 'ws12adqual5', 'ws13dproblem'];
                            _.forEach(capillarSampleCollected, (fieldKey) => {
                                this.checkValidationField(fieldKey, validation);
                            });
                        }
                        if (this.state.ws7dcollect === '02') {
                            this.checkValidationField('ws7adcollectno', validation);
                        }
                        if (this.state.ws7dcollect !== '02') {
                            validation.ws7adcollectno = true;
                        }
                    } else {
                        _.forEach(Object.keys(this.state), (fieldKey) => {
                            validation[fieldKey] = true;
                        });
                    }
                }
            } else {
                _.forEach(Object.keys(this.state), (fieldKey) => {
                    validation[fieldKey] = true;
                });
            }
        } else {
            validation.w2aconsent = false;
        }
        console.log('validation', validation);
        return validation;
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                this.setState({
                    accuracy: position.coords.accuracy,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => console.log('location is not available'),
            { enableHighAccuracy: false, timeout: 30000 }
        );
    }

    onChange(value) {
        this.setState({ formValue: value });
    }

    onPress() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        this.validate({
            w2name: { required: true }
        });
        if (this.state.w2aconsent === '01') {
            this.validate({
                w11intcomments: { required: true }
            });
            if (this.state.w3dob === '01') {
                this.validate({
                    w2name: { required: true }
                });
            }
            if (this.state.w3dob === '02') {
                this.validate({
                    w4age: { required: true }
                });
            }
            if (this.state.eligible) {
                if (this.state.w5maritalstat && this.state.w5maritalstat !== '02') {
                    this.validate({
                        w6children: { required: true }
                    });
                }
                if (this.state.ws1scollect === '01') {
                    if (this.state.ws6sproblem === '99') {
                        this.validate({
                            ws6asprobsp: { required: true }
                        });
                    }
                    this.validate({
                        ws15intcomments: { required: true }
                    });
                }
                if (this.state.ws1scollect === '02') {
                    if (this.state.ws1ascollectno === '99') {
                        this.validate({
                            ws1bscollectoth: { required: true }
                        });
                    }
                    this.validate({
                        ws15intcomments: { required: true }
                    });
                }
                if (this.state.ws7dcollect === '02') {
                    if (this.state.ws7adcollectno === '99') {
                        this.validate({
                            ws7bdcollectoth: { required: true }
                        });
                    }
                }
                if (this.state.ws7dcollect === '01') {
                    if (this.state.ws13dproblem === '99') {
                        this.validate({
                            ws13adprobsp: { required: true }
                        });
                    }
                }
            } else {

            }
        }


        const RadioValidations = this.validateRadioOptions();
        console.log('RadioValidations', RadioValidations);

        console.log('this.isFormValid()', this.isFormValid());
        console.log('error', this.getErrorMessages());
        console.log('RadioValidations.includes(false)', _.includes(_.values(RadioValidations), false));
        if (this.isFormValid() && !(_.includes(_.values(RadioValidations), false))) {
            this.setState({
                h1hhid: params.HouseholdID,
                updatedTime: moment().format('DD-MM-YYYY h:mm:ss a')
            });
            let surveyID;
            if (this.state.editedField) {
                console.log(JSON.parse(JSON.stringify(realm.objects('SurveyInformation').filtered('status="saved"'))));
                surveyID = realm.objects('SurveyInformation').filtered('status = "saved" && Sno = $0 && HouseholdID=$1 && AgeGroup=$2', params.person.Sno, params.HouseholdID, params.person.AgeGroup)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'saved' }, true);
                });
                if (this.state.ws1scollect === '01' || this.state.ws7dcollect === '01') {
                    this.addBloodSampleCount();
                } else {
                    this.removeBloodSampleCount();
                }
                ToastAndroid.show(
                    'Women campaign information updated',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                navigate('CompletedSurveyDetails');
            } else {
                surveyID = realm.objects('SurveyInformation').filtered('status = "open" && Sno = $0 && HouseholdID=$1 && AgeGroup=$2', params.person.Sno, params.HouseholdID, params.person.AgeGroup)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'inprogress' }, true);
                });
                if (this.state.ws1scollect === '01' || this.state.ws7dcollect === '01') {
                    this.addBloodSampleCount();
                }
                ToastAndroid.show(
                    'Women campaign Survey information saved',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                navigate('RandomListScreen');
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
    addBloodSampleCount() {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        const { params } = this.props.navigation.state;
        realm.write(() => {
            if (realm.objects('BloodSample')
                .filtered('Submitted = "active" && Type="C" && clusterID = $0 && Sno =$1', clusterID, params.Sno).length === 0) {
                realm.create('BloodSample', { id: new Date().getTime(), clusterID, Type: 'C', Sno: params.Sno });
            }
        });
    }
    removeBloodSampleCount() {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        const { params } = this.props.navigation.state;
        const bloodSampleData = realm.objects('BloodSample').filtered('Submitted = "active"  && Type="C" && clusterID = $0 && Sno =$1', clusterID, params.Sno);
        if (bloodSampleData.length > 0) {
            realm.write(() => {
                realm.delete(bloodSampleData);
            });
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView style={this.styles.container}>
                {/* <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetterErr}>{this.getErrorMessages()}</Text>
                </View> */}

                <View style={{ backgroundColor: '#a3a7a7', height: 50, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Women form for {params.person.Name} </Text>
                </View>
                <View style={{ backgroundColor: '#ebebeb', height: 120, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>Name: {params.person.Name}</Text>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>{params.person.AgeDis}</Text>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>Sex: {params.person.Sex}</Text>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>Sno: {params.person.Sno}</Text>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>1. Women's Full Name</Text>
                    <FormInput
                        ref="w2name"
                        value={this.state.w2name}
                        onChangeText={(w2name) => this.setState({ w2name })}
                    />
                </View>
                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                    <Text style={styles.headingLetter}>2a. Was the consent/assent taken for the woman?</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal
                        radio_props={this.optionListConsent}
                        initial={this.state.w2aconsentindex === 0 ? 0 : (this.state.w2aconsentindex ? this.state.w2aconsentindex : -1)}
                        onPress={(value, index) => { this.setState({ w2aconsent: value, w2aconsentindex: index }); console.log(this.state); }}
                    />
                </View>
                {this.state.w2aconsent === '01' &&
                    <View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>3. Do you know your date of birth?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListBoolean}
                                initial={this.state.w3dobindex === 0 ? 0 : (this.state.w3dobindex ? this.state.w3dobindex : -1)}
                                onPress={(value, index) => {
                                    this.setState({ w3dob: value, w3adobdt: '', w4age: '', w3dobindex: index, eligible: true });
									
                                }}
                            />
                        </View>
                        {this.state.w3dob === '01' &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>3A. Date of Birth</Text>
                                <FormInput
                                    ref="w3adobdt"
                                    value={this.state.w3adobdt}
                                    onFocus={() => {
                                        this.openDatePicker();
                                    }
                                    }
                                />
                            </View>
                        }
                        {this.state.w3dob === '02' &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>4. How old are you?(In completed years)</Text>
                                <FormInput
                                    ref="w4age"
                                    keyboardType='numeric'
                                    value={this.state.w4age}
                                    onChangeText={(w4age) => this.setState({ w4age })}
                                    onBlur={() => {
                                        const AgeMonths = Math.floor((this.state.w4age * 365.25) / 30.4368);
                                        if (AgeMonths > 179 && AgeMonths < 600) {
                                            this.setState({
                                                eligible: true
                                            });
                                        } else {
                                            this.setState({
                                                eligible: false
                                            });
                                        }
                                    }}
                                />
                            </View>
                        }
                        {(this.state.eligible) &&
                            <View>
                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                    <Text style={styles.headingLetter}>5. What is your current marital status?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.maritalStatus}
                                        initial={this.state.w5maritalstatindex === 0 ? 0 : (this.state.w5maritalstatindex ? this.state.w5maritalstatindex : -1)}
                                        onPress={(value, index) => { this.setState({ w5maritalstat: value, w5maritalstatindex: index }); console.log(this.state); }}
                                    />
                                </View>
                                {this.state.w5maritalstat !== '02' &&
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={styles.headingLetter}>6. How many living children do you have at this moment?</Text>
                                        <FormInput
                                            ref="w6children"
                                            keyboardType='numeric'
                                            maxLength={1}
                                            value={this.state.w6children}
                                            onChangeText={(w6children) => this.setState({ w6children })}
                                        />
                                    </View>
                                }
                                {this.state.surveyType === '02' &&
                                    <View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>7. Were you living in this household when the MR campaign was occuring?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionListBoolean}
                                                initial={this.state.w7livehhcampaignindex === 0 ? 0 : (this.state.w7livehhcampaignindex ? this.state.w7livehhcampaignindex : -1)}
                                                onPress={(value, index) => { this.setState({ w7livehhcampaign: value, w7livehhcampaignindex: index }); console.log(this.state); }}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>8. Did you receive a MR dose during the recent vaccination campaign?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.mrdoseoptions}
                                                initial={this.state.w8mrcampaigndoseindex === 0 ? 0 : (this.state.w8mrcampaigndoseindex ? this.state.w8mrcampaigndoseindex : -1)}
                                                onPress={(value, index) => { this.setState({ w8mrcampaigndose: value, w8mrcampaigndoseindex: index }); console.log(this.state); }}
                                            />
                                        </View>
                                    </View>
                                }
                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                    <Text style={styles.headingLetter}>9. Do you have any history of vaccines with rubella vaccine such as a Measles-Rubella(MR) or Measles-Mumps-Rubella(MMR) vaccine?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionList}
                                        initial={this.state.w9mrvaxhistoryindex === 0 ? 0 : (this.state.w9mrvaxhistoryindex ? this.state.w9mrvaxhistoryindex : -1)}
                                        onPress={(value, index) => { this.setState({ w9mrvaxhistory: value, w9mrvaxhistoryindex: index }); console.log(this.state); }}
                                    />
                                </View>
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            {(!this.state.eligible) &&
                                <Text style={styles.headingLetterErr}>Ineligible Candidate for  the Age group selected</Text>
                            }
                            <Text style={styles.headingLetter}>11. Interviewer's comment</Text>
                            <FormInput
                                ref="w11intcomments"
                                value={this.state.w11intcomments}
                                onChangeText={(name) => this.setState({ w11intcomments: name })}
                            />
                        </View>
                        {this.state.w2aconsent === '01' && this.state.eligible &&
                            <View>
                                <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>SPECIMEN COLLECTION</Text>
                                </View>

                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                    <Text style={styles.headingLetter}>1. Was a Capillary Liquid Blood sample collected?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionListBoolean}
                                        initial={this.state.ws1scollectindex === 0 ? 0 : (this.state.ws1scollectindex ? this.state.ws1scollectindex : -1)}
                                        onPress={(value, index) => {
                                            this.setState({ ws1scollect: value, ws1scollectindex: index });
                                            if (value === '01') {
                                                this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}S`;
                                            } else {
                                                this.state.specimenCapillaryID = '';
                                            }
                                        }}
                                    />
                                </View>

                                {this.state.ws1scollect === '02' &&
                                    <View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>1A. Specify reason?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.bloodreasonoptions}
                                                initial={this.state.ws1ascollectnoindex === 0 ? 0 : (this.state.ws1ascollectnoindex ? this.state.ws1ascollectnoindex : -1)}
                                                onPress={(value, index) => { this.setState({ ws1ascollectno: value, ws1ascollectnoindex: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        {this.state.ws1ascollectno === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>1B. Specify other reason</Text>
                                                <FormInput
                                                    ref="ws1bscollectoth"
                                                    value={this.state.ws1bscollectoth}
                                                    onChangeText={(ws1bscollectoth) => this.setState({ ws1bscollectoth })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.ws1scollect === '01' &&
                                    <View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>1C. How specimen was collected?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.specimenmethodoptions}
                                                initial={this.state.ws1scollecthowindex === 0 ? 0 : (this.state.ws1scollecthowindex ? this.state.ws1scollecthowindex : -1)}
                                                onPress={(value, index) => {
                                                    this.setState({ ws1scollecthow: value, ws1scollecthowindex: index });
                                                    if (value === '01' || value === '02') {
                                                        this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}S`;
                                                    } else {
                                                        this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}V`;
                                                    }
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.headingLetterErr}>{`Specimen ID: ${this.state.specimenCapillaryID}`} :: {`Collection Date & Time: ${moment().format('MM-DD-YYY h:mm:ss a')}`}</Text>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>5. Specimen quality?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.specimenqualityoptions}
                                                initial={this.state.ws5squalindex === 0 ? 0 : (this.state.ws5squalindex ? this.state.ws5squalindex : -1)}
                                                onPress={(value, index) => { this.setState({ ws5squal: value, ws5squalindex: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>6. Specimen collection problem?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.specimenproblemoptions}
                                                initial={this.state.ws6sproblemindex === 0 ? 0 : (this.state.ws6sproblemindex ? this.state.ws6sproblemindex : -1)}
                                                onPress={(value, index) => { this.setState({ ws6sproblem: value, ws6sproblemindex: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        {this.state.ws6sproblem === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>6A. Specify other reason</Text>
                                                <FormInput
                                                    ref="ws6asprobsp"
                                                    value={this.state.ws6asprobsp}
                                                    onChangeText={(ws6asprobsp) => this.setState({ ws6asprobsp })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                    <Text style={styles.headingLetter}>7. Was a DBS sample collected?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.dbssampleoptions}
                                        initial={this.state.ws7dcollectindex === 0 ? 0 : (this.state.ws7dcollectindex ? this.state.ws7dcollectindex : -1)}
                                        onPress={(value, index) => {
                                            this.setState({ ws7dcollect: value, ws7dcollectindex: index });
                                            if (value === '01') {
                                                this.state.specimenDBSID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}D`;
                                            } else {
                                                this.state.specimenDBSID = '';
                                            }
                                        }}
                                    />
                                </View>
                                {this.state.ws7dcollect === '02' &&
                                    <View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>7A. Specify reason?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.bloodreasonoptions}
                                                initial={this.state.ws7adcollectnoindex === 0 ? 0 : (this.state.ws7adcollectnoindex ? this.state.ws7adcollectnoindex : -1)}
                                                onPress={(value, index) => { this.setState({ ws7adcollectno: value, ws7adcollectnoindex: index }); console.log(this.state); }}
                                            />
                                        </View>
                                        {this.state.ws7adcollectno === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>7B. Specify other reason</Text>
                                                <FormInput
                                                    ref="ws7bdcollectoth"
                                                    value={this.state.ws7bdcollectoth}
                                                    onChangeText={(ws7bdcollectoth) => this.setState({ ws7bdcollectoth })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.ws7dcollect === '01' &&
                                    <View>
                                        <Text style={styles.headingLetterErr}>{`Specimen ID: ${this.state.specimenDBSID}`} :: {`Collection Date & Time: ${moment().format('MM-DD-YYY h:mm:ss a')}`}</Text>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>11. Number of spots collected?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.spotsCollectedoptions}
                                                initial={this.state.ws11dspotsindex === 0 ? 0 : (this.state.ws11dspotsindex ? this.state.ws11dspotsindex : -1)}
                                                onPress={(value, index) => { this.setState({ ws11dspots: value, ws11dspotsindex: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>12A. SPECIMEN QUALITY DBS1?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.ws12adqual1index === 0 ? 0 : (this.state.ws12adqual1index ? this.state.ws12adqual1index : -1)}
                                                onPress={(value, index) => { this.setState({ ws12adqual1: value, ws12adqual1index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>12B. SPECIMEN QUALITY DBS2?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.ws12adqual2index === 0 ? 0 : (this.state.ws12adqual2index ? this.state.ws12adqual2index : -1)}
                                                onPress={(value, index) => { this.setState({ ws12adqual2: value, ws12adqual2index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>12C. SPECIMEN QUALITY DBS3?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.ws12adqual3index === 0 ? 0 : (this.state.ws12adqual3index ? this.state.ws12adqual3index : -1)}
                                                onPress={(value, index) => { this.setState({ ws12adqual3: value, ws12adqual3index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>12D. SPECIMEN QUALITY DBS4?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.ws12adqual4index === 0 ? 0 : (this.state.ws12adqual4index ? this.state.ws12adqual4index : -1)}
                                                onPress={(value, index) => { this.setState({ ws12adqual4: value, ws12adqual4index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>12E. SPECIMEN QUALITY DBS5?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.ws12adqual5index === 0 ? 0 : (this.state.ws12adqual5index ? this.state.ws12adqual5index : -1)}
                                                onPress={(value, index) => { this.setState({ ws12adqual5: value, ws12adqual5index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>13. Specimen collection problem?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.dbsspecimenproblemoptions}
                                                initial={this.state.ws13dproblemindex === 0 ? 0 : (this.state.ws13dproblemindex ? this.state.ws13dproblemindex : -1)}
                                                onPress={(value, index) => { this.setState({ ws13dproblem: value, ws13dproblemindex: index }); console.log(this.state); }}
                                            />
                                        </View>
                                        {this.state.ws13dproblem === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>13A. Specify other reason</Text>
                                                <FormInput
                                                    ref="ws13adprobsp"
                                                    value={this.state.ws13adprobsp}
                                                    onChangeText={(ws13adprobsp) => this.setState({ ws13adprobsp })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                            </View>
                        }
                        {(this.state.eligible) &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>15. Interviewer observation (Related to Blood Collection)</Text>
                                <FormInput
                                    ref="ws15intcomments"
                                    value={this.state.ws15intcomments}
                                    onChangeText={(ws15intcomments) => this.setState({ ws15intcomments })}
                                />
                            </View>
                        }
                    </View>
                }
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
        color: '#ec1b2e',
        fontWeight: '700',
        fontSize: 22,
        marginLeft: 20,
        marginTop: 10,
    }
});
