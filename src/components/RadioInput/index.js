import React, { Component } from 'react';
import {
    ListItem,
    Text,
    Radio,
    Left,
    Body
} from 'native-base';

export default class RadioInput extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            selectedValue: false
        }
    }

    onPress(onChange, val, changeState){
        onChange(val);
        changeState();
    }

    render(){
        const { modelDefinitions, selected, input, changeState } = this.props;
        return (
            <ListItem style={{marginTop: 30}}>
                <Left>
                    <Radio {...input} selected={selected === modelDefinitions.value} onPress={() => this.onPress(input.onChange, modelDefinitions.actualValue, changeState)} />
                    <Text style={{fontSize: 28, marginTop: -10, marginLeft: 30}}>{modelDefinitions.label}</Text>
                </Left>                
            </ListItem>
        )
    }
}