import React, { useContext } from 'react';
import { ThemeContextDark } from '../core/context';
import { HH, PP, PH } from './HomeView';
import styled from 'styled-components';


export default function Preference(): JSX.Element {
    const { isDark, changeTheme } = useContext(ThemeContextDark);

    return(
        <div>
            <HH>설정</HH>
            <PH1>테마</PH1>
            <PrefDiv>
                <PP1>모드 : </PP1>
                <ThemeButton onClick={changeTheme}>{isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}</ThemeButton>
            </PrefDiv>
        </div>
    )
}

const PrefDiv = styled.div`
    margin: 1.5rem 0;
    padding: 0 1rem;
    padding-left: 3rem;
    width: calc(100% - 2rem);
    display: flex;
    justify-content: start;
    align-items: center;
`

const PH1 = styled(PH)`
    margin: 2rem 1rem;
`

const PP1 = styled(PP)`
    margin: 0 1rem;
`

const ThemeButton = styled.button`
    margin: 0 1rem;
    border: none;
    width: 10rem;
    height: 2.2rem;
    background-color: ${props => props.theme.colors.foreground};
    color: ${props => props.theme.colors.primary.contrast};
    font-size: 0.8rem;
    font-weight: 300;
    border-radius: 8px;
    transition: all 0.3s ease-out;
    &:hover {
        background-color: ${props => props.theme.colors.brand1.main};
    }
`

const ColorInput = styled.input`
    margin: 0 0.4rem;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    border-radius: 6px;
    width: 2.5rem;
    height: 2.5rem;
    ::-webkit-color-swatch {
        border-radius: 3.5px;
        border: none;
    }
`
