import React, { useState, useEffect } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import DEFAULT_AVATAR from './assets/images/no_avatar.png';
import { usePrevious } from './helpers/StateHelpers';
import { IUserStory, StoryCircleListItemProps } from './interfaces';

const StoryCircleListItem = ({
  item,
  unPressedBorderColor,
  pressedBorderColor,
  unPressedAvatarTextColor,
  pressedAvatarTextColor,
  avatarSize = { height: 60, width: 60 },
  showText,
  avatarTextStyle,
  handleStoryItemPress,
  avatarImageStyle,
  avatarWrapperStyle,
}: StoryCircleListItemProps) => {
  const [isPressed, setIsPressed] = useState(item?.seen);

  const prevSeen = usePrevious(item?.seen);

  useEffect(() => {
    if (prevSeen != item?.seen) {
      setIsPressed(item?.seen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.seen]);

  const _handleItemPress = (item: IUserStory) => {
    if (handleStoryItemPress) handleStoryItemPress(item);

    setIsPressed(true);
  };

  // const avatarWrapperSize = avatarSize + 4;
  const avatarWrapperSize = 53;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#DDA63D', '#829CC0', '#3B506E', '#F5BA45']}
        style={{
          width: avatarWrapperSize + 6,
          height: avatarWrapperSize + 6,
          borderRadius: 100,
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => _handleItemPress(item)}
          style={[
            styles.avatarWrapper,
            {
              height: avatarWrapperSize,
              width: avatarWrapperSize,
            },
            avatarWrapperStyle,
            !isPressed
              ? {
                  borderColor: unPressedBorderColor ?? 'red',
                }
              : {
                  borderColor: pressedBorderColor ?? 'grey',
                },
          ]}
        >
          <Image
            style={[
              {
                height: avatarSize.height,
                width: avatarSize.width,
                borderRadius: 100,
              },
              avatarImageStyle,
            ]}
            // source={{ uri: item.user_image }}
            source={item.user_image}
            defaultSource={Platform.OS === 'ios' ? DEFAULT_AVATAR : null}
          />
        </TouchableOpacity>
      </LinearGradient>
      {showText && (
        <Text
          numberOfLines={1}
          // ellipsizeMode="tail"
          style={[
            {
              // width: avatarWrapperSize,
              ...styles.text,
              ...avatarTextStyle,
            },
            isPressed
              ? { color: pressedAvatarTextColor || item.colors.text }
              : { color: unPressedAvatarTextColor || item.colors.text },
          ]}
        >
          {item.user_name}
        </Text>
      )}
    </View>
  );
};

export default StoryCircleListItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'red',
    borderRadius: 100,
    height: 64,
    width: 64,
  },
  text: {
    marginTop: 3,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 11,
  },
});
