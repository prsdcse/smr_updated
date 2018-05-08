import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import Icon from '../icons/Icon';
import {
  StyleSheet, View, Text,
  ScrollView, TouchableHighlight
} from 'react-native';

const ProfileMenuHeader = props => {
  const {
    headingIcon,
    heading,
    icon1Title,
    icon2Title,
    icon3Title,
    icon4Title,
    icon5Title,
    icon6Title,
    onPressIcon1,
    onPressIcon2,
    onPressIcon3,
    onPressIcon4,
    onPressIcon5,
    onPressIcon6
  } = props;

  const { navigate } = props.navigation;
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <View style={styles.hero}>
          <Image
              style={{ height: 120, width: 120 }}
              source={require('../../../images/logo.png')}
          />
            <Text style={styles.titleText}>Impact of measles rubella (MR) vaccination campaign on population immunity in India (IMRVI study)</Text>
          <Text style={styles.heading}>{heading}</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableHighlight style={styles.heroScan} underlayColor={'transparent'} onPress={onPressIcon1}>
          <View >
            {/* <Icon
              color={colors.survey}
              name='barcode'
              size={50}
            /> */}
            <Image
              style={{ height: 100, width: 100, alignSelf: 'center' }}
              source={require('../../../images/addHousehold.png')}
            />
            <Text style={styles.iconTitle}>{icon1Title}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.heroScan} underlayColor={'transparent'} onPress={onPressIcon2} >
          <View>
            <Image
              style={{ height: 100, width: 100, alignSelf: 'center' }}
              source={require('../../../images/editHousehold.png')}
            />
            <Text style={styles.iconTitle}>{icon2Title}</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.menuSection2}>
        <TouchableHighlight style={styles.heroScan} underlayColor={'transparent'} onPress={onPressIcon3}>
          <View>
            <Image
              style={{ height: 100, width: 100, alignSelf: 'center' }}
              source={require('../../../images/survey.png')}
            />
            <Text style={styles.iconTitle}>{icon3Title}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.heroScan} underlayColor={'transparent'} onPress={onPressIcon4}>
          <View >
            <Image
              style={{ height: 100, width: 100, alignSelf: 'center' }}
              source={require('../../../images/completedsurvey.png')}
            />
            <Text style={styles.iconTitle}>{icon4Title}</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.menuSection2}>
        <TouchableHighlight style={styles.heroScan} underlayColor={'transparent'} onPress={onPressIcon5}>
          <View>
            <Image
              style={{ height: 100, width: 100, alignSelf: 'center' }}
              source={require('../../../images/analytics.png')}
            />
            <Text style={styles.iconTitle}>{icon5Title}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.heroScan} underlayColor={'transparent'} onPress={onPressIcon6}>
          <View>
            <Image
              style={{ height: 100, width: 100, alignSelf: 'center' }}
              source={require('../../../images/delete.png')}
            />
            <Text style={styles.iconTitle}>{icon6Title}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

ProfileMenuHeader.defaultProps = {
  headingIcon: '',
  heading: '',
  icon1Title: '',
  icon2Title: '',
  icon3Title: '',
  icon4Title: '',
  icon5Title: '',
  icon6Title: ''
};

ProfileMenuHeader.propTypes = {
  headingIcon: PropTypes.string,
  heading: PropTypes.string,
  icon1Title: PropTypes.string,
  icon2Title: PropTypes.string,
  icon3Title: PropTypes.string,
  icon4Title: PropTypes.string,
  icon5Title: PropTypes.string,
  icon6Title: PropTypes.string,
  onPressIcon1: PropTypes.func,
  onPressIcon2: PropTypes.func,
  onPressIcon3: PropTypes.func,
  onPressIcon4: PropTypes.func,
  onPressIcon5: PropTypes.func,
  onPressIcon6: PropTypes.func

};

const styles = StyleSheet.create({
  heading: {
    color: '#24272B',
    marginTop: 14,
    fontWeight: '500',
    fontSize: 30
  },
  headingIcon: {
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: 70,
    height: 200,
    backgroundColor: colors.yellow,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    marginTop: 14,
    marginBottom: 14,
    textAlign: 'center'
  },
  headingLetter: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 24,
  },
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 15,
    height: 300,
  },
  menuSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#D3DFEF',
    height: 160,
  },
  menuSection2: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#D3DFEF',
    height: 160,    
  },
  heroScan: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#D3DFEF',
    borderRightWidth: 1,
  },
  iconTitle: {
    color: '#4c9689',
    marginTop: 20,
    fontSize: 26,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ProfileMenuHeader;
