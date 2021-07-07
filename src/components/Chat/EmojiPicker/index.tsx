import React, { memo, useCallback, useEffect, useState, useMemo } from "react";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import emojiSource from "emoji-datasource";
import _ from "lodash";
import { FlatList } from "react-native";
import Toast from "react-native-simple-toast";
import { useTheme } from "styled-components";
import { StorageService } from "../../../services/Storage";
import {
  Container,
  Emoji,
  EmojiContainer,
  TopOption,
  TopOptionsContainer,
} from "./styles";

const Storage = new StorageService();

interface EmojiPickerProps {
  onClick: (emoji: string) => any;
  visible: boolean;
}

enum Categories {
  HISTORY = "History",
  SMILEYS = "Smileys & Emotion",
  PEOPLE = "People & Body",
  NATURE = "Animals & Nature",
  FOOD = "Food & Drink",
  ACTIVITIES = "Activities",
  OBJECTS = "Objects",
  PLACES = "Travel & Places",
  SYMBOLS = "Symbols",
  FLAGS = "Flags",
}

const EmojiPicker = ({ onClick, visible }: EmojiPickerProps) => {
  const [lastEmojis, setLastEmojis] = useState<any[]>();
  const [emojisToRender, setEmojisToRender] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const { colors } = useTheme();

  const emojisCategories = useMemo(() => {
    const emojis = emojiSource.filter((e) => !e.obsoletes && !e.obsoleted_by);
    const sortedEmojis = _.orderBy(emojis, "sort_order");
    return _.groupBy(sortedEmojis, "category");
  }, [emojiSource]);

  const selectEmojisByCategory = useCallback(
    (category: string) => {
      if (currentCategory === category) return;
      if (category === "History" && lastEmojis) {
        setCurrentCategory("History");

        return setEmojisToRender(lastEmojis);
      }

      setEmojisToRender(emojisCategories[category]);
      setCurrentCategory(category);
    },
    [emojisToRender]
  );

  const clearEmojisHistory = async () => {
    setLastEmojis([]);
    Toast.show("Histórico de emojis apagado");
    return await Storage.deleteItem("@SaturnChat:EmojiHistory");
  };

  useEffect(() => {
    return setEmojisToRender(emojisCategories[Categories.SMILEYS]);
  }, []);

  useEffect(() => {
    (async () => {
      const history = await Storage.getItem("@SaturnChat:EmojiHistory");

      if (history) {
        setLastEmojis(_.orderBy(JSON.parse(history), "sort_order"));
      }
    })();
  }, []);

  const codeToEmoji = (code: any) => {
    var codes = code.split("-");
    var buffer = "";
    for (var i = 0; i < codes.length; i++) {
      buffer += String.fromCodePoint(parseInt(codes[i], 16));
    }
    return buffer;
  };

  const addToHistory = async (emoji: any) => {
    const emojiHistory = await Storage.getItem("@SaturnChat:EmojiHistory");

    if (emojiHistory) {
      const parsedEmojiHistory = JSON.parse(emojiHistory);
      const hasEmoji = JSON.parse(emojiHistory).filter(
        (e: any) => e.name === emoji.name
      );

      if (hasEmoji.length > 0) return;

      const newHistory = [emoji, ...parsedEmojiHistory];

      await Storage.saveItem(
        "@SaturnChat:EmojiHistory",
        JSON.stringify(newHistory)
      );
    } else {
      await Storage.saveItem(
        "@SaturnChat:EmojiHistory",
        JSON.stringify([emoji])
      );
    }
  };

  const handleSelectEmoji = useCallback(async (emoji: any) => {
    onClick(codeToEmoji(emoji.unified));
    setLastEmojis((le) => (le ? [...le, emoji] : []));

    if (emoji && currentCategory !== Categories.HISTORY) {
      addToHistory(emoji);
    }
  }, []);

  const getItemLayout = (data: any, index: number) => ({
    length: 35,
    offset: 35 * index,
    index,
  });

  const getKey = (item: typeof emojiSource[0]) => {
    return item.name;
  };

  const renderEmoji = ({ item }: any) => (
    <EmojiContainer onPress={() => handleSelectEmoji(item)}>
      <Emoji>{item.unified && String(codeToEmoji(item.unified))}</Emoji>
    </EmojiContainer>
  );

  return (
    <Container visible={visible}>
      <TopOptionsContainer>
        <TopOption
          onLongPress={clearEmojisHistory}
          onPress={() => selectEmojisByCategory(Categories.HISTORY)}
        >
          <Feather name="clock" size={22} color={colors.black} />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.SMILEYS)}>
          <Feather name="smile" size={22} color={colors.black} />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.PEOPLE)}>
          <Feather name="user" size={22} color={colors.black} />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.NATURE)}>
          <Ionicons name="leaf-outline" size={22} color={colors.black} />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.FOOD)}>
          <SimpleLineIcons name="cup" size={22} color={colors.black} />
        </TopOption>
        <TopOption
          onPress={() => selectEmojisByCategory(Categories.ACTIVITIES)}
        >
          <Ionicons
            name="ios-american-football-outline"
            size={22}
            color={colors.black}
          />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.PLACES)}>
          <SimpleLineIcons name="plane" size={25} color={colors.black} />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.OBJECTS)}>
          <Feather name="camera" size={22} color={colors.black} />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.SYMBOLS)}>
          <Feather name="hash" size={22} color={colors.black} />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.FLAGS)}>
          <Feather name="flag" size={22} color={colors.black} />
        </TopOption>
      </TopOptionsContainer>
      <FlatList
        data={emojisToRender}
        windowSize={2}
        getItemLayout={getItemLayout}
        keyExtractor={getKey}
        numColumns={8}
        initialNumToRender={5}
        maxToRenderPerBatch={15}
        renderItem={renderEmoji}
      />
    </Container>
  );
};

export default memo(EmojiPicker);
