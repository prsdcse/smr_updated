import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FormInput, Button, CheckBox } from '../../components/PocketUI/index';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import realm from '../../providers/realm';

export default class ClusterFormScreen extends React.Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props.navigation;
    this.state = {
      clusterID: '',
      villageName: '',
      status: 'active',
      clusterPrimaryID: String(new Date().getTime()),
      surveyType: '01'
    }
    this.survey_option = [
      { label: 'Pre-Campaign', value: '01' },
      { label: 'Post-Campaign', value: '02' }
    ]
  }

  saveClusterInformation() {
    const { dispatch } = this.props.navigation;
    if (this.state.clusterID && this.state.villageName) {
      if (this.state.clusterID > 100 && this.state.clusterID < 1000) {
        realm.write(() => {
          realm.create('Cluster', this.state);
        });
        dispatch({ type: 'goToDashboard' })

      }
      else {
        alert('Cluster ID should be between 101 to 999');
      }

    }
    else {
      alert('Cluster ID & Village Name cannot be empty');
    }
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white', paddingTop: 40, }}>
        <FormInput
          placeholder='Cluster ID'
          keyboardType='numeric'
          maxLength={3}
          onChangeText={(clusterID) => this.setState({ clusterID: clusterID })} />

        <FormInput
          placeholder='Village/Town'
          onChangeText={(villageName) => this.setState({ villageName: villageName })} />

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.headingLetter}>Survey Type ?</Text>
          <RadioForm
            animation={false}
            style={{ margin: 20 }}
            labelStyle={{ fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
            buttonColor={'#4B5461'}
            formHorizontal={true}
            labelHorizontal={true}
            radio_props={this.survey_option}
            initial={0}
            onPress={(value) => { this.setState({ surveyType: value }); }}
          />
        </View>

        <View>
          <Button
            buttonStyle={{ marginTop: 75, marginBottom: 30, backgroundColor: '#4c9689' }}
            title='Start the Survey'
            onPress={() =>
              this.saveClusterInformation()
            }
          />
        </View>
      </ScrollView>
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
  }
});