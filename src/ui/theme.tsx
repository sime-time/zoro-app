import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

export type ThemeColors = {
  background: string;
  foreground: string;

  surface: string;
  surfaceSecondary: string;
  surfaceTertiary: string;

  border: string;

  primary: string;
  primaryForeground: string;
  primarySoft: string;

  muted: string;
  mutedForeground: string;
  mutedBackground: string;

  success: string;
  successForeground: string;
  info: string;
  infoForeground: string;
  warning: string;
  warningForeground: string;
  destructive: string;
  destructiveForeground: string;
};

export const lightColors: ThemeColors = {
  background: "#F7F7F7",
  foreground: "#030303",

  surface: "#FFFFFF",
  surfaceSecondary: "#F2F2F2",
  surfaceTertiary: "#E7E7E7",

  border: "#E8E8E8",

  primary: "#00A86B",
  primaryForeground: "#FFFFFF",
  primarySoft: "#DDF8EC",

  muted: "#8E8E93",
  mutedForeground: "#5A5A5F",
  mutedBackground: "#F2F2F2",

  success: "#34C759",
  successForeground: "#071C10",

  info: "#4A90E2",
  infoForeground: "#FFFFFF",

  warning: "#F5B544",
  warningForeground: "#211400",

  destructive: "#F06A6A",
  destructiveForeground: "#FFFFFF",
};

export const darkColors: ThemeColors = {
  background: "#131313",
  foreground: "#FFFFFF",

  surface: "#242424",
  surfaceSecondary: "#303030",
  surfaceTertiary: "#3A3A3A",

  border: "#363636",

  primary: "#00A86B",
  primaryForeground: "#FFFFFF",
  primarySoft: "#0D3325",

  muted: "#7A7A7A",
  mutedForeground: "#C7C7C7",
  mutedBackground: "#242424",

  success: "#388A3E",
  successForeground: "#052E16",

  info: "#5AA9FF",
  infoForeground: "#001A33",

  warning: "#F5B544",
  warningForeground: "#211400",

  destructive: "#FF6B6B",
  destructiveForeground: "#FFFFFF",
};

export const themes = {
  light: lightColors,
  dark: darkColors,
} as const;

export type ThemeName = keyof typeof themes;

type ThemeContextValue = {
  c: ThemeColors;
  mode: ThemeMode;
  resolvedTheme: ThemeName;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("system");

  const resolvedTheme: ThemeName =
    mode === "system" ? (systemTheme === "dark" ? "dark" : "light") : mode;

  const c: ThemeColors = themes[resolvedTheme];

  function toggleTheme() {
    setMode((currentMode) => {
      const currentResolvedTheme =
        currentMode === "system"
          ? systemTheme === "dark"
            ? "dark"
            : "light"
          : currentMode;

      return currentResolvedTheme === "dark" ? "light" : "dark";
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        c,
        mode,
        resolvedTheme,
        setMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return theme;
}
