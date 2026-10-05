import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { playSound } from "../services/soundHandler";

function WordCard({ wordInfo, setNext }) {
  const [showFullInfo, setShowFullInfo] = useState(false);
  const colors = useSelector((state) => state.theme.colors);

  function handleDidntKnowIt() {
    setShowFullInfo(false);
    setNext(false);
  }

  function handleKnewIt() {
    setShowFullInfo(false);
    setNext(true);
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.wordContainer}
        onPress={() => setShowFullInfo(true)}
      >
        <Text style={[styles.word, { color: colors.fontMain }]}>
          {wordInfo.word}
        </Text>

        {showFullInfo && (
          <>
            <Text style={[styles.phonetics, { color: colors.fontMain }]}>
              {wordInfo.phonetics}
            </Text>

            {wordInfo.audio && (
              <Pressable
                style={styles.playPressable}
                onPress={() => playSound(wordInfo.audio)}
              >
                <Ionicons
                  name="volume-medium-outline"
                  size={28}
                  color={colors.primary900}
                />
              </Pressable>
            )}

            <Text style={[styles.meaning, { color: colors.fontMain }]}>
              {wordInfo.meaning}
            </Text>
          </>
        )}
      </Pressable>

      {showFullInfo && (
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={handleDidntKnowIt}
            style={({ pressed }) => [
              styles.remember,
              {
                backgroundColor: colors.secondary800,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.rememberText,
                { color: colors.fontInverse },
              ]}
            >
              Didn't know it
            </Text>
          </Pressable>

          <Pressable
            onPress={handleKnewIt}
            style={({ pressed }) => [
              styles.remember,
              {
                backgroundColor: colors.primary900,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.rememberText,
                { color: colors.fontInverse },
              ]}
            >
              Knew it
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  wordContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 250,
  },

  word: {
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
  },

  phonetics: {
    fontSize: 20,
    marginTop: 15,
    textAlign: "center",
  },

  meaning: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },

  playPressable: {
    marginTop: 15,
  },

  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 30,
  },

  remember: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  rememberText: {
    fontSize: 18,
  },
});

export default WordCard;