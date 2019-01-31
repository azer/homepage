---
title: "Low Battery Monitor for Linux (i3)"
desc: "Creating a simple low battery notification service for i3 window manager"
image: https://cldup.com/xL38vNebBq.jpg
imageSize: contain
imageHeight: 400px
date: "2018-12-01T23:00:00.000Z"
path: "/journal/low-battery-monitor-for-linux-i3"
---

Every desktop system is incomplete. Some lack a good tiling window manager, some lack simple stuff like low battery notifications. I'm on the tiling window manager boat, so, here is me writing a blog post about how to get a notification when the battery is low.

As this is something really simple, I guess we all expect somewhat samething from our desktop system:

* Show a notification when power is unplugged
* Show a notification when power is below threshold (10%)
* Show a critical notification when power is below critical threshold (5%)
* Suspend the computer when power is below or equal %3.

In Linux, `/proc` folder contains the information we need, but I prefer using a simple CLI command called `acpi`. It basically translates the information in proc into human language:

```bash
$ acpi -a
Battery 0: Charging, 10%, 05:57:25 until charged
```

So, we can simply write a script that checks the battery state via `acpi`, and shows notification. Here is the shell script that I ended up writing:


```shell
battery_level=`acpi -b | cut -d ' ' -f 4 | grep -o '[0-9]*'`
battery_state=$(acpi | grep 'Battery' | sed 's/Battery\s[0-9]*: //' | sed 's/, [0-9][0-9]*\%.*//')
battery_remaining=$(acpi | grep -oh '[0-9:]* remaining' | sed 's/:\w\w remaining$/ Minutes/'  | sed 's/00://' | sed 's/:/h /')

if [ ! -f "/tmp/.battery" ]; then
    echo "$battery_level" > /tmp/.battery
    echo "$battery_state" >> /tmp/.battery
    exit
fi

previous_battery_level=$(cat /tmp/.battery | head -n 1)
previous_battery_state=$(cat /tmp/.battery | tail -n 1)
echo "$battery_level" > /tmp/.battery
echo "$battery_state" >> /tmp/.battery

checkBatteryLevel() {
    if [ $battery_state != "Discharging" ] || [ "${battery_level}" == "${previous_battery_level}" ]; then
        exit
    fi

    if [ $battery_level -le 3 ]; then
        sudo systemctl suspend
    elif [ $battery_level -le 5 ]; then
        notify-send "Low Battery" "Your computer will suspend soon unless plugged into a power outlet." -u critical
    elif [ $battery_level -le 10 ]; then
        notify-send "Low Battery" "${battery_level}% (${battery_remaining}) of battery remaining." -u normal
    fi
}

checkBatteryStateChange() {
    if [ "$battery_state" != "Discharging" ] && [ "$previous_battery_state" == "Discharging" ]; then
        notify-send "Charging" "Battery is now plugged in." -u low
    fi

    if [ "$battery_state" == "Discharging" ] && [ "$previous_battery_state" != "Discharging" ]; then
        notify-send "Power Unplugged" "Your computer has been disconnected from power." -u low
    fi
}

checkBatteryStateChange
checkBatteryLevel
```

Once we got our battery check script with proper permissions (`chmod +x` if needed), now it's time to setup a systemd service. We want our script to be called every 10 seconds, so here is the systemd config:

```
[Unit]
Description=Battery Monitor

[Service]
Type=simple
ExecStart=/bin/bash /home/azer/localbin/battery-monitor.sh
Environment=DISPLAY=:0
Environment=XAUTHORITY=%h/.Xauthority
Environment=DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
User=azer

[Install]
WantedBy=multi-user.target
```

Simply save this config into `/etc/systemd/system/battery-monitor.service`, then enable & start the new service you've just created;

```bash
$ sudo systemctl enable battery-monitor
$ sudo systemctl start battery-monitor
```

Now, we need to get this service scheduled every 10 seconds. Create a timer file with the following contents, and save it into `etc/systemd/system/battery-monitor.timer`;

```bash
[Timer]
OnUnitInactiveSec=10

[Install]
WantedBy=timers.target
```

Just like the service itself, timer needs to be enabled & started, too:

```bash
$ sudo systemctl enable battery-monitor.timer
$ sudo systemctl start battery-monitor.timer
```

That's it. You should now be getting low battery notifications. In case you don't get any notifications, check if `notify-send "hello world"` command works in your system. If you don't have a notification daemon in your system, then you might need to install one. I personally use [dunst](https://wiki.archlinux.org/index.php/Dunst).
