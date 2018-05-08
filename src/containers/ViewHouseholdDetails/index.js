import React from 'react';
import { StyleSheet, View, ScrollView, DatePickerAndroid, Switch } from 'react-native';
import { Card, colors, WalletHeader, MenuHeader, Text } from '../../components/PocketUI/index';

export default class ViewHouseholdDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            personList: params.members
        }

    }

    static navigationOptions = {
        title: 'Household details view',
        headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
        headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
    };

    state = {
        selectedTab: 'ViewHouseholdDetails'
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        console.log("viewhould", params)
        return (
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    <Text style={styles.headingLetter}>{`Household Head Name :  ${params.headName}`}</Text>
                    {this.state.personList.map(function (person, index) {
                        return <WalletHeader
                            key={index}
                            headingIcon={person.Sex}
                            heading={`Name : ${person.Name}`}
                            heading1={`${person.KnowDOB ? `DOB  : ` : `Age : `} ${person.KnowDOB ? person.DOB : person.Age}`}
                            rightIcon='pencil-square'
                            rightIconClick={() => navigate('EditIndividual', { person: person, HouseholdID: params.HouseholdID, clusterInfo: params.clusterInfo })}
                        />;
                    }, this)}
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