import { Text, View, Image, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View className="items-center justify-center flex-1 space-y-10 bg-amber-500">
      <StatusBar style="light" />
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring1padding }}
        >
          <Image
            style={{ width: hp(20), height: hp(20) }}
            source={require("../assets/images/welcome.png")}
          />
        </Animated.View>
      </Animated.View>
      <View className="items-center justify-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="text-white font-bold tracking-widest"
        >
          Recepedia
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="text-white font-medium tracking-widest"
        >
          All Recipes You Should Try!
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
