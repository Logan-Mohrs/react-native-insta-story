import { StyleSheet } from 'react-native';

const styles = (colors: any, dark: boolean, fonts: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.cheersBackground,
      shadowColor: '#7E7E7E',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: dark ? 0 : 0.5,
      borderRadius: 6,
      width: '100%',
      elevation: 10,
      paddingVertical: 17,
      paddingHorizontal: 22,
    },
    smallContainer: {
      backgroundColor: colors.cheersBackground,
      shadowColor: '#7E7E7E',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      borderRadius: 6,
      elevation: 10,
    },
    emojiContainer: {
      justifyContent: 'center',
      marginRight: 15,
      marginBottom: 5,
      alignItems: 'center',
      height: 28,
      paddingHorizontal: 6,
      borderRadius: 41,
      backgroundColor: '#F3F0E7',
      flexDirection: 'row',
    },
    emojiStyle: {
      fontSize: 19,
      color: colors.text,
    },
    emojiCounter: {
      ...fonts.detailOne,
      color: colors.text,
      paddingLeft: 4,
    },
    reivedCheersText: {
      ...fonts.boldBase,
      alignSelf: 'center',
      color: colors.text,
    },
    mainImage: {
      width: '100%',
      height: 201,
      marginTop: 12,
      borderRadius: 7,
    },
    profileImagesContainer: {
      flexDirection: 'row',
      marginTop: 12,
    },
    senderPicture: {
      width: 45,
      height: 45,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors.cheersBackground,
    },
    receiverPicture: {
      width: 46,
      height: 46,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: colors.cheersBackground,
      right: 9,
    },
    nameDateContainer: {
      flexDirection: 'row',
      marginTop: 11,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    unboldedText: {
      ...fonts.base,
      color: colors.text,
    },
    boldedText: {
      ...fonts.link,
      color: colors.accent,
      textDecorationColor: colors.accent,
    },
    timePosted: {
      ...fonts.detailTwo,
      textAlign: 'right',
      color: colors.unselected,
    },
    messageText: {
      marginTop: 11,
      color: colors.text,
    },
    valuesContainer: {
      flexDirection: 'row',
      marginTop: 6,
      flexWrap: 'wrap',
    },
    dashboardValuesContainer: {
      flexDirection: 'row',
      marginTop: 10,
      flexWrap: 'wrap',
    },
    confirmationValuesContainer: {
      flexDirection: 'row',
      marginTop: 7,
      flexWrap: 'wrap',
    },
    valuesText: {
      marginRight: 8,
      color: colors.accent,
    },
    receiverEmojiContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      flexWrap: 'wrap',
    },
    addEmojiStyle: {
      width: 24,
      height: 24,
      tintColor: '#B0A19B',
    },
    dashboardTimeContainer: {
      position: 'absolute',
      right: 9,
      top: 3,
      alignItems: 'center',
    },
    dashboardBodyContainer: {
      marginVertical: 17,
      marginHorizontal: 22,
    },
    dashboardProfileImagesContainer: {
      alignItems: 'center',
    },
    dashboardSenderPicture: {
      // TODO: Possibly reduce size further since figma measurments are slightly off
      width: 45,
      height: 45,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors.cheersBackground,
    },
    dashboardReceiverPicture: {
      width: 46,
      height: 46,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: colors.cheersBackground,
      right: 7,
    },
    dashboardFooter: {
      flexDirection: 'row',
      marginTop: 12,
      marginRight: -4,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    dashboardEmojiContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      maxWidth: '75%',
    },
    confirmationViewUnbolded: {
      ...fonts.base,
      color: colors.text,
    },
    uploadImageContainer: {
      flex: 1,
      bottom: 4,
    },
    uploadImageStyle: {
      width: 32,
      height: 32,
      alignSelf: 'flex-end',
      tintColor: colors.text,
    },
    confirmationSeeMoreContainer: {
      marginTop: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    // TODO: Remove if Kate says original look is better.
    namesContainer: {
      flexDirection: 'row',
    },
    confirmationFooter: {
      marginTop: 12,
      alignItems: 'flex-end',
    },
  });

export default styles;
