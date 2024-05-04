---
title: Neovim
description: hyperextensible Vim-based text editor
---

[Neovim](https://neovim.io/) is a refactor, and sometimes redactor, in the tradition of Vim (which itself derives from Stevie). It is not a rewrite but a continuation and extension of Vim. Many clones and derivatives exist, some very clever—but none are Vim. Neovim is built for users who want the good parts of Vim, and more.

## My setup

I use [AstroNvim](https://astronvim.com/) with some modifications which you can find [here](https://github.com/alex289/astronvim_config)

### Installation

#### Make a backup of your current nvim and shared folder

```shell
mv ~/.config/nvim ~/.config/nvim.bak
mv ~/.local/share/nvim ~/.local/share/nvim.bak
mv ~/.local/state/nvim ~/.local/state/nvim.bak
mv ~/.cache/nvim ~/.cache/nvim.bak
```

#### Clone AstroNvim with my custom configuration

```shell
git clone https://github.com/alex289/astronvim_config ~/.config/nvim
```

#### Start Neovim

```shell
nvim
```

## Cheatsheet

Leader: `Space`

New file: `Leader + n`

Next buffer: `]b`

Previous buffer: `[b`

Close buffer: `Leader + bc`

Escape key: `jj, jk`

Neotree toggle: `Space + e`

Neotree focus: `Space + o`
