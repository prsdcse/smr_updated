import React from 'react';
import { StyleSheet, ScrollView, View, Alert, DatePickerAndroid, ToastAndroid } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import ValidationComponent from 'react-native-form-validator';
import RadioForm from 'react-native-simple-radio-button';
import realm from '../../providers/realm';
import { Button, FormInput, Text } from '../../components/PocketUI';


export default class ChildCampaignSurvey extends ValidationComponent {
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
                    buttonStyle={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#4c9689',
                        marginRight: 10
                    }}
                    fontSize={25}
                    title='Home'
                    onPress={params.goHome}
                />
            )
        };
    }
    state = {
        selectedTab: 'ChildCampaignSurvey'
    };
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
            { value: '03', label: 'Grand Parent' },
            { value: '04', label: 'Uncle,Aunt' },
            { value: '99', label: 'Others' }
        ];

        this.educationStatus = [
            { value: '01', label: 'Professional or honors' },
            { value: '02', label: 'Graduate' },
            { value: '03', label: 'Senior/Higher Secondary' },
            { value: '04', label: 'High School Certificate' },
            { value: '05', label: 'Middle School Certificate' },
            { value: '06', label: 'Primary School Certificate' },
            { value: '07', label: 'Illiterate' },
            { value: '88', label: 'Don’t know' }

        ];

        this.ocuupationStatus = [
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

        this.champaignInfoStatus = [
            { value: '01', label: 'local Health Worker (ASHA or AWW)' },
            { value: '02', label: 'anm' },
            { value: '03', label: 'poster/ Banner' },
            { value: '04', label: 'radio' },
            { value: '05', label: 'tv' },
            { value: '06', label: 'newspaper' },
            { value: '07', label: 'cell Phone SMS' },
            { value: '08', label: 'What`s App' },
            { value: '09', label: 'facebook' },
            { value: '10', label: 'other Social Media' },
            { value: '11', label: 'neighbor' },
            { value: '12', label: 'miking' },
            { value: '13', label: 'community Leder/Village Head' },
            { value: '14', label: 'religious Sources' },
            { value: '15', label: 'school Authorities' },
            { value: '99', label: 'others ' },

        ];

        this.schoolStatus = [
            { value: '01', label: 'government School' },
            { value: '02', label: 'private School' },
            { value: '03', label: 'madrassa Or Other Relligious School' },
            { value: '04', label: 'does Not Go To School' },
            { value: '05', label: 'not Applicable' },

        ];

        this.receiveVaccineStatus = [
            { value: '01', label: 'school' },
            { value: '02', label: 'government Health Facility site (like-PHC/CHC/SDH/DH/MC etc..)' },
            { value: '03', label: 'government site- outreach session (like, HSC/AWW/Panchayat Bhawan)' },
            { value: '04', label: 'private provider (like, Private practitioner /Private hospitals/Nursing homes etc..)' },
            { value: '88', label: 'Don’t know' },
            { value: '99', label: 'others' },

        ];

        this.vaccineCardStatus = [
            { value: '01', label: 'yes Card Available' },
            { value: '02', label: 'yes But The Card Is Lost' },
            { value: '03', label: 'no' },
            { value: '88', label: 'Don’t know' }

        ];

        this.notReceiveVaccineStatus = [
            { value: '01', label: 'unaware of MR Vaccination Campaign' },
            { value: '02', label: 'did Not Know Where To Go For Vaccination' },
            { value: '03', label: 'no Vaccination Conducted At School' },
            { value: '04', label: 'did Not Receive Any Communication From School' },
            { value: '05', label: 'absent At School On Immunization Day' },
            { value: '06', label: 'already Received Measles/Rubella Vaccines' },
            { value: '07', label: 'inconvenient Timing Of Session' },
            { value: '08', label: 'long Waiting Time At The Session Site' },
            { value: '09', label: 'immunization Site Too Far Away' },
            { value: '10', label: 'went To RI Site But Turned Away' },
            { value: '11', label: 'child Sick And Health Worker Unwilling To Vaccinate Child' },
            { value: '12', label: 'fear Of Pain And Other Side Effects From Injection' },
            { value: '13', label: 'child Sick And Caregiver Unwilling To Let Child Be Vaccinated' },
            { value: '14', label: 'no Faith/Don’t Believe In Vaccination' },
            { value: '15', label: 'no Faith In Government Immunization' },
            { value: '16', label: 'heard From Community Members That Vaccine May Harm The Child ' },
            { value: '17', label: 'heard From Religious Sources That Vaccine May Harm The Child ' },
            { value: '18', label: 'heard From Whatsapp That Vaccine May Harm The Child ' },
            { value: '19', label: 'heard From Facebook That Vaccine May Harm The Child' },
            { value: '20', label: 'heard From Other Social Media That Vaccine May Harm The Child' },
            { value: '21', label: 'heard That Vaccine May Harm The Child From Print Media' },
            { value: '22', label: 'heard That Vaccine May Harm The Child From Electronic Media' },
            { value: '23', label: 'family Doctor Advised Against/Pediatrician Advised Against' },
            { value: '24', label: 'ineligible' },
            { value: '88', label: 'Don’t know' },
            { value: '99', label: 'others ' },


        ];

        this.facilityStatus = [
            { value: '01', label: 'private Facility' },
            { value: '02', label: 'public Facility' },
            { value: '88', label: 'don’t Know' }

        ];

        this.immunineCardStatus = [
            { value: '01', label: 'yes, Shows Card' },
            { value: '02', label: 'yes, But Does Not Show/Find Card' },
            { value: '03', label: 'No' }

        ];

        this.vaccineByCardStatus = [
            { value: '01', label: 'Yes, received' },
            { value: '02', label: 'Yes, date not legible' },
            { value: '03', label: 'Yes, recall for this vaccine' },
            { value: '04', label: 'No' }
        ];

        this.vaccineByCardStatusNA = [
            { value: '01', label: 'Yes, received' },
            { value: '02', label: 'Yes, date not legible' },
            { value: '03', label: 'Yes, recall for this vaccine' },
            { value: '04', label: 'No' },
            { value: '05', label: 'NA' }
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
			startTime: moment().format('DD-MM-YYYY h:mm:ss a'),
            selectedDate: '',
            surveyType: '',
            c2name: '',
            c3dob: '',
            c9adobdt: '',
            c10age: '',
            c3areason: '',
            c4resname: '',
            c5resrelation: '',
            c6amomalive: '',
            c6bmomage: '',
            c7momeducation: '',
            c8momoccupation: '',
            c11campaignlive: '',
            c12campaignaware: '',
            c13campaignhear1: '',
            c13campaignhear2: '',
            c13campaignhear3: '',
            c13aschool: '',
            c14campaignmrrec: '',
            c15campaignlocat: '',
            c15campaignlocatsp: '',
            c16campaigncard: '',
            c17campaigndose: '',
            c18reason1: '',
            c18reason2: '',
            c18reason3: '',
            c18reason4: '',
            c19bmcvroutrecfac: '',
            c19mcvroutrec: '',
            c19amcvroutrecdose: '',
            c20mcvcampaign: '',
            c20amcvcampaigndose: '',
            c20bmcvcampaignage: '',
            c21immcard: '',
            c22mcvdoc1: '',
            c22bmcvday1: '',
            c22cmcvdoc1rub: '',
            c23amcvdoc2: '',
            c23bmcvday1: '',
            c23cmcvdoc2rub: '',
            c24abcgdoc: '',
            c24bhepatitis: '',
            c24bhepatitisday: '',
            c24abcgday: '',
            c24bopv0doc: '',
            c24bopv0day: '',
            c24fopv1doc: '',
            c24fopvday1: '',
            c24gopv2doc: '',
            c24gopvday2: '',
            c24hopv3doc: '',
            c24hopvday3: '',
            c24gipvdoc: '',
            c24gipvdocday: '',
            c24cpenta1doc: '',
            c24cpentaday1: '',
            c24dpenta2doc: '',
            c24dpentaday1: '',
            c24epenta3doc: '',
            c24epentaday3: '',
            c24ipcv1doc: '',
            c24ipcvday1: '',
            c24jpcv2doc: '',
            c24jpcvday2: '',
            c24kpcv3doc: '',
            c24kpcvday3: '',
            c24krota1: '',
            c24krota1day: '',
            c24lrota2: '',
            c24lrot2day: '',
            c24mrota3: '',
            c24mrota3day: '',
            c24nje1: '',
            c24nje1day: '',
            c24oje2: '',
            c24oje2day: '',
            c25abcg: '',
            c25bhepatitis: '',
            c25cpolio: '',
            c25dopv: '',
            c25dopvdose: '',
            c29aipv: '',
            c30apenta: '',
            c30apentadose: '',
            c31arota: '',
            c31arotadose: '',
            c32aje: '',
            c32ajedose: '',
            c26intcomments: '',
            cs1scollect: '',
            cs1ascollectno: '',
            cs1bscollectoth: '',
            cs1scollecthow: '',
            cs4sspecid: '',
            cs5squal: '',
            cs6sproblem: '',
            cs6asprobsp: '',
            cs7dcollect: '',
            cs7adcollectno: '',
            cs7bdcollectoth: '',
            cs10dspecid: '',
            cs11dspots: '',
            cs12adqual1: '',
            cs12adqual2: '',
            cs12adqual3: '',
            cs12adqual4: '',
            cs12adqual5: '',
            cs13dproblem: '',
            cs13adprobsp: '',
            cs15intcomments: '',
            updatedTime: '',
			endTime: ''
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
    async openDatePicker(value) {
        const { params } = this.props.navigation.state;
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const dayV = `0${day}`.slice('-2');
                const monthV = `0${month + 1}`.slice('-2');

                if (value === 'c9adobdt') {
                    const newState = {};
                    newState[value] = `${dayV}-${monthV}-${year}`;
                    newState.selectedDate = `${year}${monthV}${dayV}`;
                    this.setState(newState);
                    const AgeDays = Math.floor(this.getAgeDays(this.state.c9adobdt));
                    const AgeMonths = Math.floor(parseInt(AgeDays) / 30.4368);
                    if (params.person.AgeGroup === 'B') {
                        if (AgeMonths > 59 && AgeMonths < 180) {
                            this.setState({
                                eligible: true
                            });
                        } else {
                            this.setState({
                                eligible: false
                            });
                        }
                    } else if (AgeMonths > 8 && AgeMonths < 60) {
                        this.setState({
                            eligible: true
                        });
                    } else {
                        this.setState({
                            eligible: false
                        });
                    }
                } else {
                    const newState = {};
                    newState[value] = `${dayV}-${monthV}-${year}`;
                    this.setState(newState);
                }
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message);
        }
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
        console.log(params);
        const surveyType = realm.objects('Cluster').filtered('status = "active"')[0].surveyType;
        const childSurveyData = realm.objects('SurveyInformation').filtered('status = "saved" && Sno = $0 && HouseholdID=$1 && AgeGroup=$2', params.person.Sno, params.HouseholdID, params.person.AgeGroup);
        if (childSurveyData.length > 0) {
            const surveyDataFromDB = JSON.parse(JSON.parse(JSON.stringify(childSurveyData))[0].surveyData);
            this.setState(surveyDataFromDB);
            this.setState({ editedField: true });
        }
        this.setState({ surveyType, clusterID});
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
            () => console.log('location is not available'),
            { enableHighAccuracy: false, timeout: 30000 }
        );
    }

    onChange(value) {
        this.setState({ formValue: value });
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
        const { params } = this.props.navigation.state;
        const validation = [];
        const otherStateFields = ['c2name', 'c3dob', 'c9adobdt', 'c10age',
            'c3areason', 'c4resname', 'c15campaignlocatsp', 'c22bmcvday1', 'c23bmcvday1',
            'c24abcgday', 'c24bhepatitisday', 'c24bopv0day', 'c24fopvday1', 'c24gopvday2', 'c24hopvday3', 'c24gipvdocday', 'c24cpentaday1', 'c24dpentaday1', 'c24epentaday3',
            'c24krota1day', 'c24lrot2day', 'c24mrota3day', 'c24nje1day', 'c24oje2day', 'c25dopvdose', 'c30apentadose', 'c31arotadose', 'c32ajedose', 'c26intcomments', 'cs1bscollectoth',
            'cs4sspecid', 'cs6asprobsp', 'cs7bdcollectoth', 'cs10dspecid', 'cs13adprobsp', 'cs15intcomments','endTime'];
        if (this.state.c3dob) {
        } else {
            validation.c3dob = false;
        }
        if (this.state.eligible) {
            this.checkValidationField('c3areason', validation);
            if (this.state.c3areason === '01') {
                const consetValues = ['c5resrelation', 'c6amomalive'];
                _.forEach(consetValues, (fieldKey) => {
                    this.checkValidationField(fieldKey, validation);
                });
                if (this.state.c6amomalive === '01') {
                    const momAliveVal = ['c7momeducation', 'c8momoccupation'];
                    _.forEach(momAliveVal, (fieldKey) => {
                        this.checkValidationField(fieldKey, validation);
                    });
                }
                if (this.state.surveyType === '02') {
                    const surveyTypeOptions = ['c11campaignlive', 'c12campaignaware',
                        'c13campaignhear1', 'c13campaignhear2', 'c13campaignhear3',
                        'c13aschool', 'c14campaignmrrec', 'c15campaignlocat', 'c16campaigncard', 'c17campaigndose'];
                    _.forEach(surveyTypeOptions, (fieldKey) => {
                        this.checkValidationField(fieldKey, validation);
                    });
                    if (this.state.c14campaignmrrec === '02') {
                        const campaignReason = ['c18reason1', 'c18reason2', 'c18reason3', 'c18reason4'];
                        _.forEach(campaignReason, (fieldKey) => {
                            this.checkValidationField(fieldKey, validation);
                        });
                    }
                }
                if (params.person.AgeGroup == 'A') {
                    this.checkValidationField('c19mcvroutrec', validation);
                    if (this.state.c19mcvroutrec == '01') {
                        this.checkValidationField('c19bmcvroutrecfac', validation);
                    }
                }
                if (this.state.surveyType === '01') {
                    this.checkValidationField('c20mcvcampaign', validation);
                }
                if (params.person.AgeGroup === 'A') {
                    this.checkValidationField('c21immcard', validation);
                    if (this.state.c21immcard === '01') {
                        const cardAvailableVal = ['c22mcvdoc1', 'c24abcgdoc', 'c24bhepatitis', 'c24bopv0doc', 'c24fopv1doc', 'c24gopv2doc',
                            'c24hopv3doc', 'c24gipvdoc', 'c24cpenta1doc', 'c24dpenta2doc', 'c24epenta3doc',
                            'c24krota1', 'c24lrota2', 'c24mrota3', 'c24nje1', 'c24oje2'];
                        _.forEach(cardAvailableVal, (fieldKey) => {
                            this.checkValidationField(fieldKey, validation);
                        });
                        if (this.state.c22mcvdoc1 === '01' || this.state.c22mcvdoc1 === '02') {
                            this.checkValidationField('c22cmcvdoc1rub', validation);
                        }
                        this.checkValidationField('c23amcvdoc2', validation);
                        if (this.state.c23amcvdoc2 === '01' || this.state.c23amcvdoc2 === '02') {
                            this.checkValidationField('c23cmcvdoc2rub', validation);
                        }
                    } else {
                        const cardNotAvailableVal = ['c25abcg', 'c25bhepatitis', 'c25cpolio', 'c25dopv', 'c29aipv', 'c30apenta',
                            'c31arota', 'c32aje'];
                        _.forEach(cardNotAvailableVal, (fieldKey) => {
                            this.checkValidationField(fieldKey, validation);
                        });
                    }
                }
                if (this.state.cs1scollect === '01') {
                    const capillarSampleCollected = ['cs1scollecthow', 'cs5squal', 'cs6sproblem'];
                    _.forEach(capillarSampleCollected, (fieldKey) => {
                        this.checkValidationField(fieldKey, validation);
                    });
                } else if (this.state.cs1scollect === '02') {
                    this.checkValidationField('cs1ascollectno', validation);
                } else {
                    validation.cs1scollect = false;
                }
                if (this.state.cs7dcollect === '01') {
                    const capillarSampleCollected = ['cs11dspots', 'cs12adqual1', 'cs12adqual2',
                        'cs12adqual3', 'cs12adqual4', 'cs12adqual5', 'cs13dproblem'];
                    _.forEach(capillarSampleCollected, (fieldKey) => {
                        this.checkValidationField(fieldKey, validation);
                    });
                }
                if (this.state.cs7dcollect === '02') {
                    this.checkValidationField('cs7adcollectno', validation);
                }
                if (this.state.cs7dcollect !== '02') {
                    validation.cs7adcollectno = true;
                }
            }
        } else {
            _.forEach(_.keys(this.state), (fieldKey) => {
                validation[fieldKey] = true;
            });
        }
        console.log('validation', validation);
        return validation;
    }

    onPress() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;

        this.validate({
            c2name: { required: true }
        });
        if (this.state.c3areason === '01') {
            this.validate({
                c26intcomments: { required: true }
            });

            if (this.state.c3dob === '01') {
                this.validate({
                    c9adobdt: { required: true }
                });
            }
            if (this.state.c3dob === '02') {
                this.validate({
                    c10age: { required: true }
                });
            }
            if (this.state.eligible) {
                if (this.state.c3areason === '01') {
                    this.validate({
                        c4resname: { required: true }
                    });
                }
                if (this.state.c6amomalive === '01') {
                    this.validate({
                        c6bmomage: { required: true }
                    });
                }
                if (this.state.c15campaignlocat === '99') {
                    this.validate({
                        c15campaignlocatsp: { required: true }
                    });
                }
                if (this.state.c19bmcvroutrecfac === '01') {
                    this.validate({
                        c15campaignlocatsp: { required: true }
                    });
                }
                if (this.state.c22mcvdoc1 === '01') {
                    this.validate({
                        c22bmcvday1: { required: true }
                    });
                }
                if (this.state.c23amcvdoc2 === '01') {
                    this.validate({
                        c23bmcvday1: { required: true }
                    });
                }
                if (this.state.c24abcgdoc === '01') {
                    this.validate({
                        c24abcgday: { required: true }
                    });
                }
                if (this.state.c24bhepatitis === '01') {
                    this.validate({
                        c24bhepatitisday: { required: true }
                    });
                }
                if (this.state.c24bopv0doc === '01') {
                    this.validate({
                        c24bopv0day: { required: true }
                    });
                }
                if (this.state.c24fopv1doc === '01') {
                    this.validate({
                        c24fopvday1: { required: true }
                    });
                }
                if (this.state.c24gopv2doc === '01') {
                    this.validate({
                        c24gopvday2: { required: true }
                    });
                }
                if (this.state.c24gipvdoc === '01') {
                    this.validate({
                        c24gipvdocday: { required: true }
                    });
                }
                if (this.state.c24cpenta1doc === '01') {
                    this.validate({
                        c24cpentaday1: { required: true }
                    });
                }
                if (this.state.c24dpenta2doc === '01') {
                    this.validate({
                        c24dpentaday1: { required: true }
                    });
                }
                if (this.state.c24epenta3doc === '01') {
                    this.validate({
                        c24epentaday3: { required: true }
                    });
                }
                if (this.state.c24krota1 === '01') {
                    this.validate({
                        c24krota1day: { required: true }
                    });
                }
                if (this.state.c24lrota2 === '01') {
                    this.validate({
                        c24lrot2day: { required: true }
                    });
                }
                if (this.state.c24mrota3 === '01') {
                    this.validate({
                        c24mrota3day: { required: true }
                    });
                }
                if (this.state.c24nje1 === '01') {
                    this.validate({
                        c24nje1day: { required: true }
                    });
                }
                if (this.state.c24oje2 === '01') {
                    this.validate({
                        c24oje2day: { required: true }
                    });
                }
                if (this.state.c25dopv === '01') {
                    this.validate({
                        c25dopvdose: { required: true }
                    });
                }
                if (this.state.c30apenta === '01') {
                    this.validate({
                        c30apentadose: { required: true }
                    });
                }
                if (this.state.c31arota === '01') {
                    this.validate({
                        c31arotadose: { required: true }
                    });
                }
                if (this.state.c32aje === '01') {
                    this.validate({
                        c32ajedose: { required: true }
                    });
                }

                if (this.state.cs1scollect === '01') {
                    if (this.state.cs6sproblem === '99') {
                        this.validate({
                            cs6asprobsp: { required: true }
                        });
                    }
                    this.validate({
                        cs15intcomments: { required: true }
                    });
                }
                if (this.state.cs1scollect === '02') {
                    if (this.state.cs1ascollectno === '99') {
                        this.validate({
                            cs1bscollectoth: { required: true }
                        });
                    }
                    this.validate({
                        cs15intcomments: { required: true }
                    });
                }
                if (this.state.cs7dcollect === '02') {
                    if (this.state.cs7adcollectno === '99') {
                        this.validate({
                            cs7bdcollectoth: { required: true }
                        });
                    }
                }
                if (this.state.cs7dcollect === '01') {
                    if (this.state.cs13dproblem === '99') {
                        this.validate({
                            cs13adprobsp: { required: true }
                        });
                    }
                }
            }
			else {

            }
        }

        const RadioValidations = this.validateRadioOptions();
        console.log('RadioValidations', RadioValidations);

        console.log('this.isFormValid()', this.isFormValid());
        console.log('error', this.getErrorMessages());
        console.log('RadioValidations.includes(false)', _.includes(_.values(RadioValidations), false));
        if (this.isFormValid() && !(_.includes(_.values(RadioValidations), false))) {
			this.state.updatedTime=moment().format('DD-MM-YYYY h:mm:ss a');
			this.state.h1hhid=params.HouseholdID;
            
            let surveyID;
            if (this.state.editedField) {
                surveyID = realm.objects('SurveyInformation').filtered('status = "saved" && Sno = $0 && AgeGroup = $1 && HouseholdID=$2', params.person.Sno, params.person.AgeGroup, params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'saved' }, true);
                });
                if (this.state.cs1scollect === '01' || this.state.cs7dcollect === '01') {
                    this.addBloodSampleCount(params.person.AgeGroup);
                } else {
                    this.removeBloodSampleCount(params.person.AgeGroup);
                }
                ToastAndroid.show(
                    'Child campaign information updated',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                navigate('CompletedSurveyDetails');
            } else {
				this.state.endTime= moment().format('DD-MM-YYYY h:mm:ss a');
                surveyID = realm.objects('SurveyInformation').filtered('status = "open" && Sno = $0 && AgeGroup = $1 && HouseholdID=$2', params.person.Sno, params.person.AgeGroup, params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'inprogress' }, true);
                });
                if (this.state.cs1scollect === '01' || this.state.cs7dcollect === '01') {
                    this.addBloodSampleCount(params.person.AgeGroup);
                }
                ToastAndroid.show(
                    'Child campaign information saved',
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
    addBloodSampleCount(AgeGroup) {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        const { params } = this.props.navigation.state;
        realm.write(() => {
            if (AgeGroup === 'A') {
                if (realm.objects('BloodSample')
                    .filtered('Submitted = "active" && Type="A" && clusterID = $0 && Sno =$1', clusterID, params.person.Sno).length === 0) {
                    realm.create('BloodSample', { id: new Date().getTime(), clusterID, Type: 'A', Sno: params.person.Sno });
                }
            } else if (realm.objects('BloodSample').filtered('Submitted = "active" && Type="B" && clusterID = $0 && Sno =$1', clusterID, params.person.Sno).length === 0) {
                realm.create('BloodSample', { id: new Date().getTime(), clusterID, Type: 'B', Sno: params.person.Sno });
            }
        });
    }
    removeBloodSampleCount(AgeGroup) {
        const { params } = this.props.navigation.state;
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        if (AgeGroup === 'A') {
            const bloodSampleData = realm.objects('BloodSample').filtered('Submitted = "active"  && Type="A" && clusterID = $0 && Sno =$1', clusterID, params.person.Sno);
            if (bloodSampleData.length > 0) {
                realm.write(() => {
                    realm.delete(bloodSampleData);
                });
            }
        } else {
            const bloodSampleData = realm.objects('BloodSample').filtered('Submitted = "active"  && Type="B" && clusterID = $0 && Sno =$1', clusterID, params.person.Sno);
            if (bloodSampleData.length > 0) {
                realm.write(() => {
                    realm.delete(bloodSampleData);
                });
            }
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        console.log(params.person);
        return (
            <ScrollView style={this.styles.container}>
                {/* <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetterErr}>{this.getErrorMessages()}</Text>
                </View> */}

                <View style={{ backgroundColor: '#a3a7a7', height: 50, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Child Form for {params.person.Name}</Text>
                </View>
                <View style={{ backgroundColor: '#ebebeb', height: 120, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>Name: {params.person.Name}</Text>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>{params.person.AgeDis}</Text>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>Sex: {params.person.Sex}</Text>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>Sno: {params.person.Sno}</Text>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>2. Child Full Name</Text>
                    <FormInput
                        ref="c2name"
                        value={this.state.c2name}
                        onChangeText={(name) => this.setState({ c2name: name })}
                    />
                </View>
                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                    <Text style={styles.headingLetter}>9. Do you know date of birth for the child?</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal
                        radio_props={this.optionListBoolean}
                        initial={this.state.c3dobindex === 0 ? 0 : (this.state.c3dobindex ? this.state.c3dobindex : -1)}
                        onPress={(value, index) => {
                            this.setState({ c3dob: value, c9adobdt: '', c10age: '', c3dobindex: index, eligible: true });
                        }}
                    />
                </View >
                {this.state.c3dob === '01' &&
                    <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                        <Text style={styles.headingLetter}>9A. On what day month and year was the child born?</Text>
                        <FormInput
                            value={this.state.c9adobdt}
                            onChangeText={(c9adobdt) => this.setState({ c9adobdt })}
                            onFocus={() => {
                                this.openDatePicker('c9adobdt');
                            }}
                        />
                    </View>
                }

                {this.state.c3dob === '02' &&
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.headingLetter}>10. How old is the child?</Text>
                        <FormInput
                            keyboardType='numeric'
                            value={this.state.c10age}
                            onChangeText={(c10age) => this.setState({ c10age })}
                            onBlur={() => {
                                const AgeMonths = Math.floor((this.state.c10age * 365.25) / 30.4368);
                                if (params.person.AgeGroup === 'B') {
                                    if (AgeMonths > 59 && AgeMonths < 180) {
                                        this.setState({
                                            eligible: true
                                        });
                                    } else {
                                        this.setState({
                                            eligible: false
                                        });
                                    }
                                } else if (AgeMonths > 8 && AgeMonths < 60) {
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
                {this.state.eligible &&
                    <View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>3a. Was assent and/or parental  permission taken for child?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListConsent}
                                initial={this.state.c3areasonindex === 0 ? 0 : (this.state.c3areasonindex ? this.state.c3areasonindex : -1)}
                                onPress={(value, index) => { this.setState({ c3areason: value, c3areasonindex: index });  }}
                            />
                        </View >
                        {this.state.c3areason === '01' &&
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>4. Respondent full name?</Text>
                                    <FormInput
                                        value={this.state.c4resname}
                                        onChangeText={(resname) => this.setState({ c4resname: resname })}
                                    />
                                </View>
                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                    <Text style={styles.headingLetter}>5. Relationship of respondent to the child?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionListRelation}
                                        initial={this.state.c5resrelationindex === 0 ? 0 : (this.state.c5resrelationindex ? this.state.c5resrelationindex : -1)}
                                        onPress={(value, index) => { this.setState({ c5resrelation: value, c5resrelationindex: index });  }}
                                    />
                                </View >
                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                    <Text style={styles.headingLetter}>6a. Is child mother alive?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionListBoolean}
                                        initial={this.state.c6amomaliveindex === 0 ? 0 : (this.state.c6amomaliveindex ? this.state.c6amomaliveindex : -1)}
                                        onPress={(value, index) => { this.setState({ c6amomalive: value, c6amomaliveindex: index });  }}
                                    />
                                </View >
                                {this.state.c6amomalive === '01' &&
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>6b. Mother's completed age(years)?</Text>
                                            <FormInput
                                                keyboardType='numeric'
                                                value={this.state.c6bmomage}
                                                onChangeText={(value) => this.setState({ c6bmomage: value })}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>7. Mother's education?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.educationStatus}
                                                initial={this.state.c7momeducationindex === 0 ? 0 : (this.state.c7momeducationindex ? this.state.c7momeducationindex : -1)}
                                                onPress={(value, index) => { this.setState({ c7momeducation: value, c7momeducationindex: index });  }}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>8b. Mother's Occupation?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.ocuupationStatus}
                                                initial={this.state.c8momoccupationindex === 0 ? 0 : (this.state.c8momoccupationindex ? this.state.c8momoccupationindex : -1)}
                                                onPress={(value, index) => { this.setState({ c8momoccupation: value, c8momoccupationindex: index });  }}
                                            />
                                        </View>
                                    </View>
                                }
                                {this.state.surveyType === '02' &&
                                    <View>
                                        <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Measles and Rubella campaign immunization</Text>
                                        </View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>11. Was the child living in this household when MR campaign was occuring? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c11campaignliveindex === 0 ? 0 : (this.state.c11campaignliveindex ? this.state.c11campaignliveindex : -1)}
                                                onPress={(value, index) => { this.setState({ c11campaignlive: value, c11campaignliveindex: index });  }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>12. Are you aware that Measles-Rubella (MR) vaccination campaign was recently held in your area? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c12campaignawareindex ? this.state.c12campaignawareindex : -1}
                                                initial={this.state.c12campaignawareindex === 0 ? 0 : (this.state.c12campaignawareindex ? this.state.c12campaignawareindex : -1)}
                                                onPress={(value, index) => { this.setState({ c12campaignaware: value, c12campaignawareindex: index });  }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>13. How did you hear about the campaign(First Option)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.champaignInfoStatus}
                                                initial={this.state.c13campaignhear1indexx === 0 ? 0 : (this.state.c13campaignhear1index ? this.state.c13campaignhear1index : -1)}
                                                onPress={(value, index) => { this.setState({ c13campaignhear1: value, c13campaignhear1index: index });  }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>13. How did you hear about the campaign(Second Option)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.champaignInfoStatus}
                                                initial={this.state.c13campaignhear2index === 0 ? 0 : (this.state.c13campaignhear2index ? this.state.c13campaignhear2index : -1)}
                                                onPress={(value, index) => { this.setState({ c13campaignhear2: value, c13campaignhear2index: index });  }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>13. How did you hear about the campaign(Third Option)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.champaignInfoStatus}
                                                initial={this.state.c13campaignhear2index === 0 ? 0 : (this.state.c13campaignhear2index ? this.state.c13campaignhear2index : -1)}
                                                onPress={(value, index) => { this.setState({ c13campaignhear3: value, c13campaignhear3index: index });  }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>13a. Where did you go to school? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.schoolStatus}
                                                initial={this.state.c13aschoolindex === 0 ? 0 : (this.state.c13aschoolindex ? this.state.c13aschoolindex : -1)}
                                                onPress={(value, index) => { this.setState({ c13aschool: value, c13aschoolindex: index });  }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>14. Did the child receive the Measles-Rubella(MR) vaccine during the recent vaccination campaign? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c14campaignmrrecindex === 0 ? 0 : (this.state.c14campaignmrrecindex ? this.state.c14campaignmrrecindex : -1)}
                                                onPress={(value, index) => { this.setState({ c14campaignmrrec: value, c14campaignmrrecindex: index });  }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>15. Where did the child receive the Measles-Rubella(MR) vaccine during the campaign? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.receiveVaccineStatus}
                                                initial={this.state.c15campaignlocatindex === 0 ? 0 : (this.state.c15campaignlocatindex ? this.state.c15campaignlocatindex : -1)}
                                                onPress={(value, index) => { this.setState({ c15campaignlocat: value, c15campaignlocatindex: index });  }}
                                            />
                                        </View >
                                        {this.state.c15campaignlocat === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>Others, Specify?</Text>
                                                <FormInput
                                                    value={this.state.c15campaignlocatsp}
                                                    onChangeText={(c15campaignlocatsp) => this.setState({ c15campaignlocatsp })}
                                                />
                                            </View>
                                        }
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>16. Was the vaccination card provided to the family during the campaign? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.vaccineCardStatus}
                                                initial={this.state.c16campaigncardindex === 0 ? 0 : (this.state.c16campaigncardindex ? this.state.c16campaigncardindex : -1)}
                                                onPress={(value, index) => { this.setState({ c16campaigncard: value, c16campaigncardindex: index });  }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>17. Does the vaccination card indicate the MR campaign vaccination dose was given? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionListBoolean}
                                                initial={this.state.c17campaigndoseindex === 0 ? 0 : (this.state.c17campaigndoseindex ? this.state.c17campaigndoseindex : -1)}
                                                onPress={(value, index) => { this.setState({ c17campaigndose: value, c17campaigndoseindex: index });  }}
                                            />
                                        </View >
                                        {this.state.c14campaignmrrec === '02' &&
                                            <View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>18. What was the reason child not receiving MR vaccination during the campaign (Reason 1)? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.notReceiveVaccineStatus}
                                                        initial={this.state.c18reason1index === 0 ? 0 : (this.state.c18reason1index ? this.state.c18reason1index : -1)}
                                                        onPress={(value, index) => { this.setState({ c18reason1: value, c18reason1index: index });  }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>18. What was the reason child not receiving MR vaccination during the campaign (Reason 2)? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.notReceiveVaccineStatus}
                                                        initial={this.state.c18reason2index === 0 ? 0 : (this.state.c18reason2index ? this.state.c18reason2index : -1)}
                                                        onPress={(value, index) => { this.setState({ c18reason2: value, c18reason2index: index });  }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>18. What was the reason child not receiving MR vaccination during the campaign (Reason 3)? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.notReceiveVaccineStatus}
                                                        initial={this.state.c18reason3index === 0 ? 0 : (this.state.c18reason3index ? this.state.c18reason3index : -1)}
                                                        onPress={(value, index) => { this.setState({ c18reason3: value, c18reason3index: index });  }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>18. What was the reason child not receiving MR vaccination during the campaign (Reason 4)? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.notReceiveVaccineStatus}
                                                        initial={this.state.c18reason4index === 0 ? 0 : (this.state.c18reason4index ? this.state.c18reason4index : -1)}
                                                        onPress={(value, index) => { this.setState({ c18reason4: value, c18reason4index: index });  }}
                                                    />
                                                </View >
                                            </View>
                                        }
                                    </View>
                                }
                                {params.person.AgeGroup === 'A' &&
                                    <View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>19. Dont let the respondent look at immunization card to answer question. Has your child receive any measles containing vaccine to prevent him/ her getting measles?(This does not include measles vaccines given during vaccination campaign) </Text>
											<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Measles vaccine (Measles vaccine, Measles Rubella (MR) vaccine or Measles, Mumps and Rubella (MMR) vaccine) is a shot in the right arm usually given at the age of 9 to 12 months or 16 to 24 months</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c19mcvroutrecindex === 0 ? 0 : (this.state.c19mcvroutrecindex ? this.state.c19mcvroutrecindex : -1)}
                                                onPress={(value, index) => { this.setState({ c19mcvroutrec: value, c19mcvroutrecindex: index });  }}
                                            />
                                        </View >
                                        {this.state.c19mcvroutrec === '01' &&
                                            <View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>19a. Number of doses?</Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Record '88' for don’t know</Text>
													<FormInput
                                                        keyboardType='numeric'
                                                        value={this.state.c19amcvroutrecdose}
                                                        onChangeText={(c19amcvroutrecdose) => this.setState({ c19amcvroutrecdose })}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>19b. Where did your child receive the first vaccine dose? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.facilityStatus}
                                                        initial={this.state.c19bmcvroutrecfacindex === 0 ? 0 : (this.state.c19bmcvroutrecfacindex ? this.state.c19bmcvroutrecfacindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c19bmcvroutrecfac: value, c19bmcvroutrecfacindex: index });  }}
                                                    />
                                                </View >
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.surveyType === '01' &&
                                    <View>
                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>20. Dont let the respondent look at immunization card to answer question.  Has your child receive any measles containing vaccine from a vaccination campaign? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c20mcvcampaignindex === 0 ? 0 : (this.state.c20mcvcampaignindex ? this.state.c20mcvcampaignindex : -1)}
                                                onPress={(value, index) => { this.setState({ c20mcvcampaign: value, c20mcvcampaignindex: index });  }}
                                            />
                                        </View >
                                        {this.state.c20mcvcampaign === '01' &&
                                            <View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>20a. Number of doses?</Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Record '88' for don’t know</Text>
                                                    <FormInput
                                                        keyboardType='numeric'
                                                        value={this.state.c20amcvcampaigndose}
                                                        onChangeText={(c20amcvcampaigndose) => this.setState({ c20amcvcampaigndose })}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>20b. What was the child's age when they receive the measles vaccine from vaccination campaign?</Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Record '88' for don’t know</Text>
                                                    <FormInput
                                                        keyboardType='numeric'
                                                        value={this.state.c20bmcvcampaignage}
                                                        onChangeText={(c20bmcvcampaignage) => this.setState({ c20bmcvcampaignage })}
                                                    />
                                                </View>
                                            </View>
                                        }
                                    </View>
                                }
                                {params.person.AgeGroup === 'A' &&
                                    <View>

                                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                            <Text style={styles.headingLetter}>21. Do you have a routine immunization card for child? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.immunineCardStatus}
                                                initial={this.state.c21immcardindex === 0 ? 0 : (this.state.c21immcardindex ? this.state.c21immcardindex : -1)}
                                                onPress={(value, index) => { this.setState({ c21immcard: value, c21immcardindex: index });  }}
                                            />
                                        </View >
                                        {this.state.c21immcard === '01' &&
                                            <View>
                                                <View style={{ backgroundColor: '#ebebeb', height: 50, display: 'flex', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>information from Immunization card</Text>
                                                </View>
                                                <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>MCV</Text>
                                                </View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>22a. Vaccine - MCV1? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot usually in right arm or shoulder given at 9-12 months to protect against measles.</Text>
													<RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c22mcvdoc1index === 0 ? 0 : (this.state.c22mcvdoc1index ? this.state.c22mcvdoc1index : -1)}
                                                        onPress={(value, index) => { this.setState({ c22mcvdoc1: value, c22mcvdoc1index: index });  }}
                                                    />
                                                </View >
                                                {this.state.c22mcvdoc1 === '01' &&
                                                    <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                        <Text style={styles.headingLetter}>22b. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c22bmcvday1}
                                                            onFocus={() => {
                                                                this.openDatePicker('c22bmcvday1');
                                                            }}
                                                            onChangeText={(c22bmcvday1) => this.setState({ c22bmcvday1 })}
                                                        />
                                                    </View>
                                                }
                                                {(this.state.c22mcvdoc1 === '01' || this.state.c22mcvdoc1 === '02') &&
                                                    <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                        <Text style={styles.headingLetter}>22c. Does this dose contain rubella (MR or MMR)? </Text>
                                                        <RadioForm
                                                            animation={false}
                                                            style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                            labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                            buttonColor={'#4B5461'}
                                                            formHorizontal={false}
                                                            labelHorizontal
                                                            radio_props={this.optionListBoolean}
                                                            initial={this.state.c22cmcvdoc1rubindex === 0 ? 0 : (this.state.c22cmcvdoc1rubindex ? this.state.c22cmcvdoc1rubindex : -1)}
                                                            onPress={(value, index) => { this.setState({ c22cmcvdoc1rub: value, c22cmcvdoc1rubindex: index });  }}
                                                        />
                                                    </View >
                                                }

                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>23a. Vaccine - MCV2? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot usually in right arm or shoulder given at 16-24 months to protect against measles.</Text>
													<RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatusNA}
                                                        initial={this.state.c23amcvdoc2index === 0 ? 0 : (this.state.c23amcvdoc2index ? this.state.c23amcvdoc2index : -1)}
                                                        onPress={(value, index) => { this.setState({ c23amcvdoc2: value, c23amcvdoc2index: index });  }}
                                                    />
                                                </View >
                                                {this.state.c23amcvdoc2 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>23b. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c23bmcvday1}
                                                            onFocus={() => {
                                                                this.openDatePicker('c23bmcvday1');
                                                            }}
                                                            onChangeText={(c23bmcvday1) => this.setState({ c23bmcvday1 })}
                                                        />
                                                    </View>
                                                }
                                                {(this.state.c23amcvdoc2 === '01' || this.state.c23amcvdoc2 === '02') &&
                                                    <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                        <Text style={styles.headingLetter}>23c. Does this dose contain rubella (MR or MMR)? </Text>
                                                        <RadioForm
                                                            animation={false}
                                                            style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                            labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                            buttonColor={'#4B5461'}
                                                            formHorizontal={false}
                                                            labelHorizontal
                                                            radio_props={this.optionListBoolean}
                                                            initial={this.state.c23cmcvdoc2rubindex === 0 ? 0 : (this.state.c23cmcvdoc2rubindex ? this.state.c23cmcvdoc2rubindex : -1)}
                                                            onPress={(value, index) => { this.setState({ c23cmcvdoc2rub: value, c23cmcvdoc2rubindex: index });  }}
                                                        />
                                                    </View >
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24a. BCG? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot usually in left arm or shoulder given soon after birth to protect against tuberculosis; usually causes a scar.</Text>
													<RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24abcgdocindex === 0 ? 0 : (this.state.c24abcgdocindex ? this.state.c24abcgdocindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24abcgdoc: value, c24abcgdocindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24abcgdoc === '01' &&
                                                    <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                        <Text style={styles.headingLetter}>24a. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24abcgday}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24abcgday');
                                                            }}
                                                            onChangeText={(c24abcgday) => this.setState({ c24abcgday })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24b. Hepatitis B? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot usually in thigh given soon after birth to protect against hepatitis B.</Text>
													<RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24bhepatitisindex === 0 ? 0 : (this.state.c24bhepatitisindex ? this.state.c24bhepatitisindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24bhepatitis: value, c24bhepatitisindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24bhepatitis === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24b. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24bhepatitisday}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24bhepatitisday');
                                                            }}
                                                            onChangeText={(c24bhepatitisday) => this.setState({ c24bhepatitisday })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Polio</Text>
                                                </View>
												<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
												<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Two drops in the mouth to protect against polio. Typically given soon after birth (within first 2 weeks) then additional times in the first year of life. 

 

If yes, how many times was the polio vaccine received?</Text>
												</View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24c. OPV-Birth dose? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24bopv0docindex === 0 ? 0 : (this.state.c24bopv0docindex ? this.state.c24bopv0docindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24bopv0doc: value, c24bopv0docindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24bopv0doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24c. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24bopv0day}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24bopv0day');
                                                            }}
                                                            onChangeText={(c24bopv0day) => this.setState({ c24bopv0day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24d. OPV Dose 1? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24fopv1docindex === 0 ? 0 : (this.state.c24fopv1docindex ? this.state.c24fopv1docindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24fopv1doc: value, c24fopv1docindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24fopv1doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24D. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24fopvday1}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24fopvday1');
                                                            }}
                                                            onChangeText={(c24fopvday1) => this.setState({ c24fopvday1 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24e. OPV Dose 2 ? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24gopv2docindex === 0 ? 0 : (this.state.c24gopv2docindex ? this.state.c24gopv2docindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24gopv2doc: value, c24gopv2docindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24gopv2doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24e. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24gopvday2}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24gopvday2');
                                                            }}
                                                            onChangeText={(c24gopvday2) => this.setState({ c24gopvday2 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24f. OPV Dose 3? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24hopv3docindex === 0 ? 0 : (this.state.c24hopv3docindex ? this.state.c24hopv3docindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24hopv3doc: value, c24hopv3docindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24hopv3doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24f. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24hopvday3}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24hopvday3');
                                                            }}
                                                            onChangeText={(c24hopvday3) => this.setState({ c24hopvday3 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24g. IPV at 14 weeks? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot in the right arm or shoulder to protect against polio. Sometimes given at the same time as the 3rd dose of pentavalent vaccine.</Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24gipvdocindex === 0 ? 0 : (this.state.c24gipvdocindex ? this.state.c24gipvdocindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24gipvdoc: value, c24gipvdocindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24gipvdoc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24g. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24gipvdocday}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24gipvdocday');
                                                            }}
                                                            onChangeText={(c24gipvdocday) => this.setState({ c24gipvdocday })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Penta</Text>
                                                </View>
												<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
												<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot given in the thigh or buttocks, sometimes at the same time as polio drops.

 

If yes, how many times was the pentavalent vaccine received?</Text>
												</View>
												
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24h. DTP/Penta -1 ? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24cpenta1docindex === 0 ? 0 : (this.state.c24cpenta1docindex ? this.state.c24cpenta1docindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24cpenta1doc: value, c24cpenta1docindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24cpenta1doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24h. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24cpentaday1}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24cpentaday1');
                                                            }}
                                                            onChangeText={(c24cpentaday1) => this.setState({ c24cpentaday1 })}
                                                        />
                                                    </View>
                                                }

                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24i. DTP/Penta - 2? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24dpenta2docindex === 0 ? 0 : (this.state.c24dpenta2docindex ? this.state.c24dpenta2docindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24dpenta2doc: value, c24dpenta2docindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24dpenta2doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24i. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24dpentaday1}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24dpentaday1');
                                                            }}
                                                            onChangeText={(c24dpentaday1) => this.setState({ c24dpentaday1 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24j. DPT/Penta - 3? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24epenta3docindex === 0 ? 0 : (this.state.c24epenta3docindex ? this.state.c24epenta3docindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c24epenta3doc: value, c24epenta3docindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24epenta3doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24j. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24epentaday3}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24epentaday3');
                                                            }}
                                                            onChangeText={(c24epentaday3) => this.setState({ c24epentaday3 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Rotavirus</Text>
                                                </View>
												<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
												<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Five drops or a squirt in the mouth to protect against rotavirus, a diarrheal disease, sometimes at the same time as polio drops.

 

If yes, how many times was the Rotavirus vaccine received?</Text>
												</View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24k. Rota 1? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24krota1index === 0 ? 0 : (this.state.c24krota1index ? this.state.c24krota1index : -1)}
                                                        onPress={(value, index) => { this.setState({ c24krota1: value, c24krota1index: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24krota1 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24k. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24krota1day}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24krota1day');
                                                            }}
                                                            onChangeText={(c24krota1day) => this.setState({ c24krota1day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24l. Rota 2? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24lrota2index === 0 ? 0 : (this.state.c24lrota2index ? this.state.c24lrota2index : -1)}
                                                        onPress={(value, index) => { this.setState({ c24lrota2: value, c24lrota2index: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24lrota2 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24l. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24lrot2day}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24lrot2day');
                                                            }}
                                                            onChangeText={(c24lrot2day) => this.setState({ c24lrot2day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24m. Rota 3? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24mrota3index === 0 ? 0 : (this.state.c24mrota3index ? this.state.c24mrota3index : -1)}
                                                        onPress={(value, index) => { this.setState({ c24mrota3: value, c24mrota3index: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24mrota3 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24m. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24mrota3day}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24mrota3day');
                                                            }}
                                                            onChangeText={(c24mrota3day) => this.setState({ c24mrota3day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Japanese Encephalitis</Text>
                                                </View>
												<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
												<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot given in the left arm to protect against Japanese Encephalitis (JE), typically at the age of 9 to 12 months or 16 to 18 months.

 

If yes, how many times was the JE vaccine received?</Text>
												</View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24n. Japanese Encephalitis 1? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatusNA}
                                                        initial={this.state.c24nje1index === 0 ? 0 : (this.state.c24nje1index ? this.state.c24nje1index : -1)}
                                                        onPress={(value, index) => { this.setState({ c24nje1: value, c24nje1index: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24nje1 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24nje1day}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24nje1day');
                                                            }}
                                                            onChangeText={(c24nje1day) => this.setState({ c24nje1day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>24o. Japanese Encephalitis 2? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatusNA}
                                                        initial={this.state.c24oje2index === 0 ? 0 : (this.state.c24oje2index ? this.state.c24oje2index : -1)}
                                                        onPress={(value, index) => { this.setState({ c24oje2: value, c24oje2index: index });  }}
                                                    />
                                                </View >
                                                {this.state.c24oje2 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24oje2day}
                                                            onFocus={() => {
                                                                this.openDatePicker('c24oje2day');
                                                            }}
                                                            onChangeText={(c24oje2day) => this.setState({ c24oje2day })}
                                                        />
                                                    </View>
                                                }
                                            </View>
                                        }
                                        {this.state.c21immcard !== '01' &&
                                            <View>
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>25a. BCG? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot usually in left arm or shoulder given soon after birth to protect against tuberculosis; usually causes a scar.</Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c25abcgindex === 0 ? 0 : (this.state.c25abcgindex ? this.state.c25abcgindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c25abcg: value, c25abcgindex: index });  }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>26a. Hepatitis B birth dose? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot usually in thigh given soon after birth to protect against hepatitis B.</Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c25bhepatitisindex === 0 ? 0 : (this.state.c25bhepatitisindex ? this.state.c25bhepatitisindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c25bhepatitis: value, c25bhepatitisindex: index });  }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>27a. Polio-Birth dose? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Two drops in the mouth to protect against polio. Typically given soon after birth (within first 2 weeks) then additional times in the first year of life. 

 

If yes, how many times was the polio vaccine received?</Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c25cpolioindex === 0 ? 0 : (this.state.c25cpolioindex ? this.state.c25cpolioindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c25cpolio: value, c25cpolioindex: index });  }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>28a. OPV? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c25dopvindex === 0 ? 0 : (this.state.c25dopvindex ? this.state.c25dopvindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c25dopv: value, c25dopvindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c25dopv === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>28b. Number of doses?</Text>
                                                        <FormInput
                                                            keyboardType='numeric'
                                                            value={this.state.c25dopvdose}
                                                            onChangeText={(c25dopvdose) => this.setState({ c25dopvdose })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>29a. IPV at 14 weeks? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot in the right arm or shoulder to protect against polio. Sometimes given at the same time as the 3rd dose of pentavalent vaccine.</Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c29aipvindex === 0 ? 0 : (this.state.c29aipvindex ? this.state.c29aipvindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c29aipv: value, c29aipvindex: index });  }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>30a. Penta? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot given in the thigh or buttocks, sometimes at the same time as polio drops.

 

If yes, how many times was the pentavalent vaccine received?</Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c30apentaindex === 0 ? 0 : (this.state.c30apentaindex ? this.state.c30apentaindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c30apenta: value, c30apentaindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c30apenta === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>30b. Number of doses?</Text>
                                                        <FormInput
                                                            keyboardType='numeric'
                                                            value={this.state.c30apentadose}
                                                            onChangeText={(c30apentadose) => this.setState({ c30apentadose })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>31a. Rota? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Five drops or a squirt in the mouth to protect against rotavirus, a diarrheal disease, sometimes at the same time as polio drops.

 

If yes, how many times was the Rotavirus vaccine received?</Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c31arotaindex === 0 ? 0 : (this.state.c31arotaindex ? this.state.c31arotaindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c31arota: value, c31arotaindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c31arota === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>31b. Number of doses?</Text>
                                                        <FormInput
                                                            keyboardType='numeric'
                                                            value={this.state.c31arotadose}
                                                            onChangeText={(c31arotadose) => this.setState({ c31arotadose })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                                    <Text style={styles.headingLetter}>32a. JE? </Text>
													<Text style={{ fontSize: 16, marginLeft: 20, color: '#333', fontWeight: '300', textAlign: 'left', fontStyle: 'italic' }}>Shot given in the left arm to protect against Japanese Encephalitis (JE), typically at the age of 9 to 12 months or 16 to 18 months.

 

If yes, how many times was the JE vaccine received?</Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c32ajeindex === 0 ? 0 : (this.state.c32ajeindex ? this.state.c32ajeindex : -1)}
                                                        onPress={(value, index) => { this.setState({ c32aje: value, c32ajeindex: index });  }}
                                                    />
                                                </View >
                                                {this.state.c32aje === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>32b. Number of doses?</Text>
                                                        <FormInput
                                                            keyboardType='numeric'
                                                            value={this.state.c32ajedose}
                                                            onChangeText={(c32ajedose) => this.setState({ c32ajedose })}
                                                        />
                                                    </View>
                                                }
                                            </View>
                                        }
                                    </View>

                                }
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Interviewer comments?</Text>
                            <FormInput
                                value={this.state.c26intcomments}
                                onChangeText={(c26intcomments) => this.setState({ c26intcomments })}
                            />
                        </View>

                        {this.state.c3areason === '01' && this.state.eligible &&
                            <View>
                                <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>SPECIMEN COLLECTION</Text>
                                </View>

                                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                                    <Text style={styles.headingLetter}>1. Was a Liquid Blood sample collected?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionListBoolean}
                                        initial={this.state.cs1scollectindex === 0 ? 0 : (this.state.cs1scollectindex ? this.state.cs1scollectindex : -1)}
                                        onPress={(value, index) => {
                                            this.setState({ cs1scollect: value, cs1scollectindex: index });
                                            if (value === '01') {
                                                this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}S`;
                                            } else {
                                                this.state.specimenCapillaryID = '';
                                            }
                                        }}
                                    />
                                </View>

                                {this.state.cs1scollect === '02' &&
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
                                                initial={this.state.cs1ascollectnoindex === 0 ? 0 : (this.state.cs1ascollectnoindex ? this.state.cs1ascollectnoindex : -1)}
                                                onPress={(value, index) => { this.setState({ cs1ascollectno: value, cs1ascollectnoindex: index });  }}
                                            />
                                        </View>

                                        {this.state.cs1ascollectno === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>1B. Specify other reason</Text>
                                                <FormInput
                                                    ref="cs1bscollectoth"
                                                    value={this.state.cs1bscollectoth}
                                                    onChangeText={(cs1bscollectoth) => this.setState({ cs1bscollectoth })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.cs1scollect === '01' &&
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
                                                initial={this.state.cs1scollecthowindex === 0 ? 0 : (this.state.cs1scollecthowindex ? this.state.cs1scollecthowindex : -1)}
                                                onPress={(value, index) => {
                                                    this.setState({ cs1scollecthow: value, cs1scollecthowindex: index });
                                                    if (value === '01' || value === '02') {
                                                        this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}S`;
                                                    } else {
                                                        this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}V`;
                                                    }
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.headingLetterErr}>{`Specimen ID: ${this.state.specimenCapillaryID}`} :: {`Collection Date & Time: ${moment().format('DD-MM-YYYY h:mm:ss a')}`}</Text>

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
                                                initial={this.state.cs5squalindex === 0 ? 0 : (this.state.cs5squalindex ? this.state.cs5squalindex : -1)}
                                                onPress={(value, index) => { this.setState({ cs5squal: value, cs5squalindex: index });  }}
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
                                                initial={this.state.cs6sproblemindex === 0 ? 0 : (this.state.cs6sproblemindex ? this.state.cs6sproblemindex : -1)}
                                                onPress={(value, index) => { this.setState({ cs6sproblem: value, cs6sproblemindex: index });  }}
                                            />
                                        </View>

                                        {this.state.cs6sproblem === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>6A. Specify other reason</Text>
                                                <FormInput
                                                    ref="cs6asprobsp"
                                                    value={this.state.cs6asprobsp}
                                                    onChangeText={(cs6asprobsp) => this.setState({ cs6asprobsp })}
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
                                        initial={this.state.cs7dcollectindex === 0 ? 0 : (this.state.cs7dcollectindex ? this.state.cs7dcollectindex : -1)}
                                        onPress={(value, index) => {
                                            this.setState({ cs7dcollect: value, cs7dcollectindex: index });
                                            if (value === '01') {
                                                this.state.specimenDBSID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}D`;
                                            } else {
                                                this.state.specimenDBSID = '';
                                            }
                                        }}
                                    />
                                </View>
                                {this.state.cs7dcollect === '02' &&
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
                                                initial={this.state.cs7adcollectnoindex === 0 ? 0 : (this.state.cs7adcollectnoindex ? this.state.cs7adcollectnoindex : -1)}
                                                onPress={(value, index) => { this.setState({ cs7adcollectno: value, cs7adcollectnoindex: index });  }}
                                            />
                                        </View>
                                        {this.state.cs7adcollectno === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>7B. Specify other reason</Text>
                                                <FormInput
                                                    ref="cs7bdcollectoth"
                                                    value={this.state.cs7bdcollectoth}
                                                    onChangeText={(cs7bdcollectoth) => this.setState({ cs7bdcollectoth })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.cs7dcollect === '01' &&
                                    <View>
                                        <Text style={styles.headingLetterErr}>{`Specimen ID: ${this.state.specimenDBSID}`} :: {`Collection Date & Time: ${moment().format('DD-MM-YYYY h:mm:ss a')}`}</Text>
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
                                                initial={this.state.cs11dspotsindex === 0 ? 0 : (this.state.cs11dspotsindex ? this.state.cs11dspotsindex : -1)}
                                                onPress={(value, index) => { this.setState({ cs11dspots: value, cs11dspotsindex: index });  }}
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
                                                initial={this.state.cs12adqual1index === 0 ? 0 : (this.state.cs12adqual1index ? this.state.cs12adqual1index : -1)}
                                                onPress={(value, index) => { this.setState({ cs12adqual1: value, cs12adqual1index: index });  }}
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
                                                initial={this.state.cs12adqual2index === 0 ? 0 : (this.state.cs12adqual2index ? this.state.cs12adqual2index : -1)}
                                                onPress={(value, index) => { this.setState({ cs12adqual2: value, cs12adqual2index: index });  }}
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
                                                initial={this.state.cs12adqual3index === 0 ? 0 : (this.state.cs12adqual3index ? this.state.cs12adqual3index : -1)}
                                                onPress={(value, index) => { this.setState({ cs12adqual3: value, cs12adqual3index: index });  }}
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
                                                initial={this.state.cs12adqual4index === 0 ? 0 : (this.state.cs12adqual4index ? this.state.cs12adqual4index : -1)}
                                                onPress={(value, index) => { this.setState({ cs12adqual4: value, cs12adqual4index: index });  }}
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
                                                initial={this.state.cs12adqual5index === 0 ? 0 : (this.state.cs12adqual5index ? this.state.cs12adqual5index : -1)}
                                                onPress={(value, index) => { this.setState({ cs12adqual5: value, cs12adqual5index: index });  }}
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
                                                initial={this.state.cs13dproblemindex === 0 ? 0 : (this.state.cs13dproblemindex ? this.state.cs13dproblemindex : -1)}
                                                onPress={(value, index) => { this.setState({ cs13dproblem: value, cs13dproblemindex: index });  }}
                                            />
                                        </View>
                                        {this.state.cs13dproblem === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>13A. Specify other reason</Text>
                                                <FormInput
                                                    ref="cs13adprobsp"
                                                    value={this.state.cs13adprobsp}
                                                    onChangeText={(cs13adprobsp) => this.setState({ cs13adprobsp })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                {(this.state.eligible) &&
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={styles.headingLetter}>15. Interviewer observation (Related to Blood Collection)</Text>
                                        <FormInput
                                            ref="cs15intcomments"
                                            value={this.state.cs15intcomments}
                                            onChangeText={(cs15intcomments) => this.setState({ cs15intcomments })}
                                        />
                                    </View>
                                }
                            </View>
                        }

                    </View>
                }
                {(!this.state.eligible) &&
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.headingLetterErr}>Ineligible Candidate for  the Age group selected</Text>
                        <Text style={styles.headingLetter}>Interviewer comments?</Text>
                        <FormInput
                            value={this.state.c26intcomments}
                            onChangeText={(c26intcomments) => this.setState({ c26intcomments })}
                        />
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
