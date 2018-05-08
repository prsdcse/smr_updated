import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../components/InputField/index';
import RadioInput from '../../components/RadioInput/index';

class ClusterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        };
    }

    onPress(selected) {
        this.setState({
            selected
        });
    }

    render() {
        const clusterIDModelDefinition = {
            label: 'Cluster ID'
        };
        const clusterNameModelDefinition = {
            label: 'Village/Town'
        };
        const preSurveyModelDefinition = {
            label: 'Pre-Survey',
            name: 'surveytype',
            value: '01',
            actualValue: '01'
        };
        const postSurveyModelDefinition = {
            label: 'Post-Survey',
            name: 'surveytype',
            value: '02',
            actualValue: '02'
        };
        return (
            <View style={{ width: 625, padding: 20 }}>
                <Field
                    name="clusterID" component={InputField}
                    modelDefinitions={clusterIDModelDefinition}
                />
                <Field
                    name="villageName" component={InputField}
                    modelDefinitions={clusterNameModelDefinition} />
                <Field type="radio" name="surveytype" component={RadioInput} modelDefinitions={preSurveyModelDefinition} selected={this.state.selected} changeState={() => this.onPress('01')} />
                <Field type="radio" name="surveytype" component={RadioInput} modelDefinitions={postSurveyModelDefinition} selected={this.state.selected} changeState={() => this.onPress('02')} />
            </View>
        );
    }

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string
    }
}


export default reduxForm({
    form: 'clusterform'
})(ClusterForm);
