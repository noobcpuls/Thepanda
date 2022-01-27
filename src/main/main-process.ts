import { app, BrowserWindow, session } from "electron";
import { initialize, enable } from "@electron/remote/main";

declare const ENVIRONMENT: String;

const IS_DEV = (ENVIRONMENT == "development"); // const injected via webpack define plugin.
const DEV_SERVER_URL = "http://localhost:9000"; // must match webpack dev server port.
const HTML_FILE_PATH = "renderer/index.html";

function createWindow(): BrowserWindow | null {
    
    let win: BrowserWindow | null = new BrowserWindow({
        width: 1200,
        height: 720,
        minWidth: 500,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: IS_DEV,
        },
        center: true,
    });

    if (IS_DEV) {
        win.webContents.openDevTools();
        win.loadURL(DEV_SERVER_URL);
    }
    else {
        win.loadFile(HTML_FILE_PATH);
        win.removeMenu();
    }

    return win;
}

app.whenReady()
    .then(() => {

        let win = createWindow();
        if (!win) throw Error("BrowserWindow is null. Check main process initialization!");
        initialize();

        win.webContents.session.webRequest.onBeforeSendHeaders(
            (details, callback) => {
              callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
            },
          );
        
          win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
            callback({
              responseHeaders: {
                'Access-Control-Allow-Origin': ['*'],
                ...details.responseHeaders,
              },
            });
          });

        win.maximize();
        enable(win.webContents);

        win.on("closed", () => {
            win = null;
        });

        app.on('window-all-closed', () => {
            if (process.platform != "darwin") {
                app.quit()
            }
        })

        app.on('activate', () => {
            if (win === null) {
                createWindow()
            }
        })

    });