import { CustomAppBar } from "../../components/CustomAppBar";
import { CustomContainer } from "../../components/CustomContainer";
import { useColorSchemeContext } from "../../hooks/ColorSchemeContext";

export function Layout({ children }: any) {
  const { customClasses } = useColorSchemeContext();
  return (
    <div className={customClasses.root}>
      <CustomAppBar />
      <CustomContainer>{children}</CustomContainer>
    </div>
  );
}
