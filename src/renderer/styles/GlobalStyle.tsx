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
    }

    a {
        color: unset;
        text-decoration: none;
        &:visited {
            text-decoration: none;
        }
    }
`;

