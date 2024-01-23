---
title: SSH
description: The SSH is a cryptographic network protocol for operating network services.
---

The Secure Shell Protocol (SSH) is a cryptographic network protocol for operating network services securely over an unsecured network. Its most notable applications are remote login and command-line execution.

## Setup an SSH Key

Generate a key pair:

```bash
ssh-keygen -b 4096
```

Save the key in `~/.ssh/id_rsa`

## Copy the Key to the Server

```bash
ssh-copy-id username@remote_host
```

If you dont have `ssh-copy-id`:

```bash
cat ~/.ssh/id_rsa.pub | ssh username@remote_host "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

## Deactivate Password Authentication

Open the file `/etc/ssh/sshd_config` with an editor like neovim or nano and uncomment the line PasswordAuthentication no.

```bash
# /etc/ssh/sshd_config
...
PasswordAuthentication no
...
```

:::note
For extra security you can also change the port of ssh and enable strict mode:

```bash
...
Port 14832
...
StrictModes yes
MaxAuthTries 5
MaxSessions 3
...
```

:::

Restart the ssh service afterwards:

```bash
sudo systemctl restart ssh
```

:::danger
Before closing your current terminal test your configuration in a new terminal to avoid getting locked out of your server!
:::

## SSH Login Notifications

In this example a discord webhook with [discord.sh](https://github.com/fieu/discord.sh) is used but anything is possible.

Add a script which contains the following:

```bash
# ssh_discord_notifications.sh
#!/bin/bash
if [ "${PAM_TYPE}" = "open_session" ]; then

   /root/discord.sh --text "New SSH Login as *$PAM_USER* from **[$PAM_RHOST](https://ipinfo.io/$PAM_RHOST)**"

fi
```

Dont forget to make it executable: `chmod +x ssh_discord_notifications.sh`

Now add the following to the `/etc/pam.d/sshd` file:

```bash
# /etc/pam.d/sshd
session optional pam_exec.so /root/script-location/ssh_discord_notifications.sh
```

Restart your ssh server and then this will now log the ip of a user when logging in with ssh.
