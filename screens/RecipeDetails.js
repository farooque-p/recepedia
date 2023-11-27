import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Entypo,
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubePlayer from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

const RecipeDetails = (props) => {
  const navigation = useNavigation();
  let item = props.route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      //console.log("Meal Data : ", response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error occured while getting categories!", error);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + [i]]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <View className="flex-1 bg-white relative">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <StatusBar style="dark" />
        <View className="flex-row justify-center">
          <Image
            source={{ uri: item?.strMealThumb }}
            style={{
              width: wp(100),
              height: hp(50),
              borderRadius: 40,
            }}
          />
        </View>
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          className="w-full absolute flex-row justify-between items-center pt-8"
        >
          <TouchableOpacity
            className="p-2 rounded-full ml-5 bg-white"
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 rounded-full mr-5 bg-white"
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <MaterialIcons
              name="favorite"
              size={24}
              color={isFavorite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </Animated.View>
        {/* Meal Description */}
        {loading ? (
          <Loading size="large" className="mt-18" />
        ) : (
          <Animated.View
            entering={FadeIn.delay(200).duration(1000)}
            className="px-4 flex justify-between space-y-4 pt-8"
          >
            <View className="space-y-2">
              <Text
                style={{ fontSize: hp(3) }}
                className="font-semibold text-neutral-700"
              >
                {meal.strMeal}
              </Text>
              <Text
                style={{ fontSize: hp(2) }}
                className="font-medium text-neutral-500"
              >
                {meal.strArea}
              </Text>
            </View>
            {/* Meal Misc Data */}
            <View className="flex-row justify-around">
              <View className="flex rounded-full items-center bg-amber-500 p-4">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white flex rounded-full justify-center items-center"
                >
                  <Feather name="clock" size={24} color="black" />
                </View>
                <View className="flex py-2 space-y-1 items-center">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    35
                  </Text>
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    Mins
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full items-center bg-amber-500 p-4">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white flex rounded-full justify-center items-center"
                >
                  <Entypo name="users" size={24} color="black" />
                </View>
                <View className="flex py-2 space-y-1 items-center">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    3
                  </Text>
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    Serving
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-500 p-4">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white flex rounded-full justify-center items-center"
                >
                  <FontAwesome name="fire" size={24} color="black" />
                </View>
                <View className="flex py-2 space-y-1 items-center">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    150
                  </Text>
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    Calorie
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full items-center bg-amber-500 p-4">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white flex rounded-full justify-center items-center"
                >
                  <AntDesign name="tago" size={24} color="black" />
                </View>
                <View className="flex py-2 space-y-1 items-center">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  ></Text>
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    Easy
                  </Text>
                </View>
              </View>
            </View>
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-semibold flex-1 text-neutral-700"
              >
                Ingredients
              </Text>
              <View className="space-y-2 ml-3">
                {ingredientsIndexes(meal).map((i) => {
                  return (
                    <View key={i} className="flex-row space-x-4">
                      <View
                        style={{ height: hp(1.5), width: hp(1.5) }}
                        className="bg-amber-300 rounded-full"
                      />
                      <View className="flex-row space-x-2">
                        <Text
                          style={{ fontSize: hp(1.7) }}
                          className="font-extrabold text-neutral-700"
                        >
                          {meal["strIngredient" + i]} -
                        </Text>
                        <Text
                          style={{ fontSize: hp(1.7) }}
                          className="font-medium text-neutral-600"
                        >
                          {meal["strMeasure" + i]}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            {/* Instructions */}
            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-semibold flex-1 text-neutral-700"
              >
                Instructions
              </Text>

              <Text>{meal.strInstructions}</Text>
            </Animated.View>
            {/* Recipe Video */}
            {meal.strYoutube && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4"
              >
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-semibold flex-1 text-neutral-700"
                >
                  Recipe Video
                </Text>
                <View>
                  <YoutubePlayer
                    height={hp(30)}
                    videoId={getYoutubeVideoId(meal.strYoutube)}
                  />
                </View>
              </Animated.View>
            )}
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

export default RecipeDetails;
