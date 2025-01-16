import { createContext, use} from "react";
export const ThemeContext  = createContext(({
    theme: "light",
    darkThemeMode: () => {},
    lightThemeMode: () => {},
}))

export const ThemeContextProvider = ThemeContext.Provider;

export default function useTheme(){
    return use(ThemeContext);
}