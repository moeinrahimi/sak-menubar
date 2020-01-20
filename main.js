const { app, Menu, Tray } = require('electron')
const notifier = require('node-notifier');
const network = require('./helpers/network')
const path = require('path')
let icon = path.resolve(__dirname, 'assets/icon.ico')
let notif = {
    title: 'swiss army knife',
    icon: icon,
    message: 'done'
}
let tray = null
app.on('ready', () => {

    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([{
            label: 'set Google',
            click: () => {
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
              let ethernet = network.getActiveEthernet()
              network.deleteDNS(ethernet, function (e, r) {
                console.log(e, r)
                    notifier.notify(notif);
                })
            }
        },
        {
            label: 'exit',
            click: () => { app.exit() }
        }
    ])
    tray.setToolTip('swiss army knife')
    tray.setContextMenu(contextMenu)
})