---
title: Tmux
description: a terminal multiplexer
---

[tmux](https://github.com/tmux/tmux) is a terminal multiplexer. It lets you switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal.

## My setup

You can get my `~/.tmux.conf` file from my [dotfiles repo](https://github.com/alex289/dotfiles/blob/main/mac/.tmux.conf).

### Installation

Copy my config file to `~/.tmux.conf`.

Install the tmux plugin manager:

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

And just run tmux

## Cheatsheet

New window: `Ctrl + t c`

Rename window: `Ctrl + t ,`

Close window: `Ctrl + t &`

Next window: `Ctrl + t n`

Detach from session: `Ctrl + t d`

Kill all sessions: `tmux kill-server`
