echo $1
echo $2
printf "nameserver $1\n nameserver $2\n" > /etc/resolv.conf
cat /etc/resolv.conf

