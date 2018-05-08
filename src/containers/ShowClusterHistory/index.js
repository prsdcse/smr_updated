import React from 'react';
import { View, StyleSheet, Text, Alert, ListView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import _ from 'lodash';
import realm from '../../providers/realm';

export default class ClusterHistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Cluster History',
        headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
        headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 8 },
    };

    state = {
        selectedTab: 'ShowClusterHistory'
    };

    constructor(props) {
        super(props);
    }


    render() {
        const tableHead = ['Cluster ID', 'Enumeration', 'Blood Sample'];
        const tableData = [
            ['123', 'A : 0 || B : 2 || C : 1', 'A : 0 || B : 2 || C : 1'],
            ['123', 'A : 0 || B : 2 || C : 1', 'A : 0 || B : 2 || C : 1']
        ];
        const clusterHistory = [];
        _.forEach(realm.objects('Cluster').filtered('status="deleted"'), (value, index) => {
            console.log('value', value);
            clusterHistory.push([value.clusterID,
            `A : ${realm.objects('Household').filtered('Category="A" AND clusterID=$0', value.clusterID).length
            } || B :  ${realm.objects('Household').filtered('Category="B" AND clusterID=$0', value.clusterID).length
            } || C :  ${realm.objects('Household').filtered('Category="C" AND clusterID=$0', value.clusterID).length}`,
            `A : ${realm.objects('BloodSample').filtered('clusterID=$0 && Type="A"', value.clusterID).length
            } || B : ${realm.objects('BloodSample').filtered('clusterID=$0 && Type="B"', value.clusterID).length
            } || C :  ${realm.objects('BloodSample').filtered('clusterID=$0 && Type="C"', value.clusterID).length}`
            ]);
            console.log('clusterHistory', clusterHistory);
        });
        return (
            <View>
                <Table>
                    <Row data={tableHead} flexArr={[1, 2, 2]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={{ flexDirection: 'row' }}>
                        <Rows data={clusterHistory} flexArr={[1, 2, 2]} style={styles.row} textStyle={styles.rowtext} />
                    </TableWrapper>
                </Table>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff', },
    row: { height: 35 },
    rowtext: { fontSize: 25, textAlign: 'center', color: 'black' },
    text: { textAlign: 'center', fontWeight: 'bold', fontSize: 25 }
});
