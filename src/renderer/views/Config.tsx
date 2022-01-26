import React, { useContext } from 'react';
import { ThemeContextDark } from '../core/context';
export default function Config() {
    const { isDark, changeTheme } = useContext(ThemeContextDark);

    return(
        <div>
            <h1>설정</h1>
            <button onClick={changeTheme}>{isDark ? "다크 모드" : "라이트 모드"}</button>
        </div>
    )
}