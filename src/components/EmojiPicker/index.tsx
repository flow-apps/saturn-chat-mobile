import React, { useCallback, useState, useEffect, memo } from "react";
import { FlatList } from "react-native";
import _ from "lodash";
import emojiSource from "emoji-datasource";

import {
  Container,
  TopOptionsContainer,
  TopOption,
  EmojiContainer,
  LastEmojisContainer,
  LastEmojis,
  Emoji,
} from "./styles";
import { StorageService } from "../../services/Storage";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Toast from "react-native-simple-toast";

const Storage = new StorageService();

interface EmojiPickerProps {
  onClick: (emoji: string) => any;
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
  FLAGS = "Flags",
}

const EmojiPicker = ({ onClick }: EmojiPickerProps) => {
  const [lastEmojis, setLastEmojis] = useState<any[]>();
  const [emojisToRender, setEmojisToRender] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const { colors } = useTheme();

  const emojis = emojiSource.filter((e) => !e.obsoletes && !e.obsoleted_by);
  const sortedEmojis = _.orderBy(emojis, "sort_order");
  const emojisCategories = _.groupBy(sortedEmojis, "category");

  const selectEmojisByCategory = useCallback(
    (category: string) => {
      if (currentCategory === category) return;
      if (category === "History" && lastEmojis) {
        return setEmojisToRender(lastEmojis);
      }

      setCurrentCategory(category);
      return setEmojisToRender(emojisCategories[category]);
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
        setLastEmojis(JSON.parse(history));
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

  const handleSelectEmoji = useCallback(async (emoji: any) => {
    onClick(codeToEmoji(emoji.unified));
    setLastEmojis((le) => (le ? [...le, emoji] : []));

    const emojiHistory = await Storage.getItem("@SaturnChat:EmojiHistory");

    if (emojiHistory) {
      const newHistory = [JSON.stringify(emoji), ...JSON.parse(emojiHistory)];
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
    <Container>
      <TopOptionsContainer>
        <TopOption
          onLongPress={clearEmojisHistory}
          onPress={() => selectEmojisByCategory(Categories.HISTORY)}
        >
          <Feather name="clock" size={22} color={colors.primary} />
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
        <TopOption>
          <Feather name="hash" size={22} color={colors.black} />
        </TopOption>
        <TopOption onPress={() => selectEmojisByCategory(Categories.FLAGS)}>
          <Feather name="flag" size={22} color={colors.black} />
        </TopOption>
      </TopOptionsContainer>
      <FlatList
        data={emojisToRender}
        windowSize={3}
        getItemLayout={getItemLayout}
        keyExtractor={getKey}
        numColumns={8}
        initialNumToRender={20}
        maxToRenderPerBatch={1}
        renderItem={renderEmoji}
      />
    </Container>
  );
};

export default memo(EmojiPicker);
