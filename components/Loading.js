import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = (props) => {
  return (
    <View className="flex flex-1 items-center justify-center">
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
