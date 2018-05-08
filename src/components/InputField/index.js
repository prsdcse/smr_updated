import React, { Component } from 'react';
import {
    Item,
    Input,
    Label
} from 'native-base';

export default class InputField extends Component {

    render() {
        const { input: { value, onChange }, modelDefinitions } = this.props
        return (
            <Item stackedLabel style={{ height: 100, marginTop: 10 }}>
                <Label style={{ fontSize: 28 }}>{modelDefinitions.label}</Label>
                <Input style={{ fontSize: 22, height: 250 }} keyboardType={modelDefinitions.keyboardType} maxLength={modelDefinitions.maxLength} onChangeText={(value) => onChange(value)} />
            </Item>
        );
    }
}