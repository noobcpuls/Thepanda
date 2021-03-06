import { css } from "styled-components"
import PretendardBold from '../resources/fonts/Pretendard-Bold.woff2'
import PretendardExtraBold from '../resources/fonts/Pretendard-ExtraBold.woff2'
import PretendardExtraLight from '../resources/fonts/Pretendard-ExtraLight.woff2'
import PretendardLight from '../resources/fonts/Pretendard-Light.woff2'
import PretendardMedium from '../resources/fonts/Pretendard-Medium.woff2'
import PretendardSemiBold from '../resources/fonts/Pretendard-SemiBold.woff2'
import PretendardThin from '../resources/fonts/Pretendard-Thin.woff2'
import PretendardRegular from '../resources/fonts/Pretendard-Regular.woff2'

export const pretendardFontFace = css`
    @font-face {
        font-family: 'Pretendard';
        font-weight: normal;
        font-style: normal;
        src: url(${PretendardRegular}) format('woff2');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 1000;
        font-style: normal;
        src: url(${PretendardExtraBold}) format('woff2');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 200;
        font-style: normal;
        src: url(${PretendardExtraLight}) format('woff2');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 800;
        font-style: normal;
        src: url(${PretendardBold}) format('woff2');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 400;
        font-style: normal;
        src: url(${PretendardLight}) format('woff2');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 500;
        font-style: normal;
        src: url(${PretendardMedium}) format('woff2');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 700;
        font-style: normal;
        src: url(${PretendardSemiBold}) format('woff2');
    }
    @font-face {
        font-family: 'Pretendard';
        font-weight: 300;
        font-style: normal;
        src: url(${PretendardThin}) format('woff2');
    }
`;