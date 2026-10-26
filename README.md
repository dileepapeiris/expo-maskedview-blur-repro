# BlurView inside @expo/ui MaskedView shows nothing when both mount together

Reproduction for https://github.com/expo/expo/issues/52282 on iOS.

Versions: Expo SDK 58, `@expo/ui` 58.0.23, `expo-blur` 58.0.5, `expo-linear-gradient` 58.0.3.

## Run

```sh
npm install
npx expo run:ios      # development build, iOS simulator
```

## What the screen shows

Four 300 × 100 boxes in front of colored stripes. The mask is a `LinearGradient` from `black` at
the top to `transparent` at the bottom, the "Alpha-fade mask" from the MaskedView docs turned
top to bottom.

| Box | Content | Expected | Result on the iPhone 17 simulator, iOS 26.5 |
| --- | --- | --- | --- |
| 1 | `BlurView` alone | blur | blur |
| 2 | `MaskedView` with a plain dark `View` | fade | fade |
| 3 | `MaskedView` with a `BlurView`, mounted together | blurred fade | **nothing, the stripes stay sharp** |
| 4 | Same, `BlurView` mounted 1 s later | blurred fade | blurred fade |

