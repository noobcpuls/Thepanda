import { render } from "react-dom";
import React from "react";
import MainLayout from "./MainLayout";
import { ThemeProviderDark } from "./core/context";

function App() {
    return(
        <ThemeProviderDark>
            <MainLayout/>
        </ThemeProviderDark>
    )
}

render(<App />, document.getElementById("root"));
