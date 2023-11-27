import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https:themealdb.com/api/json/v1/1/categories.php"
      );
      //console.log("Categories : ", response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Error occured while getting categories!", error);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      //console.log("Recipes : ", response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("Error occured while getting categories!", error);
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}
    >
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-4"
      >
        <View className="flex-row items-center justify-between mx-4">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ width: hp(5), height: hp(5) }}
          />
          <FontAwesome5 name="bell" size={24} color="black" />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Nazi
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-bold text-neutral-600"
            >
              Make Your Own Food
            </Text>
          </View>

          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-bold text-neutral-600"
          >
            Stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>
        <View className="bg-black/5 flex-row items-center mx-4 p-[6px] rounded-full">
          <TextInput
            placeholder="Search any recipe..."
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 tracking-wide mb-1 pl-3 text-base"
          />
          <View className="bg-white rounded-full p-3">
            <Feather name="search" size={24} color="black" />
          </View>
        </View>
        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>
        {/* Recipes */}
        <Recipes meals={meals} categories={categories} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
