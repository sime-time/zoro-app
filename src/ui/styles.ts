import { StyleSheet } from "react-native";

export const UNIT = 4;

export function u(value: number) {
  return value * UNIT;
}

export const s = StyleSheet.create({
  // Layout
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexCol: {
    flexDirection: "column",
  },
  flexWrap: {
    flexWrap: "wrap",
  },

  // Alignment
  itemsStart: {
    alignItems: "flex-start",
  },
  itemsCenter: {
    alignItems: "center",
  },
  itemsEnd: {
    alignItems: "flex-end",
  },
  itemsStretch: {
    alignItems: "stretch",
  },

  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyAround: {
    justifyContent: "space-around",
  },

  selfStart: {
    alignSelf: "flex-start",
  },
  selfCenter: {
    alignSelf: "center",
  },
  selfEnd: {
    alignSelf: "flex-end",
  },
  selfStretch: {
    alignSelf: "stretch",
  },

  // Padding
  p0: {
    padding: 0,
  },
  p1: {
    padding: u(1),
  },
  p2: {
    padding: u(2),
  },
  p3: {
    padding: u(3),
  },
  p4: {
    padding: u(4),
  },
  p5: {
    padding: u(5),
  },
  p6: {
    padding: u(6),
  },
  p8: {
    padding: u(8),
  },

  px1: {
    paddingHorizontal: u(1),
  },
  px2: {
    paddingHorizontal: u(2),
  },
  px3: {
    paddingHorizontal: u(3),
  },
  px4: {
    paddingHorizontal: u(4),
  },
  px5: {
    paddingHorizontal: u(5),
  },
  px6: {
    paddingHorizontal: u(6),
  },

  py1: {
    paddingVertical: u(1),
  },
  py2: {
    paddingVertical: u(2),
  },
  py3: {
    paddingVertical: u(3),
  },
  py4: {
    paddingVertical: u(4),
  },
  py5: {
    paddingVertical: u(5),
  },
  py6: {
    paddingVertical: u(6),
  },

  // Margin
  m0: {
    margin: 0,
  },
  m1: {
    margin: u(1),
  },
  m2: {
    margin: u(2),
  },
  m3: {
    margin: u(3),
  },
  m4: {
    margin: u(4),
  },
  m6: {
    margin: u(6),
  },
  m8: {
    margin: u(8),
  },

  mt1: {
    marginTop: u(1),
  },
  mt2: {
    marginTop: u(2),
  },
  mt3: {
    marginTop: u(3),
  },
  mt4: {
    marginTop: u(4),
  },
  mt6: {
    marginTop: u(6),
  },
  mt8: {
    marginTop: u(8),
  },

  mb1: {
    marginBottom: u(1),
  },
  mb2: {
    marginBottom: u(2),
  },
  mb3: {
    marginBottom: u(3),
  },
  mb4: {
    marginBottom: u(4),
  },
  mb6: {
    marginBottom: u(6),
  },
  mb8: {
    marginBottom: u(8),
  },

  mxAuto: {
    marginHorizontal: "auto",
  },

  // Gap
  gap1: {
    gap: u(1),
  },
  gap2: {
    gap: u(2),
  },
  gap3: {
    gap: u(3),
  },
  gap4: {
    gap: u(4),
  },
  gap5: {
    gap: u(5),
  },
  gap6: {
    gap: u(6),
  },
  gap8: {
    gap: u(8),
  },

  // Border radius
  roundedNone: {
    borderRadius: 0,
  },
  roundedSm: {
    borderRadius: u(2),
  },
  rounded: {
    borderRadius: u(3),
  },
  roundedMd: {
    borderRadius: u(4),
  },
  roundedLg: {
    borderRadius: u(5),
  },
  roundedXl: {
    borderRadius: u(6),
  },
  roundedFull: {
    borderRadius: 999,
  },

  // Border width
  border0: {
    borderWidth: 0,
  },
  border1: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  border2: {
    borderWidth: 2,
  },

  // Typography
  textXs: {
    fontSize: 12,
    lineHeight: 16,
  },
  textSm: {
    fontSize: 14,
    lineHeight: 20,
  },
  textBase: {
    fontSize: 16,
    lineHeight: 24,
  },
  textLg: {
    fontSize: 18,
    lineHeight: 28,
  },
  textXl: {
    fontSize: 20,
    lineHeight: 28,
  },
  text2xl: {
    fontSize: 24,
    lineHeight: 32,
  },
  text3xl: {
    fontSize: 30,
    lineHeight: 36,
  },

  fontNormal: {
    fontFamily: "Onest-Regular",
  },
  fontMedium: {
    fontFamily: "Onest-Medium",
  },
  fontSemibold: {
    fontFamily: "Onest-SemiBold",
  },
  fontBold: {
    fontFamily: "Onest-Bold",
  },

  textLeft: {
    textAlign: "left",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },

  // Size
  wFull: {
    width: "100%",
  },
  hFull: {
    height: "100%",
  },

  // Position
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
  },

  // Effects
  overflowHidden: {
    overflow: "hidden",
  },
  opacity50: {
    opacity: 0.5,
  },
  opacity75: {
    opacity: 0.75,
  },

  // Shadows
  shadowNone: {
    shadowColor: "transparent",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  shadowSm: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowMd: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  shadowLg: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  shadowXl: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },

  // Common presets
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minHeight: u(12),
    paddingHorizontal: u(6),
    paddingVertical: u(3),
    borderRadius: u(4),
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    minHeight: u(12),
    paddingHorizontal: u(4),
    paddingVertical: u(3),
    borderRadius: u(4),
    borderWidth: StyleSheet.hairlineWidth,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});
