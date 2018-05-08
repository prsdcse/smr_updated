import React from 'react';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import { StyleSheet, View, Text } from 'react-native';

const LoginHeader = props => {
  const {
    headerTitle,
  } = props;

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{headerTitle}</Text>
    </View>
  );
};

LoginHeader.defaultProps = {
  headerTitle: '',
};

LoginHeader.propTypes = {
  headerTitle: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4c9689',
    flex: 1,
    padding: 0,
  },
  header: {
    flexDirection: 'column',
    paddingLeft: 20,
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#4c9689',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'normal',
    color: '#fff'
  },
});

export default LoginHeader;