import React, { Fragment, useContext } from 'react';
import { HashRouter, NavLink, Link, Route, Routes, } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme }from '@/renderer/styles/defaultTheme';
import { GlobalStyle } from "@/renderer/styles/GlobalStyle";
import { Qrcodes } from '@/renderer/views/Qrcodes';
import { ExampleView2 } from '@/renderer/views/ExampleView2';
import HomeView from '@/renderer/views/HomeView';
import pandalogo from '@/renderer/resources/images/pandalogo.png';
import { ThemeContextDark } from './core/context';
import Config from './views/Config';

export default function MainLayout() {
    const menus = [
      { name: "홈", path: "/" },
      { name: "QR 코드 생성", path: "/qrcodes" },
      { name: "Example 2", path: "/example-view-2" },
      { name: "설정", path: "/config" },
    ];
    
    const { isDark } = useContext(ThemeContextDark);

    return (
        <Fragment>
            <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>
                <GlobalStyle />
                <HashRouter>
                    <Content>
                        <SidePanel>
                            <EmptyBox/>
                            {menus.map((menu:{name:string, path:string}, index:number) => (
                                    <StyledNavLink to={menu.path} className={({isActive}) => "sidebar-item" + (isActive ?' active' : '')} key={index}>
                                        {menu.name}
                                    </StyledNavLink>
                            ))}
                        </SidePanel>
                        <Header>
                            <Link to="/">
                                <HeaderText>The Panda</HeaderText>
                            </Link>
                            <HeaderImage src={pandalogo} alt="panda edu. logo" />
                        </Header>
                        <Body>
                            <Routes>
                                <Route path="/qrcodes" element={<Qrcodes />} />
                                <Route path="/example-view-2" element={<ExampleView2 />} />
                                <Route path="/config" element={<Config />} />
                                <Route path="/" element={<HomeView />} />
                            </Routes>
                        </Body>
                        <Footer>
                            Copyrightⓒ 2021 Panda edu. All rights reserved.
                        </Footer>
                    </Content>
                </HashRouter>
            </ThemeProvider>
        </Fragment>
    );
}

const Content = styled.div`
    height: 100vh;
    display: grid;
    grid-template-areas: 
        "header  header"
        "panel   body"
        "panel footer";
    grid-template-columns: auto 1fr;
    grid-template-rows: 14% 82% 4%;
`;

const SidePanel = styled.div`
    grid-area: panel;
    background: ${props => props.theme.colors.foreground};
    width: 16rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EmptyBox = styled.div`
    height: 1.5rem;
`

const StyledNavLink = styled(NavLink)`
    margin: 0.25rem 0;
    width: 14em;
    height: 2.5rem;
    background: ${props => props.theme.colors.foreground};
    text-align: center;
    color: ${props => props.theme.colors.primary.contrast};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${props => props.theme.colors.brand2.main};
    }
    &.active {
        background: ${props => props.theme.colors.brand2.contrast};
    }
`

const Header = styled.div`
    grid-area: header;
    background: linear-gradient(20deg, ${props => props.theme.colors.brand1.main}, ${props => props.theme.colors.brand1.contrast});
    color: #f9f9f9;
    padding: 2rem;
    display: flex;
    align-items: center;
`;

const HeaderText = styled.h2`
    font-size: 2.4rem;
    font-weight: 400;
`

const HeaderImage = styled.img`
    margin-left: auto;
    height: 4rem;
`

const Body = styled.div`
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.foreground};
    grid-area: body;
    padding: 32px;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 9px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.brand2.contrast};
        border-radius: 48px;
    }
    ::-webkit-scrollbar-track {
        background: none;
    }
`;

const Footer = styled.div`
    grid-area: footer;
    padding: 2px;
    background-color: ${props => props.theme.colors.brand1.main};
    color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
`;

