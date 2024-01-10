---
title: Git
description: A free and open source distributed version control system
---

[Git](https://git-scm.com/) is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

## Store credentials

In order to setup git to store your credentials you need to execute this:

```bash
git config --global credential.helper store
```

## Commit Signing

Signing your commits gives you the ability to prove that you were the author of a specific code change. It also gives you the ability to ensure that no one can modify your commit (or its metadata, such as the time you claimed that was made at) in the future.

### Setup GPG

Install GPG:

- Windows: Download the Gpg4win distribution from the [GPG website](https://gnupg.org/download/)
- macOS: `brew install gpg`
- Linux: Most Linux distributions come with GPG pre-installed; if not, you can always find it on their official repositories.

:::note
For macOS only:
On macOS, you might also want to install a graphical pinentry application with `brew install pinentry-mac`, then add this line to `~/.gnupg/gpg-agent.conf` (if the file doesn’t exist, create it):

```bash
pinentry-program /usr/local/bin/pinentry-mac
```

:::

Disable password request (macOS and Linux):

```bash
# ~/.gnupg/gpg.conf
# Enable gpg to use the gpg-agent
use-agent
```

Enable gpg in every terminal session:

```bash
# ~/.bashrc  ~/.bash_profile ~/.zprofile
export GPG_TTY=$(tty)
gpgconf --launch gpg-agent
```

### Generate GPG key pair

Generate a new GPG pair:

```bash
gpg --full-gen-key
```

1. Kind of key: `type 4 for (4) RSA (sign only)`
2. Keysize: `4096`
3. Expiration: choose a reasonable value, for example `2y` for 2 years (it can be renewed)
4. Enter your real name
5. Enter the email address you use in git (`git config --global user.email`). You can add more emails after the setup.

#### Adding multple emails

Edit your generated key:

```bash
# Replace 674CB45A with your key ID
gpg --edit-key 674CB45A
```

```bash
gpgp> adduid
# Use the number of the UID of the identity
gnupg> uid 2
gnupg> trust
# Type "5" (for "I trust ultimately")
gnupg> save
```

### Configure Git to sign your commits

Setup git to use GPG:

```bash
git config --global gpg.program $(which gpg)
```

Setup git to use your key:

```bash
# Replace 674CB45A with your key ID
git config --global user.signingkey 674CB45A
```

Setup git to sign all commits:

```bash
git config --global commit.gpgSign true
git config --global tag.gpgSign true
```

### Adding the GPG key to GitHub

In order for GitHub to accept your GPG key and show your commits as “verified”, you first need to ensure that the email address you use when committing a code change is both included in the GPG key and verified on GitHub.

```bash
# Replace 674CB45A with your key ID
gpg --armor --export 674CB45A
```

Copy the whole output including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----` and go to the [GitHub SSH and GPG Settings](https://github.com/settings/keys) and put it in there.
