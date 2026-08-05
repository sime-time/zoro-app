import { DrawerNav } from "@/components/drawer/DrawerNav";
import { ThemeProvider } from "@/ui/theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <DrawerNav />
    </ThemeProvider>
  );
}
