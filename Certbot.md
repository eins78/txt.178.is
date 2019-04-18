# install 

## debian

```sh
apt-get remove -fy certbot python-certbot letsencrypt
rm -rf /usr/local/bin/certbot /etc/systemd/system/certbot.timer
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
mv certbot-auto /usr/local/bin/certbot-auto
ln -s /usr/local/bin/certbot-auto /usr/local/bin/certbot # alias for older scripts etc
/usr/local/bin/certbot-auto --install-only

# check/setup
/usr/local/bin/certbot-auto run
/usr/local/bin/certbot-auto renew --dry-run 
```

## ubuntu

<https://certbot.eff.org/lets-encrypt/ubuntubionic-apache>

```sh
apt-get update
apt-get install software-properties-common
add-apt-repository -y universe
add-apt-repository -y ppa:certbot/certbot
apt-get update
apt-get install -y certbot python-certbot-apache 

# check/setup
certbot run
certbot renew --dry-run 
```

# apache

```sh
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


# nginx

```sh
# automate https://wiki.archlinux.org/index.php/Certbot#Automatic_renewal
cat <<EOF > /etc/systemd/system/certbot-renew.service
[Unit]
Description=certbot renewal

[Service]
Type=oneshot
ExecStart=/usr/local/bin/certbot-auto renew --no-bootstrap --no-self-upgrade -n --nginx --post-hook 'sleep 3 && systemctl restart nginx'
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
