const { app, Menu, Tray, nativeImage } = require('electron')
const notifier = require('node-notifier');
const network = require('./helpers/network')
const currency = require('./helpers/currency')
const path = require('path')
const {autoUpdater} = require("electron-updater");
let icon = path.join(__dirname, '/assets/icons/icon.png')
const os = require('os')
let notif = {
    title: 'swiss army knife',
    icon: icon,
    message: 'done'
}

let tray = null
autoUpdater.on('checking-for-update', () => {
  notifier.notify({...notif,message:'Checking for update...'});
})
autoUpdater.on('update-available', (info) => {
  notifier.notify({...notif,message:'Update available.'});
})
autoUpdater.on('update-not-available', (info) => {
  notifier.notify({...notif,message:'Update not available.'});
})
autoUpdater.on('error', (err) => {
  notifier.notify({...notif,message:'Error in auto-updater. ' + err});
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  notifier.notify({...notif,message:log_message});
})
autoUpdater.on('update-downloaded', (info) => {
  notifier.notify({...notif,message:'Update downloaded'});
});
app.on('ready', async () => {
    let osName = os.platform() == 'win32' ? 'windows' : os.platform()
    const nimage = nativeImage.createFromPath(icon);
    tray = new Tray(nimage)
    let {currencyMenu,date} = await currency.getCurrencyMenuItems()
    let currencyRefreshItem = {
        label: 'refresh',
        click: async() => {
          let {currencyMenu,date} = await currency.getCurrencyMenuItems()
          let refItem = menuItems[menuItems.length - 1].submenu.filter(item => item.label == 'refresh')
          console.log(refItem)
          menuItems[menuItems.length - 1].submenu = [...currencyMenu, ...refItem]
          menuItems[menuItems.length - 1].label == 'currencies - ' + date
          tray.setContextMenu(Menu.buildFromTemplate(menuItems))
        }
    }
  currencyMenu.push(currencyRefreshItem)
  let menuItems = [{
    label: 'set Google',
    click: () => {
        if (osName != 'windows') {
            network.setResolveFile('google')
            return notifier.notify(notif);
        }
        let a = network.getActiveEthernet()
        network.deleteDNS(a, function(e, r) {
            console.log(e, r)
            network.setGoogleDns(a)
            notifier.notify(notif);

        })
    },
},
{
    label: 'set Shecan',
    click: () => {
        if (osName != 'windows') {
            network.setResolveFile('shecan')
            return notifier.notify(notif);
        }
        let a = network.getActiveEthernet()
        network.deleteDNS(a, function(e, r) {
            console.log(e, r)
            network.setShecanDns(a)
            notifier.notify(notif);
        })

    }
},
{
    label: 'set Cloudflare',
    click: () => {
        if (osName != 'windows') {
            network.setResolveFile('cloudflare')
            return notifier.notify(notif);
        }
        let a = network.getActiveEthernet()
        network.deleteDNS(a, function(e, r) {
            console.log(e, r)
            network.setCloudflareDns(a)
            notifier.notify(notif);
        })

    }
},
{
    label: 'clear DNS',
    click: () => {
        if (osName != 'windows') {
            network.clearResolveFile()
            return notifier.notify(notif);
        }
        let ethernet = network.getActiveEthernet()
        network.deleteDNS(ethernet, function(e, r) {
            console.log(e, r)
            notifier.notify(notif);
        })
    }
},
{
    label: 'exit',
    click: () => { app.exit() }
},
{
    label: 'currencies - updatedAt  ' + date,
    submenu: currencyMenu,

},
]
    const contextMenu = Menu.buildFromTemplate(menuItems)
    tray.setToolTip('swiss army knife')
  tray.setContextMenu(contextMenu)
  autoUpdater.checkForUpdatesAndNotify();

})