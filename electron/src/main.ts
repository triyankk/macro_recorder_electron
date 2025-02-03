import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow = null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Must be compiled from preload.ts
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadURL("http://localhost:5173"); // Change this if running production build

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Example: Handle an IPC message from the renderer
ipcMain.handle("ping", async () => {
  return "pong from Electron!";
});
