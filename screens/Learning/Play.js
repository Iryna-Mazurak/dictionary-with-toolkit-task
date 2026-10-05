import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WordCard from "../../components/WordCard";
import { wordsLearningActions } from "../../store/wordsLearningSlice";

export default function Play() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const dispatch = useDispatch();
  const colors = useSelector((state) => state.theme.colors);
  const words = useSelector((state) => state.wordsLearning.words);

  const wordsToStudy = words.filter((word) => word.status < 2);

  function handleNext(knewIt) {
    const currentWord = wordsToStudy[currentWordIndex];

    if (!currentWord) {
      return;
    }

    if (knewIt) {
      dispatch(
        wordsLearningActions.updateWordLearnInfo(currentWord.word)
      );
    }

    setCurrentWordIndex((prevIndex) => {
      if (wordsToStudy.length <= 1) {
        return 0;
      }

      return (prevIndex + 1) % wordsToStudy.length;
    });
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.appBackground },
      ]}
    >
      {wordsToStudy.length === 0 ? (
        <>
          <Text
            style={[
              styles.text,
              {
                color: colors.fontMain,
                alignSelf: "center",
              },
            ]}
          >
            Congrats!
          </Text>

          <Text
            style={[
              styles.text,
              { color: colors.fontMain },
            ]}
          >
            For now you have learnt all the words
          </Text>

          <Image
            style={styles.image}
            source={require("../../assets/well-done-icon.png")}
          />
        </>
      ) : (
        <WordCard
          wordInfo={wordsToStudy[currentWordIndex % wordsToStudy.length]}
          setNext={handleNext}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 22,
    margin: 10,
    marginTop: 25,
  },

  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
});