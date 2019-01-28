```sh
# install 
apt-get remove -fy certbot
rm /etc/systemd/system/certbot.timer
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
mv certbot-auto /usr/local/bin/certbot-auto
/usr/local/bin/certbot-auto --install-only

# check/setup
/usr/local/bin/certbot-auto run
/usr/local/bin/certbot-auto renew --dry-run # if already has certs installed

# automate https://wiki.archlinux.org/index.php/Certbot#Automatic_renewal
cat <<EOF > /etc/systemd/system/certbot-renew.service
[Unit]
Description=certbot renewal

[Service]
Type=oneshot
ExecStart=/usr/local/bin/certbot-auto --no-bootstrap --no-self-upgrade -n renew
EOF

cat <<EOF > /etc/systemd/system/certbot-renew.timer
[Unit]
Description=Twice daily renewal of certbot's certificates

[Timer]
OnCalendar=0/12:00:00
RandomizedDelaySec=1h
Persistent=true

[Install]
WantedBy=timers.target
EOF

systemctl daemon-reload && systemctl enable certbot-renew.timer && systemctl restart certbot-renew.timer
```
