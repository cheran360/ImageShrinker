const { app, BrowserWindow } = require("electron");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "ImageShinker",
    width: 500,
    height: 600,
    icon: "./assets/icons/Icon_256x256.png",
  });

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // or
  // mainWindow.loadFile('./app/index.html');

  // using 2nd method
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", createMainWindow);
