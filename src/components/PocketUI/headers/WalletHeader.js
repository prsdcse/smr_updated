import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import Icon from '../icons/Icon';
import colors from '../config/colors';
import { StyleSheet, View, Text, Image } from 'react-native';
import { prototype } from 'realm';

const WalletHeader = props => {
  const {
    headingIcon,
    heading,
    heading1,
    image,
    imageSize,
    valueBalance,
    valueExpenses,
    valueIncome,
    cardTitle,
    rightIcon,
    rightIconClick
  } = props;

  return (
    <View>
      <View style={styles.hero}>
        <View style={styles.topLine}>
          <View style={styles.topText}>
            <View style={styles.headingIcon}>
              <Text style={styles.headingLetter} >{headingIcon}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.heading}>{heading}</Text>
              {(heading1) &&
                < Text style={styles.heading}>{heading1}</Text>
              }
            </View>
            <Icon
              onPress={rightIconClick}
              color='#B3BFD0'
              name={rightIcon}
              size={50}
              marginRight={7}
            />
          </View>

        </View>
      </View>
    </View >
  );
};

WalletHeader.defaultProps = {
  headingIcon: '',
  heading: '',
  heading: '',
  valueExpenses: '',
  valueIncome: '',
  valueBalance: '',
  cardTitle: '',
  image: require('../images/balance.png'),
  imageSize: { width: 35, height: 35, justifyContent: 'center' }
};

WalletHeader.propTypes = {
  headingIcon: PropTypes.string,
  heading: PropTypes.string,
  heading: PropTypes.string,
  valueExpenses: PropTypes.string,
  valueIncome: PropTypes.string,
  valueBalance: PropTypes.string,
  cardTitle: PropTypes.string,
  rightIconClick: PropTypes.func
};

const styles = StyleSheet.create({
  heading: {
    color: '#24272B',
    fontWeight: '500',
    fontSize: 25,
    marginLeft: 50,
    justifyContent: 'center',
  },
  headingLetter: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 22,
  },
  headingIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 50,
    backgroundColor: colors.yellow,
  },
  hero: {
    flexDirection: 'column',
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.grey5
  },
  topText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {},
  button: {
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    color: '#5e6977'
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  balanceField: {
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E9EFF7',
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  total: {
    color: '#136EF1',
    fontSize: 28,
    fontWeight: '500',
    marginTop: 10,
  },
  myCard: {
    flexDirection: 'row',
    backgroundColor: '#F2F5FB',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#3E4A59',
    opacity: 0.7,
  },
  balance: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E9EFF7',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  balanceTitle: {
    color: '#3E4A59',
    opacity: 0.7,
    fontSize: 8,
  },
  balanceTitle2: {
    color: '#3E4A59',
    opacity: 0.7,
    fontSize: 8,
    textAlign: 'right',
  },
  expenses: {
    borderRightWidth: 1,
    borderColor: '#E9EFF7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
  },
  balanceLine: {
    flexDirection: 'row',
  },
  income: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  expensesAmount: {
    color: '#24272B',
    fontSize: 20,
    fontWeight: '500',
  },
  incomeAmount: {
    color: '#24272B',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default WalletHeader;