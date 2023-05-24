/* eslint-dsable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { View, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';

import styles from './styles';
// import { useAddReactionMutation, useDeleteReactionMutation } from '../../api/reaction'
import { AddEmoji } from '../../assets/images';
// import { useAppDispatch, useAppSelector } from '../../redux/store';
import { emojiMap } from '../../helpers/CheersHelpers';

interface addReactionProps {
  reactorId: string;
  cheersId: string;
  reactionType: string;
}

export interface CheersCardProps {
  data: object;
  parentStyle?: ViewStyle;
  colors: any;
  dark: boolean;
  fonts: {};
  pressUserName: (str: string) => void;
  pressValue: (item: any) => void;
  emojiListOpened: () => void;
  emojiListClosed: () => void;
  addedReactions: any[];
  deletedReactions: any[];
  setAddedReactions: ([]) => void;
  setDeletedReactions: ([]) => void;
  uid: string;
}

const CheersCard = ({
  data,
  parentStyle = {},
  colors,
  dark,
  fonts,
  pressUserName,
  pressValue,
  emojiListOpened,
  emojiListClosed,
  addedReactions,
  deletedReactions,
  setAddedReactions,
  setDeletedReactions,
  uid,
}: CheersCardProps) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState(undefined);
  const [selectedEmojisName, setSelectedEmojisName] = useState(undefined);
  const [reactions, setReactions] = useState(undefined);
  const recipient = data?.recipient;
  const sender = data?.sender;
  const values = data?.values;
  // const [timePosted, setTimePosted] = useState('');
  const [loading, setLoading] = useState(false);
  moment.locale('en');
  const { base } = fonts;
  const { link } = fonts;
  const { detailOne } = fonts;

  const updateReactions = (dataReactions) => {
    let x = [];
    let y = [];
    let z = [];
    if (dataReactions) {
      // const newItems = dataReactions.filter((item) => item[1].map((item2) => item2.reactionId !== del))
      Object.entries(dataReactions).map((item) => {
        const exist = emojiMap.get(item[0]);
        if (exist) {
          x.push({ ...exist, count: item[1].length });
          item[1].map((reaction) => {
            if (reaction.reactorId === uid) {
              y.push({
                ...exist,
                count: item[1].length,
                reactionId: reaction.reactionId,
              });
              z.push(exist.name);
            }
            return null;
          });
        }
        return null;
      });
      if (deletedReactions && deletedReactions.length > 0) {
        deletedReactions.map((item) => {
          x.map((item1, index) => {
            if (item1.name === item.name) {
              if (item1.count === 1) {
                x = x.filter((item2) => item2.name !== item.name);
              } else {
                item1.count -= 1;
              }
            }
          });
          z = z.filter((item1) => item1 !== item.name);
          y = y.filter((item1) => item1.reactionId !== item.reactionId);
        });
      }
      if (addedReactions) {
        addedReactions.map((item) => {
          const r = { state: false, index: 0 };
          const exist = emojiMap.get(item.reactionType);
          x.map((item1, index) => {
            if (item1.name === item.reactionType) {
              r.state = true;
              r.index = index;
            }
          });
          if (r.state) {
            x[r.index].count += 1;
          } else {
            x.push({ ...exist, count: 1 });
          }
          y.push({
            ...exist,
            count: 1,
            reactionId: null,
          });
          z.push(exist.name);
          return null;
        });
      } // this item
    }
    setReactions(x);
    setSelectedEmojis(y);
    setSelectedEmojisName(z);
  };

  useEffect(() => {
    if (data && data.reactions && data.reactionCount) {
      updateReactions(data?.reactions);
    }
  }, [data, addedReactions, deletedReactions]);

  useEffect(() => {
    setLoading(reactions && selectedEmojis && selectedEmojisName);
  }, [reactions, selectedEmojis, selectedEmojisName]);

  const addOrRemoveReaction = (emoji, add: boolean) => {
    const tempReactions = [...reactions];
    // Add a reaction
    if (add) {
      let changedValue = false;
      tempReactions.map((reaction, index) => {
        // reaction already has an occurance, add 1 to the count
        if (reaction.name === emoji.name) {
          // eslint-disable-next-line no-param-reassign
          reaction.count += 1;
          changedValue = true;
          return setReactions(tempReactions);
        }
        // reaction has never occured, create a new item and add it
        if (index === tempReactions.length - 1 && !changedValue) {
          return setReactions([...tempReactions, { ...emoji, count: 1 }]);
          // return reactions.push({ ...emoji, count: 1 });
        }
        return null;
      });
    } else {
      // Remove a reaction
      tempReactions.map((reaction, index) => {
        if (reaction.name === emoji.name) {
          // reaction has more than one occurance, remove 1 and finish
          if (reaction.count > 1) {
            // eslint-disable-next-line no-param-reassign
            reaction.count -= 1;
            return setReactions(tempReactions);
          }
          // reaction has only 1 occurance, remove item completely.
          tempReactions.splice(index, 1);
          return setReactions(tempReactions);
        }
        return null;
      });
    }
  };

  const isEmojiSelected = (existingEmoji: any) =>
    selectedEmojis.length
      ? selectedEmojis.some((emoji) => emoji.emoji === existingEmoji)
      : false;

  const pressEmoji = (emoji) => {
    // eslint-disable-next-line no-param-reassign
    const exists = selectedEmojis?.some((item) => item?.name === emoji.name);

    if (exists) {
      // addOrRemoveReaction(emoji, false);
      const per = addedReactions.some(
        (item) => item.reactionType === emoji.name,
      );
      const zed = selectedEmojis.filter((item) => item.name === emoji.name);
      const x = selectedEmojisName.filter((item) => item !== emoji.name);
      setSelectedEmojisName(x);
      setSelectedEmojis(zed);
      if (!per) {
        setDeletedReactions([
          ...deletedReactions,
          { reactionId: zed[0].reactionId, name: emoji.name },
        ]);
        // deleteReaction(zed[0].reactionId);
      } else {
        setAddedReactions(
          addedReactions.filter((item) => item.reactionType !== emoji.name),
        );
      }
    } else {
      // selectedEmojisName.push(emoji.name);
      // setSelectedEmojisName([...selectedEmojisName, emoji.name]);
      // setSelectedEmojis([...selectedEmojis, { ...emoji, count: 1 }]);
      setAddedReactions([
        ...addedReactions,
        {
          reactorId: uid,
          cheersId: data.id,
          reactionType: emoji.name,
        },
      ]);
    }
  }; // This entire thing

  const closeEmojiKeyboard = () => {
    setIsEmojiPickerOpen(false);
    emojiListClosed();
  };

  const renderEmoji = (emoji) => {
    const isSelected = isEmojiSelected(emoji.emoji);
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          marginRight: 15,
          marginBottom: 5,
          alignItems: 'center',
          height: 28,
          paddingHorizontal: 6,
          borderRadius: 41,
          flexDirection: 'row',
          backgroundColor: isSelected
            ? colors.emojiBackgroundSelected
            : colors.emojiBackgroundUnselected,
        }}
        key={emoji.name}
        onPress={() => {
          pressEmoji(emoji);
        }}
      >
        <Text
          style={{
            fontSize: 19,
            color: colors.text,
          }}
        >
          {emoji.emoji}{' '}
          <Text
            style={{
              ...detailOne,
              color: colors.text,
              paddingLeft: 4,
            }}
          >
            ``
            {emoji.count}
          </Text>
        </Text>
      </TouchableOpacity>
    );
  };

  return !loading ? (
    <View style={{ width: 200, height: 200, backgroundColor: 'red' }} />
  ) : (
    <>
      <View
        style={{
          backgroundColor: colors.cheersBackground,
          shadowColor: '#7E7E7E',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: dark ? 0 : 0.5,
          borderRadius: 6,
          width: '100%',
          elevation: 10,
          paddingVertical: 17,
          paddingHorizontal: 22,
        }}
      >
        <View style={{}}>
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <Image
              source={{ uri: sender?.imageUrl }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: colors.cheersBackground,
              }}
              resizeMode="contain"
            />
            <Image
              source={{ uri: recipient?.imageUrl }}
              style={{
                width: 46,
                height: 46,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: colors.cheersBackground,
                right: 10,
              }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              ...base,
              color: colors.text,
            }}
          >
            <Text
              style={{
                ...link,
                color: colors.accent,
                textDecorationColor: colors.accent,
              }}
              onPress={() => pressUserName(sender?.id)}
            >{`${sender?.firstName} ${sender?.lastName} `}</Text>
            to
            <Text
              style={{
                ...link,
                color: colors.accent,
                textDecorationColor: colors.accent,
              }}
              onPress={() => pressUserName(recipient?.id)}
            >{` ${recipient?.firstName} ${recipient?.lastName}`}</Text>
          </Text>
        </View>
        <Image
          source={{ uri: data?.imageUrl }}
          style={{ width: '100%', height: 201, marginTop: 12, borderRadius: 7 }}
          resizeMode="stretch"
        />
        <Text style={{ marginTop: 11, color: colors.text }} numberOfLines={1}>
          {data?.note}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 7, flexWrap: 'wrap' }}>
          {values?.map((item) => (
            <Text
              style={{ marginRight: 8, color: colors.accent }}
              key={item}
              onPress={() => pressValue(item)}
            >
              {`#${item.label || item.value}`}
            </Text>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            marginRight: -4,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {/* Reactions logic */}
          {/* Emojis */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {!!reactions &&
              reactions.length > 0 &&
              reactions.map((emoji, index) => renderEmoji(emoji, index))}
            <TouchableOpacity
              onPress={() => {
                setIsEmojiPickerOpen(true);
                emojiListOpened();
              }}
            >
              <Image
                source={AddEmoji}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: '#B0A19B',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <EmojiPicker
        selectedEmojis={selectedEmojisName}
        defaultHeight={160}
        hideHeader
        expandable={false}
        open={isEmojiPickerOpen}
        allowMultipleSelections
        onEmojiSelected={(emoji) => pressEmoji(emoji)}
        onClose={closeEmojiKeyboard}
        theme={{
          backdrop: '#16161888',
          knob: colors.accent,
          container: colors.cheersBackground,
          header: colors.accent,
          skinTonesContainer: colors.profileInfoSection,
          search: {
            text: colors.text,
            placeholder: colors.text,
            icon: colors.text,
            background: 'transparent',
          },
          category: {
            icon: colors.text,
            iconActive: colors.accent,
            container: colors.profileInfoSection,
            containerActive: colors.secondaryButton,
          },
        }}
      />
    </>
  );
};

export default CheersCard;
