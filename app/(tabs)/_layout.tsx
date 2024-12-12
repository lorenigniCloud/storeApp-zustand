import { Link, Tabs } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import useCartStore from "@/store/cartStore";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const CartButton = () => {
  const { items } = useCartStore();
  return (
    <Link href="/modal" asChild>
      <Pressable style={{ marginRight: 15 }}>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{items()}</Text>
        </View>
        <Ionicons name="cart" size={28} />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: -5,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff007b",
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} />
          ),
          headerRight: () => <CartButton />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
