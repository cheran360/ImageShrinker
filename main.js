const { app, BrowserWindow } = require("electron");

process.env.NODE_ENV = "development";

// isDev is true if we are in development false if production.
const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

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
    resizable: isDev,
  });

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // or
  // mainWindow.loadFile('./app/index.html');
  // using 2nd method
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", createMainWindow);

// on macOs stuff
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
