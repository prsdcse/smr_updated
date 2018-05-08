import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import {
    Button,
    Text,
    Card,
    CardItem,
    Body
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../components/InputField/index';
import RadioInput from '../../components/RadioInput/index';

class AddIndividualForm extends PureComponent {
    
    constructor(props){
        super(props);
        this.state = {
            selected: '',
            dobStatus:'',
            Sex:'',
            availability:''


        }
    }

    onPress(key,value){
        
        switch (key) {
            case 'dobStatus':
            this.setState({
                dobStatus:value
             })
            break;
            case 'Sex':
            this.setState({
                Sex:value
             })
            break;
            case 'availability':
            this.setState({
                availability:value
             })
            break;
            default:
                break;
        }
        
    }

    render(){
        const { dispatch } = this.props;
        
        const indNameModelDefinition = {
            label: 'Name'
        }
        const indDOBModelDefinition = {
            label: 'Date of Birth'
        }
        const indCompletedAgeModelDefinition = {
            label: 'Completed Age'
        }
        const iDobStatus1ModelDefinition = {
            label: 'Yes',
            name: 'dobStatus',
            value: '01',
            actualValue: true
        }
        const iDobStatus2ModelDefinition = {
            label: 'No',
            name: 'dobStatus',
            value: '02',
            actualValue: false
        }
        const genderMaleModelDefinition = {
            label: 'Male',
            name: 'Sex',
            value: 'M',
            actualValue: 'M'
        }
        const genderFemaleModelDefinition = {
            label: 'Female',
            name: 'Sex',
            value: 'F',
            actualValue: 'F'
        }
        const availability1ModelDefinition = {
            label: 'Yes',
            name: 'availability',
            value: '03',
            actualValue: true,
        }
        const availability2ModelDefinition = {
            label: 'No',
            name: 'availability',
            value: '04',
            actualValue: false
        }
        return (
            <View style={{width: 625, padding: 20}}>
                <Field name="name" component={InputField} modelDefinitions={indNameModelDefinition} />
                <Text style={{ fontSize: 28, marginTop: 10}}>Do you know DOB ?</Text>
                <Field type="radio" name="dobStatus" component={RadioInput} modelDefinitions={iDobStatus1ModelDefinition} selected={this.state.dobStatus} changeState={() => this.onPress('dobStatus','01')} />
                <Field type="radio" name="dobStatus" component={RadioInput} modelDefinitions={iDobStatus2ModelDefinition} selected={this.state.dobStatus} changeState={() => this.onPress('dobStatus','02')} />
                <Field name="dob" component={InputField} modelDefinitions={indDOBModelDefinition} />
                <Field name="age" component={InputField} modelDefinitions={indCompletedAgeModelDefinition} />
                <Text style={{ fontSize: 28, marginTop: 10}}>Gender</Text>
                <Field type="radio" name="Sex" component={RadioInput} modelDefinitions={genderMaleModelDefinition} selected={this.state.Sex} changeState={() => this.onPress('Sex','M')} />
                <Field type="radio" name="Sex" component={RadioInput} modelDefinitions={genderFemaleModelDefinition} selected={this.state.Sex} changeState={() => this.onPress('Sex','F')} />
                <Text style={{ fontSize: 28, marginTop: 10}}>Availability - Will you be available for next 3-4 days during the survey ?</Text>
                <Field type="radio" name="availability" component={RadioInput} modelDefinitions={availability1ModelDefinition} selected={this.state.availability} changeState={() => this.onPress('availability','03')} />
                <Field type="radio" name="availability" component={RadioInput} modelDefinitions={availability2ModelDefinition} selected={this.state.availability} changeState={() => this.onPress('availability','04')} />
            </View>
        );
    }

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string
    }
}



export default reduxForm({
    form: 'addindividual'
})(AddIndividualForm);