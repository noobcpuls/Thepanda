import {DefaultTheme} from "styled-components";

// The .tsx extension in this file is to allow color picker extension in visual code. Change to .ts if you want.

export const defaultTheme: DefaultTheme = {
    colors: {
        background:   "#ffffff",
        foreground:   "#edf2f4",
        brand1: {
            main:     "#98f5e1",
            contrast: "#b9fbc0"
        },
        brand2: {
            main:     "#dee2e6",
            contrast: "#ced4da"
        },
        primary: {
            main:     "#52b788",
            contrast: "#161a1d"
        },
        danger: {
            main:     "#ff595e",
            contrast: ""
        },
        warning: {
            main:     "#ffca3a",
            contrast: ""
        },
        
    }
    
};
export const darkTheme: DefaultTheme = {
    colors: {
        background:   "#343a40",
        foreground:   "#212529",
        brand1: {
            main:     "#43aa8b",
            contrast: "#90be6d"
        },
        brand2: {
            main:     "#495057",
            contrast: "#6c757d"
        },
        primary: {
            main:     "#52b788",
            contrast: "#faf9f9"
        },
        danger: {
            main:     "#ff006e",
            contrast: ""
        },
        warning: {
            main:     "#ffbe0b",
            contrast: ""
        },
        
    }
    
};
