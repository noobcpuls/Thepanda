import { createGlobalStyle } from "styled-components";
import { pretendardFontFace } from "./fontFaces";

export const GlobalStyle = createGlobalStyle`

    ${pretendardFontFace}

    :root {
        font-size: 15px;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: Pretendard;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;
    }

    a {
        color: unset;
        text-decoration: none;
        &:visited {
            text-decoration: none;
        }
    }
`;
