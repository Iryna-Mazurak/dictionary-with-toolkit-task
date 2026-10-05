import "react-native-gesture-handler";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import MainNavigator from "./navigators/MainNavigator";
import store from "./store";

import { wordsLearningActions } from "./store/wordsLearningSlice";
import { REFRESH_STATUSES_SPAN } from "./constants";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        wordsLearningActions.updateStatuses()
      );
    }, REFRESH_STATUSES_SPAN);

    return () => clearInterval(interval);
  }, [dispatch]);

  return <MainNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}