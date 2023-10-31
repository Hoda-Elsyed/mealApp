import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, UsersIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const RecipeDetailScreen = (props) => {
  let item = props.route.params;
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (response && response.data) {
        setMeals(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.error("error: ", error.message);
    }
  };

  const ingredientIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYouTubeId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <Image
          style={{
            height: hp(50),
            width: wp(98),
            borderRadius: 43,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            marginTop: 4,
          }}
          source={{ uri: item.strMealThumb }}
          sharedTransitionTag={item.strMeal}
        />
      </View>
      {/* back button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full bg-white p-2 ml-5"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className="rounded-full bg-white p-2 mr-5"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>
      {/* meal Description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 pt-8 space-y-4 flex justify-between">
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.duration(7000).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              className="flex-1 font-bold text-neutral-700"
              style={{ fontSize: hp(3) }}
            >
              {meal?.strMeal}
            </Text>
            <Text
              className="flex-1 font-medium text-neutral-500"
              style={{ fontSize: hp(2) }}
            >
              {meal?.strArea}
            </Text>
          </Animated.View>
          {/* misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(7000)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex rounded-full bg-white items-center justify-center"
              >
                <ClockIcon size={hp(4)} color="#525252" strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex rounded-full bg-white items-center justify-center"
              >
                <UsersIcon size={hp(4)} color="#525252" strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex rounded-full bg-white items-center justify-center"
              >
                <FireIcon size={hp(4)} color="#525252" strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex rounded-full bg-white items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  color="#525252"
                  strokeWidth={2.5}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  {/* 103 */}
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>
          {/* Ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(7000)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-neutral-700 flex-1"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    ></View>
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>
          {/* Instruction */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(7000)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-neutral-700 flex-1"
            >
              Instruction
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700 ">
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe video */}
          {meal.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(7000)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold text-neutral-700 flex-1"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYouTubeId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};
export default RecipeDetailScreen;
