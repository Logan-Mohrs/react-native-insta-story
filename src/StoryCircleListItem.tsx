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
  newHighlights,
}: StoryCircleListItemProps) => {
  const _handleItemPress = (item: IUserStory) => {
    if (handleStoryItemPress) handleStoryItemPress(item);
  };

  const avatarWrapperSize = 53;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          newHighlights
            ? ['#DDA63D', '#829CC0', '#3B506E', '#F5BA45']
            : ['transparent', 'transparent']
        }
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
            source={item.user_image}
            defaultSource={Platform.OS === 'ios' ? DEFAULT_AVATAR : null}
          />
        </TouchableOpacity>
      </LinearGradient>
      {showText && (
        <Text
          numberOfLines={1}
          style={[
            {
              ...styles.text,
              ...avatarTextStyle,
              color: item.colors.text,
            },
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
