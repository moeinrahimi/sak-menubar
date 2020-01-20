const path = require('path')
const  os  =require( 'os');
var sudo = require('sudo-prompt');
let icon = path.resolve(__dirname, 'assets/icon.ico')
var options = {
  name: 'sak',
  icns: icon, // (optional)
};
module.exports.setShecanDns = (ethernet) => {
  sudo.exec('netsh interface ip add dns name="'+ethernet+'" addr="178.22.122.100" index=0', options,(err, result) => {
    console.log(err, result)
  })
  sudo.exec('netsh interface ip add dns name="'+ethernet+'" addr="185.51.200.2" index=1', options,(err, result) => {
    console.log(err, result)
  })
}

module.exports.setGoogleDns = (ethernet) => {
  sudo.exec('netsh interface ip add dns name="'+ethernet+'" addr="8.8.8.8" index=0', options,(err, result) => {
    console.log(err, result)


  })
  sudo.exec('netsh interface ip add dns name="'+ethernet+'" addr="8.8.4.4" index=1', options,(err, result) => {
    console.log(err, result)


  })
}
module.exports.setCloudflareDns = (ethernet) => {
  sudo.exec('netsh interface ip add dns name="'+ethernet+'" addr="1.1.1.1" index=0', options,(err, result) => {
    console.log(err,result)
  })
}

module.exports.deleteDNS = (ethernet,done) => {
  sudo.exec(`netsh interface ip delete dnsserver "${ethernet}" all`, options,(err, result) => {
    done(err, result)


  })
}
// netsh interface ip delete dnsserver "Ethernet 7" all


module.exports.getActiveEthernet = () => {
  let active = null
  let ethernets = os.networkInterfaces()
  Object.keys(ethernets).forEach(eth => {
    if(eth.startsWith('Ethernet')) active = eth

  })


  return active
}
