import { Stack } from "expo-router";
import React from "react";

export default function ManuStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
