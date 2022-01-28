import React, { useRef, useState } from 'react';
import { HH, PP, Md } from './HomeView';
import { YouTube } from 'youtube-sr';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
const JSZipUtils = require('../core/jszip-utils.js');

export function Qrcodes() {
    interface playlist {
        id: number;
        url: string | any;
        title: string | any;
    }

    const [text, setText] = useState('');
    const [isErase, setIsErase] = useState(false);
    const [urlist, setUrlist] = useState<playlist[]>([]);
    const nextId = useRef(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setText(e.target.value);
    }

    const youtubePl =(url:string):void => {
        if (text === '') {
            return;
        }
        const newUrl = "https://www.youtube.com/watch?v=";
        const isYT = url.startsWith('https://www.youtube.com');
        const isPl = url.indexOf('&list=') !== -1 || url.indexOf('?list=') !== -1;

        if (isYT === true && isPl === true) {
            YouTube.getPlaylist(url)
                .then(playlist => playlist.fetch()) // if your playlist has 500 videos, this makes additional 4 requests to get rest of the 400 videos. (100 videos = 1 request)
                .then(res => {
                    let plusId = nextId.current;
                    const Plist:playlist[] = [];
                    for (let i of res.videos) {
                        const Pl:playlist = {
                            id: 0,
                            url: '',
                            title: '',
                        }
                        Pl.id = plusId;
                        plusId++;
                        Pl.url = newUrl + i.id;
                        Pl.title = i.title;
                        if (Pl.title.length > 40) {
                            const sliceTitle = Pl.title.slice(0, 40) + "...";
                            Pl.title = sliceTitle;
                        }
                        Plist.push(Pl);
                    }
                    nextId.current += res.videos.length;
                    setUrlist([...urlist, ...Plist]);                    
                }) // all parsable videos
                .catch(console.error);
        }
        else if (isYT === true && isPl === false) {
            YouTube.search(url)
                .then(res => {
                    const Pl:playlist = {
                        id: 0,
                        url: '',
                        title: '',
                    }
                    Pl.id = nextId.current;
                    nextId.current++;
                    Pl.url = url;
                    Pl.title = res[0].title;
                    if (Pl.title.length > 40) {
                        const sliceTitle = Pl.title.slice(0, 40) + "...";
                        Pl.title = sliceTitle;
                    }
                    setUrlist([...urlist, Pl]);
                }) // Response
                .catch(console.error);
        }
        else {
            const Pl:playlist = {
                id:0,
                url: '',
                title: '',
            }
            Pl.id = nextId.current;
            nextId.current++;
            Pl.url = url;
            Pl.title = url;
            if (Pl.title.length > 40) {
                const sliceTitle = Pl.title.slice(0, 40) + "...";
                Pl.title = sliceTitle;
            }
            setUrlist([...urlist, Pl]);
        }
    }

    const onKeyEnter = (e:React.KeyboardEvent<HTMLInputElement>):void => {
        if (e.key == "Enter") {
            youtubePl(text);
        }
    }

    const clearArray = ():void => {
        setUrlist([]);
    }

    const setErase = ():void => {
        setIsErase(true);
    }

    const setErase2 = ():void => {
        setIsErase(false);
    }

    const delItem = (id:number):void => {
        setUrlist(urlist.filter(
            item => item.id !== id
        ));
        setIsErase(false);
    }

    const downItem = (id:number, title:string):void => {
        const qr = document.getElementById("qr" + id) as HTMLCanvasElement;
        const data = qr.toDataURL();

        const qrdiv = document.createElement("a") as HTMLAnchorElement;
        qrdiv.download = title + ".png";
        qrdiv.href = data;
        qrdiv.click();
        
        qrdiv.remove();
    }

    const downAll = ():void => {
        const zip = new JSZip();
        let count:number = 0;
        const zipfilename:string = "QR 코드 모음";
        const urls:string[] = [];
        const filenames:string[] = [];

        urlist.map(val => {
            const qr = document.getElementById("qr" + val.id) as HTMLCanvasElement;
            const data = qr.toDataURL();
            urls.push(data);
            filenames.push(val.title);
        })

        urls.forEach(async (url:string, index:number) => {
            const fileName = filenames[index];
            try {
                const file = await JSZipUtils.getBinaryContent(url);
                zip.file(fileName + ".png", file, {binary:true});
                count++;
                if (count === urls.length) {
                    zip.generateAsync({type:'blob'}).then(function(content) {
                        saveAs(content, zipfilename);
                      });
                }
            }
            catch (err) {
                console.log(err);
            }
        })
    }

    return (
        <Md>
            <HH>QR 코드 생성기</HH>
            <PP1>링크를 입력하여 QR 코드를 얻으세요.</PP1>
            <InputDiv>
                <InputVal type="text" onChange={handleChange} onKeyPress={onKeyEnter} value={text} placeholder="링크를 입력해주세요."/>
                <PButton onClick={()=>youtubePl(text)}>Convert</PButton>
            </InputDiv>
            <ButtonDiv className={urlist.length > 0 ? "active" : "none"}>
                <Button onClick={downAll}>모두 다운로드</Button>
                <Button onClick={clearArray}>모두 삭제하기</Button>
            </ButtonDiv>
            <QRdiv>
                {urlist.map(val => (
                    <QRcodeDiv key={val.id} onMouseOver={setErase} onMouseOut={setErase2} >
                        <DButton className={isErase ? "active" : "none"} onClick={()=>delItem(val.id)}>X</DButton>
                        <QRCode id={"qr" + val.id} className="qrcodes" value={val.url} size={256} onClick={() => downItem(val.id, val.title)} style={{height: "5.3rem", width: "5.3rem"}}/>
                        <QRtext>{val.title}</QRtext>
                    </QRcodeDiv>
                ))}
            </QRdiv>
        </Md>
    );

}

const PP1 = styled(PP)`
    margin-top: 1.2rem;
`

const InputDiv = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 650px) {
        height: 10rem;
        flex-direction: column;
        justify-content: space-evenly;
    }
`

const InputVal = styled.input`
    width: 85%;
    height: 1.6rem;
    font-size: 1rem;
    border: none;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary.contrast};
    border-bottom: 1px solid ${props => props.theme.colors.primary.contrast};
    transition: all 0.4s ease;
    &:focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.colors.primary.main};
    }
    ::placeholder {
        padding: 0.3rem;
        color: ${props => props.theme.colors.brand2.contrast};
        font-weight: 200;
    }
`

const PButton = styled.button`
    width: 10rem;
    height: 2.2rem;
    font-size: 1.1rem;
    font-weight: 200;
    color: #f9f9f9;
    margin-left: 3rem;
    background: ${props => props.theme.colors.brand1.main};
    border: none;
    border-radius: 6px;
    transition: all 0.3s ease-out;
    @media only screen and (max-width: 650px) {
        margin: 0;
    }
    &:hover {
        background-color: ${props => props.theme.colors.brand1.contrast};
    }
    &:active {
        background-color: ${props => props.theme.colors.primary.main};
    }
`

const QRdiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const QRcodeDiv = styled.div`
    position: relative;
    width: 7.5rem;
    min-height: 10rem;
    margin: 0.7rem;
    padding: 0.4rem;
    border-radius: 9px;
    background-color: ${props => props.theme.colors.foreground};
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    align-items: center;
    transition: all 0.2s ease-out;
    &:hover {
        background-color: ${props => props.theme.colors.brand2.main};
    }
`

const QRtext = styled(PP)`
    width: 7rem;
    text-align: center;
    word-wrap: break-word;
    font-size: 0.7rem;
    font-weight: 200;
    color: ${props => props.theme.colors.primary.contrast};
    margin: 0;
    padding: 0;
`

const ButtonDiv = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &.none{
      display: none;
    }
`

const Button = styled.button`
    margin: 0 1rem;
    height: 2.5rem;
    width: 14rem;
    font-size: 1.1rem;
    font-weight: 200;
    color: #f9f9f9;
    border: none;
    border-radius: 6px;
    background: ${props => props.theme.colors.brand1.main};
    transition: all 0.3s ease-out;
    &:hover {
        background-color: ${props => props.theme.colors.brand1.contrast};
    }
    &:active {
        background-color: ${props => props.theme.colors.primary.main};
    }
`

const DButton = styled.button`
    width: 20px;
    height: 20px;
    position: absolute;
    margin-right: 8.25rem;
    margin-bottom: 10.25rem;
    border: none;
    border-radius: 9px;
    background-color: ${props => props.theme.colors.warning.main};
    transition: all 0.2s ease-out;
    &.active {
        visibility: visible;
        opacity: 1;
    }
    &.none {
        visibility: hidden;
        opacity: 0;
    }
`