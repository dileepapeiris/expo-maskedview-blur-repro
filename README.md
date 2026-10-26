# BlurView inside @expo/ui MaskedView shows nothing when both mount together

Reproduction for https://github.com/expo/expo/issues/52282 on iOS.

Versions: Expo SDK 58, `@expo/ui` 58.0.23, `expo-blur` 58.0.5, `expo-linear-gradient` 58.0.3.

## Run

```sh
npm install
npx expo run:ios      # development build, iOS simulator
```

