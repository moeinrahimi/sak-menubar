task=$1

if [  $task = 'setDNS'  ]
then
  echo 'setDNS'
  printf "nameserver $2\n nameserver $3\n" > /etc/resolv.conf
  cat /etc/resolv.conf
elif  [ $task = 'clearDNS' ]
then
  echo 'clear setDNS'
  echo "" > /etc/resolv.conf
fi
