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

Box 3 is the bug. Boxes 1 and 2 show that the blur and the mask work on their own, box 4 shows
that the combination works when the `BlurView` mounts after layout.

## Likely cause

`BlurEffectView` in `expo-blur` installs its blur effect in `draw(_:)`. UIKit does not call
`draw(_:)` for a view that is 0 × 0, and with the default `contentMode` it does not call it again
when the view gets a size. Children of `MaskedView` are hosted through SwiftUI and start at 0 × 0,
so a `BlurView` that mounts together with the `MaskedView` never installs its effect. One that
mounts later already has a size on its first draw.

## Local fix

`packages/expo-blur/ios/BlurEffectView.swift`: apply the effect from `layoutSubviews()` when the
bounds are not empty, instead of from `draw(_:)`, and re-apply it when `intensity` or `tint`
change. With that change box 3 renders the same as box 4 (right screenshot).
Pull request: https://github.com/expo/expo/pull/52291
