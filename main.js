const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, dialog} = electron;

const isMac = process.platform === 'darwin';

let mainWindow;

// Listen for the app to be ready
app.on('ready', function() {
    // Create a new window
    mainWindow = new BrowserWindow({
        title: 'RRaP Data Visualizer'
    });

    //Load the HTML file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert the menu
    Menu.setApplicationMenu(mainMenu);   
});

// Handle menu items
function openLog() {
    const files = dialog.showOpenDialog({
        defaultPath: __dirname,
        buttonLabel: 'Load Log File',
        filters: [
            { name: 'All Files', extensions: ['*']},
            { name: 'Log Files', extensions: ['log']}
        ],
        properties: ['openFile', 'multiSelections'],
        message: 'Select Log File'
    },
    (filePaths) => {
        loadLogs(filePaths)
    });
}

function repairLog() {

}

function establishLive() {

}

// Create menu template
const mainMenuTemplate = [
    ...(isMac ? [{
        label: app.displayName,
        submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            {
                label: 'Open Data Log',
                accelerator: 'CmdOrCtrl+O',
                click() {
                    openLog();
                }
            },
            {
                label: 'Repair Data Log',
                accelerator:'CmdOrCtrl+R',
                click() {
                    repairLog();
                }
            },
            { type: 'separator' },
            {
                label: 'Connect Live',
                accelerator:'CmdOrCtrl+L',
                click() {
                    establishLive();
                }
            }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
        ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
        ])
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
            { type: 'separator' },
            { role: 'front' },
        ] : [
            { role: 'close' }
        ])
        ]
    },
    {
        role: 'help',
        submenu: [
        {
            label: 'Learn More',
            click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://github.com/reusable-rocketry-at-purdue/DataVis')
            }
        }
        ]
    }
    ]

function loadLogs(filePaths){
    let i;
    for (i = 0; i < filePaths.length; ++i)
    {
        console.log(filePaths[i]);
    }
}