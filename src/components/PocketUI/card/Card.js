import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text as NativeText,
} from 'react-native';
import colors from '../config/colors';
import Icon from '../icons/Icon';
import Text from '../text/Text';
import fonts from '../config/fonts';
import normalize from '../helpers/normalizeText';
import ViewPropTypes from '../config/ViewPropTypes';

const TYPES = {
  mastercard: {
    source: require('../images/mastercard.png'),
  },
  paypal: {
    source: require('../images/paypal.png'),
  },
  visa: {
    source: require('../images/visa.png'),
  },
};

const Card = props => {
  const {
    flexDirection,
    containerStyle,
    wrapperStyle,
    title,
    subTitle,
    subTitle2,
    subTitleStyle,
    type,
    color,
    number,
    expiration,
    titleStyle,
    onPress,
    clusterScreen,
    ...attributes
  } = props;

  let cardColor = color ? color : colors.white;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          containerStyle && containerStyle,
        ]}
        {...attributes}
      >
        {expiration ? <View
          style={clusterScreen ? [
            styles.cardColorBlock,
            { backgroundColor: cardColor, height: 300 },
          ] : [
            styles.cardColorBlock,
            { backgroundColor: cardColor },
          ]}
        >
        </View> : null}
        <View
          style={[
            styles.wrapper,
            wrapperStyle && wrapperStyle,
            flexDirection && { flexDirection },
          ]}
        >
          <View
            style={[
              styles.topContainer
            ]}
          >
            <View
              style={[
                styles.titleSubtitleContainer
              ]}
            >
              {title !== null &&
                <View>
                  <Text
                    style={[
                      styles.cardTitle,
                      titleStyle && titleStyle,
                    ]}
                  >
                    {title}
                  </Text>
                </View>}
              {subTitle !== null &&
                <View>
                  <Text
                    style={[
                      styles.cardSubTitle,
                      subTitleStyle && subTitleStyle,
                    ]}
                  >
                    {subTitle}
                  </Text>
                </View>}
              {subTitle2 !== null &&
                <View>
                  <Text
                    style={[
                      styles.cardSubTitle,
                      subTitleStyle && subTitleStyle,
                    ]}
                  >
                    {subTitle2}
                  </Text>
                </View>}
            </View>
          </View>
          <View
            style={[
              styles.numberContainer
            ]}
          >
            <Text
              style={[
                styles.number
              ]}
            >
              {number}
            </Text>
          </View>
          {expiration ?
            <View style={[
              styles.bottomContainer]}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '800' }}>
                  {expiration}
                </Text>
              </View>

            </View> : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

Card.defaultProps = {
  // underlayColor: 'white',
  // leftIconUnderlayColor: 'white',
  // chevronColor: colors.grey4,
  // rightIcon: { name: 'chevron-right' },
  // hideChevron: true,
  // roundAvatar: false,
  // switchButton: false,
  // textInputEditable: true,
  // titleNumberOfLines: 1,
  // subtitleNumberOfLines: 1,
  // rightTitleNumberOfLines: 1,
};


Card.propTypes = {
  flexDirection: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  overlayStyle: ViewPropTypes.style,
  title: PropTypes.string,
  titleStyle: NativeText.propTypes.style,
  subTitle: PropTypes.string,
  subTitle2: PropTypes.string,
  subTitleStyle: NativeText.propTypes.style,
  onPress: PropTypes.func,
  type: PropTypes.oneOf([
    'mastercard',
    'visa',
    'paypal'
  ]),
  number: PropTypes.string,
  expiration: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 14,
      },
      android: {
        borderBottomWidth: 1,
        borderBottomColor: '#000'
      },
    }),
  },
  wrapper: {
    backgroundColor: 'transparent',
    marginLeft: 7,
    flexDirection: 'column',
    flex: 1,
    marginBottom: 5,
  },

  titleSubtitleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardColorBlock: {
    height: 150,
    marginBottom: 10,
    width: 20,
    borderRadius: 4,
    backgroundColor: colors.blue
  },
  typeImage: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 0.15,
    width: 60,
    height: 30,
  },
  cardTitle: {
    fontSize: normalize(28),
    textAlign: 'left',
    marginBottom: 1,
    color: colors.black,
    letterSpacing: 1.3,
    fontWeight: '800'
  },
  cardSubTitle: {
    flex: 1,
    color: colors.grey0,
    fontSize: normalize(22),
    opacity: 0.9,
    fontWeight: '800',
    ...Platform.select({
      ios: {
        fontWeight: 'normal',
      },
      android: {
        ...fonts.android.normal,
      },
    }),
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  numberAsterix: {
    fontSize: normalize(20),
    color: colors.grey0,
    opacity: 0.7,
    letterSpacing: 2,
    lineHeight: 0.1
  },
  number: {
    fontSize: normalize(20),
    color: colors.black,
    fontWeight: 'bold',
    marginTop: 4,
    fontFamily: 'Ayuthaya',
  },
  moreButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  moreText: {
    color: colors.link,
    fontSize: normalize(25),
    marginRight: 7,
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Card;
