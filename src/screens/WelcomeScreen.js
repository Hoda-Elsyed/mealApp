import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(
      () => ((ring1Padding.value = withSpring(ring1Padding.value + hp(5))), 1000)
    );
    setTimeout(
      () => ((ring2Padding.value = withSpring(ring1Padding.value + hp(5))), 3000)
    );
    setTimeout(() => (navigation.navigate("Home"), 1000000000));
  }, []);
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      {/* logo image */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring1Padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring2Padding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>
      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="text-white font-bold tracking-widest"
        >
          Foody
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="text-white font-medium tracking-widest"
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};
export default WelcomeScreen;
