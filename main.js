const { app, BrowserWindow, Menu } = require("electron");

process.env.NODE_ENV = "development";

// isDev is true if we are in development false if production.
const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;
let aboutWindow;

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
    backgroundColor: "white",
  });

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // or
  // mainWindow.loadFile('./app/index.html');
  // using 2nd method
  mainWindow.loadFile("./app/index.html");
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "About ImageShrink",
    width: 300,
    height: 300,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: false,
    backgroundColor: "white",
  });

  aboutWindow.loadFile("./app/about.html");
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // global shortcuts removed

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// Spread operator to setApplicationMenu in mac as -
// - menu is slightly different from windows to macOs
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
];

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
