import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import {
    Button,
    Text
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../components/InputField/index';
import RadioInput from '../../components/RadioInput/index';

class HouseholdForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            selected: ''
        }
    }

    onPress(selected){
        this.setState({
            selected
        })
    }

    render(){
        const { dispatch } = this.props;
        
        const householdIDModelDefinition = {
            label: 'Household ID'
        }
        const householdOption1ModelDefinition = {
            label: 'Complete',
            name: 'surveytype',
            value: '1',
            actualValue: '1',
        }
        const householdOption2ModelDefinition = {
            label: 'Complete, Information provided by neighbor',
            name: 'surveytype',
            value: '2',
            actualValue: '2'
        }
        const householdOption3ModelDefinition = {
            label: 'Incomplete, Locked House',
            name: 'surveytype',
            value: '3',
            actualValue: '3'
        }
        const householdOption4ModelDefinition = {
            label: 'Incomplete, No competent responded at home',
            name: 'surveytype',
            value: '4',
            actualValue: '4'
        }
        const householdOption5ModelDefinition = {
            label: 'Incomplete, Refused',
            name: 'surveytype',
            value: '5',
            actualValue: '5'
        }
        const householdOption6ModelDefinition = {
            label: 'Incomplete, Other',
            name: 'surveytype',
            value: '6',
            actualValue: '6'
        }
        const householdOption7ModelDefinition = {
            label: 'Incomplete, Extended absence (per neighbor)',
            name: 'surveytype',
            value: '7',
            actualValue: '7'
        }
        return (
            <View style={{width: 625, padding: 20}}>
                <Field name="HouseholdID" component={InputField} modelDefinitions={householdIDModelDefinition} />
                <Field type="radio" name="householdStatus" component={RadioInput} modelDefinitions={householdOption1ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('1')} />
                <Field type="radio" name="householdStatus" component={RadioInput} modelDefinitions={householdOption2ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('2')} />
                <Field type="radio" name="householdStatus" component={RadioInput} modelDefinitions={householdOption3ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('3')} />
                <Field type="radio" name="householdStatus" component={RadioInput} modelDefinitions={householdOption4ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('4')} />
                <Field type="radio" name="householdStatus" component={RadioInput} modelDefinitions={householdOption5ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('5')} />
                <Field type="radio" name="householdStatus" component={RadioInput} modelDefinitions={householdOption6ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('6')} />
                <Field type="radio" name="householdStatus" component={RadioInput} modelDefinitions={householdOption7ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('7')} />
            </View>
        );
    }

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string
    }
}



export default reduxForm({
    form: 'householdform',
    enableReinitialize: true
})(HouseholdForm);