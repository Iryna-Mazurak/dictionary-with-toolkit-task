import { createSlice, createSelector } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

const wordsLearningSlice = createSlice({
  name: "wordsLearning",
  initialState,
  reducers: {
    addWord: (state, action) => {
      const wordData = action.payload;

      const alreadyExists = state.words.some(
        (word) => word.word === wordData.word
      );

      if (alreadyExists) {
        return;
      }

      const now = Date.now();

      state.words.push({
        ...wordData,
        dateForgets: now - INITIAL_FORGETTING_SPAN,
        dateTotallyForgets: now,
        forgettingSpan: INITIAL_FORGETTING_SPAN,
        status: 0,
      });
    },

    updateWord: (state, action) => {
      const updatedWord = action.payload;

      const word = state.words.find(
        (item) => item.word === updatedWord.word
      );

      if (word) {
        word.phonetics = updatedWord.phonetics;
        word.audio = updatedWord.audio;
        word.meaning = updatedWord.meaning;
        word.partOfSpeech = updatedWord.partOfSpeech;
      }
    },

    removeWord: (state, action) => {
      state.words = state.words.filter(
        (word) => word.word !== action.payload
      );
    },

    updateWordLearnInfo: (state, action) => {
      const word = state.words.find(
        (item) => item.word === action.payload
      );

      if (!word) {
        return;
      }

      const now = Date.now();
      const currentForgettingSpan = word.forgettingSpan;

      word.dateForgets = now + currentForgettingSpan;
      word.dateTotallyForgets = now + currentForgettingSpan * 2;
      word.forgettingSpan = currentForgettingSpan * 2;
      word.status = 2;
    },

    updateStatuses: (state) => {
      const now = Date.now();

      state.words.forEach((word) => {
        if (now > word.dateTotallyForgets) {
          word.status = 0;
        } else if (now > word.dateForgets) {
          word.status = 1;
        } else {
          word.status = 2;
        }
      });
    },
  },
});

export const selectWords = (state) => state.wordsLearning.words;

export const selectWordsWithStatus = createSelector(
  [selectWords],
  (words) => words
);

export const wordsLearningActions = wordsLearningSlice.actions;

export default wordsLearningSlice;