/* eslint-dsable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';

import moment from 'moment';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Share,
  Alert,
} from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';

import styles from './styles';
// import { useAddReactionMutation, useDeleteReactionMutation } from '../../api/reaction';
import { AddEmoji } from 'src/assets/images';
// import { useAppDispatch, useAppSelector } from '../../redux/store';
import { emojiMap } from 'src/helpers/CheersHelpers';

export interface CheersCardProps {
  data: object;
  parentStyle: ViewStyle;
  colors: any;
  dark: boolean;
}

const CheersCard = ({
  data,
  parentStyle = {},
  colors,
  dark,
}: CheersCardProps) => {
  const style = styles(colors, dark);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState(undefined);
  const [selectedEmojisName, setSelectedEmojisName] = useState(undefined);
  const [reactions, setReactions] = useState(undefined);
  // const { uid } = useAppSelector((state: RootState) => state.auth);
  const recipient = data?.recipient;
  const sender = data?.sender;
  const values = data?.values;
  // const dispatch = useAppDispatch();
  // const [deleteReaction] = useDeleteReactionMutation();
  // const [addReaction] = useAddReactionMutation();
  // const [timePosted, setTimePosted] = useState('');
  moment.locale('en');

  const updateReactions = (dataReactions) => {
    const x = [];
    const y = [];
    const z = [];
    if (dataReactions) {
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
    }
    setReactions(x);
    setSelectedEmojis(y);
    setSelectedEmojisName(z);
  };

  // const updateTime = (time: string) => {
  //   const itemTimePosted = moment.utc(time);
  //   const now = moment(new Date()); //todays date
  //   const currentDate = now.format('M/D/YY');
  //   const datePosted = itemTimePosted.format('M/D/YY');

  //   if (currentDate === datePosted) {
  //     const end = moment(itemTimePosted); // another date
  //     const duration = moment.duration(now.diff(end));
  //     // eslint-disable-next-line
  //     const { hours } = duration._data;
  //     // eslint-disable-next-line
  //     const { minutes } = duration._data;
  //     if (hours > 0) {
  //       if (hours === 1) {
  //         setTimePosted(`${hours} hr ago`);
  //       } else {
  //         setTimePosted(`${hours} hrs ago`);
  //       }
  //     } else if (minutes > 0) {
  //       if (minutes === 1) {
  //         setTimePosted(`${minutes} min ago`);
  //       } else {
  //         setTimePosted(`${minutes} mins ago`);
  //       }
  //     } else {
  //       setTimePosted('1 min ago');
  //     }
  //   } else {
  //     setTimePosted(datePosted);
  //   }
  // };

  useEffect(() => {
    if (data) {
      updateReactions(data?.reactions);
      // updateTime(data?.created);
      // if (recipient?.id === uid) {
      //   if (checkIfCheersViewed(data.id, cheersViewed)) {
      //     setIsNew(false);
      //   } else {
      //     setIsNew(true);
      //   }
      // }
    }
  }, [data]);

  // useEffect(() => {
  //   setLoading(reactions && selectedEmojis && selectedEmojisName);
  // }, [reactions, selectedEmojis, selectedEmojisName]);

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
      addOrRemoveReaction(emoji, false);
      const zed = selectedEmojis.filter((item) => item.name === emoji.name);
      const x = selectedEmojisName.filter((item) => item !== emoji.name);
      setSelectedEmojisName(x);
      // deleteReaction(zed[0].reactionId);
    } else {
      selectedEmojisName.push(emoji.name);
      selectedEmojis.push({ ...emoji, count: 1 });
      // addReaction({ reactorId: uid, cheersId: data.id, reactionType: emoji.name });
    }
  };

  const closeEmojiKeyboard = () => {
    setIsEmojiPickerOpen(false);
  };

  const renderEmoji = (emoji) => {
    const isSelected = isEmojiSelected(emoji.emoji);
    return (
      <TouchableOpacity
        style={[
          style.emojiContainer,
          {
            backgroundColor: isSelected
              ? colors.emojiBackgroundSelected
              : colors.emojiBackgroundUnselected,
          },
        ]}
        key={emoji.name}
        onPress={() => {
          pressEmoji(emoji);
        }}
      >
        <Text style={style.emojiStyle}>
          {emoji.emoji} <Text style={style.emojiCounter}>{emoji.count}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  const confirmationView = () => (
    <>
      <View style={[style.container, parentStyle]}>
        <View style={style.dashboardProfileImagesContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: sender?.imageUrl }}
              style={style.dashboardSenderPicture}
              resizeMode="contain"
            />
            <Image
              source={{ uri: recipient?.imageUrl }}
              style={style.dashboardReceiverPicture}
              resizeMode="contain"
            />
          </View>
          <Text style={style.confirmationViewUnbolded}>
            <Text
              style={style.boldedText}
            >{`${sender?.firstName} ${sender?.lastName}`}</Text>{' '}
            to{' '}
            <Text
              style={style.boldedText}
            >{`${recipient?.firstName} ${recipient?.lastName}`}</Text>
          </Text>
        </View>
        <Image
          source={{ uri: data?.imageUrl }}
          style={style.mainImage}
          resizeMode="stretch"
        />
        <Text style={style.messageText} numberOfLines={1}>
          {data?.note}
        </Text>
        <View style={style.confirmationValuesContainer}>
          {values?.map((item) => (
            <Text
              style={style.valuesText}
              key={item}
              onPress={() => navigate(VALUE_FILTER, { item })}
            >
              {item.label || item.value}
            </Text>
          ))}
        </View>
        <View style={style.dashboardFooter}>
          {!!reactions.length &&
            reactions.map((emoji, index) => renderEmoji(emoji, index))}
          <TouchableOpacity onPress={() => setIsEmojiPickerOpen(true)}>
            <Image source={AddEmoji} style={style.addEmojiStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <EmojiPicker
        enableSearchBar
        enableSearchAnimation={false}
        selectedEmojis={selectedEmojisName}
        open={isEmojiPickerOpen}
        // allowMultipleSelections
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

  return confirmationView();
};

export default CheersCard;
