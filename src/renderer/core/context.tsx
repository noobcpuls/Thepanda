import React, { createContext, useState } from 'react';

const ThemeContextDark = createContext({
    isDark: false,
    changeTheme: () => {},
})

interface Props {
    children: JSX.Element | JSX.Element[];
}

const ThemeProviderDark = ({children}:Props):JSX.Element => {
    const [isDark, setIsDark] = useState(false);

    const changeTheme = ():void => {
        setIsDark(!isDark);
    };

    return(
        <ThemeContextDark.Provider value={{isDark, changeTheme,}}>
            {children}
        </ThemeContextDark.Provider>
    );
}

export { ThemeContextDark, ThemeProviderDark };