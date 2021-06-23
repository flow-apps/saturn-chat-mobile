import React, { useCallback, useMemo, useState, useEffect, memo } from "react";
import { FlatList } from "react-native";
import _ from "lodash";
import emojiSource from "emoji-datasource";

import { Container, EmojiContainer, EmojiTitle, Emoji } from "./styles";
import { StorageService } from "../../services/Storage";
import EmojiConversor from "emoji-js";

const Storage = new StorageService();

interface EmojiPickerProps {
  onClick: (emoji: string) => any;
}

const EmojiPicker = ({ onClick }: EmojiPickerProps) => {
  const [lastEmojis, setLastEmojis] = useState<string[]>();
  const emojiJS = new EmojiConversor();

  const emojis = emojiSource.filter((e) => !e.obsoletes && !e.obsoleted_by);
  const memoizedEmojis = useMemo(
    () => _.orderBy(emojis, "sort_order"),
    [emojis]
  );

  useEffect(() => {
    (async () => {
      const history = await Storage.getItem("@SaturnChat:EmojiHistory");

      if (history) {
        setLastEmojis(JSON.parse(history));
      }
    })();
  }, []);

  const codeToEmoji = (code: any) => {
    emojiJS.replace_mode = "unified";
    emojiJS.allow_native = true;
    emojiJS.text_mode = true;

    const hex = emojiJS.replace_unified(code);
    return String.fromCodePoint(parseInt(hex, 16));
  };

  const handleSelectEmoji = useCallback(async (emoji: string) => {
    onClick(emoji);
    const emojiHistory = await Storage.getItem("@SaturnChat:EmojiHistory");

    if (emojiHistory) {
      const newHistory = [emoji, ...JSON.parse(emojiHistory)];
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
    <EmojiContainer
      onPress={() =>
        handleSelectEmoji(item.unified && codeToEmoji(item.unified))
      }
    >
      <Emoji>{item.unified && String(codeToEmoji(item.unified))}</Emoji>
    </EmojiContainer>
  );

  return (
    <Container>
      <EmojiTitle>Selecione emojis</EmojiTitle>
      <FlatList
        data={memoizedEmojis}
        windowSize={3}
        getItemLayout={getItemLayout}
        keyExtractor={getKey}
        numColumns={8}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        renderItem={renderEmoji}
      />
    </Container>
  );
};

export default memo(EmojiPicker);
