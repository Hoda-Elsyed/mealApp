import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Loading = (props) => (
  <View className="flex flex-1 justify-center items-center">
    <ActivityIndicator {...props} />
  </View>
);

export default Loading;
