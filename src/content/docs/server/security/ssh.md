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
