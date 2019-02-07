```sh
# install 
apt-get remove -fy certbot
rm -rf /usr/local/bin/certbot /etc/systemd/system/certbot.timer
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
mv certbot-auto /usr/local/bin/certbot-auto
/usr/local/bin/certbot-auto --install-only
ln -s /usr/local/bin/certbot-auto /usr/local/bin/certbot # alias for older scripts etc

# check/setup
/usr/local/bin/certbot-auto run
/usr/local/bin/certbot-auto renew --dry-run 

# automate https://wiki.archlinux.org/index.php/Certbot#Automatic_renewal
cat <<EOF > /etc/systemd/system/certbot-renew.service
[Unit]
Description=certbot renewal

[Service]
Type=oneshot
ExecStart=/usr/local/bin/certbot-auto renew --no-bootstrap --no-self-upgrade -n --apache --post-hook 'sleep 3 && systemctl restart apache2'
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
