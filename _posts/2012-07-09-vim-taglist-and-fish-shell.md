---
layout: post
title: "vim, taglist, and fish-shell"
description: ""
category: 
tags: [vim, fish-shell, ctags, taglist]
---
{% include JB/setup %}
So I finally started to dig a little bit into vim plugins. When I was setting up `taglist` plugin for vim, everything was fine until I got this error:

    Error detected while processing function <SNR>11_Tlist_Window_Toggle..<SNR>11_Tl
    ist_Window_Open..<SNR>11_Tlist_Window_Refresh..<SNR>11_Tlist_Window_Refresh_File
    ..<SNR>11_Tlist_Process_File:
    line   83:
    E484: Can't open file /var/folders/w1/nnf02nbs34753s0n4vhgrswr0000gn/T/vtuyfVj/0

    Taglist: Failed to generate tags for /private/tmp/main.cc

Most of failures to generate tags are due to improper `ctags` installations (only `exuberant-ctags` works with `taglist`). However, mine wasn't.

After spending almost 2 hours on this, I was reminded by [a stackoverflow post](http://stackoverflow.com/a/8659896) that I was actually using [fish-shell](http://ridiculousfish.com/shell/) instead of `bash`. `fish-shell` sets `$SHELL` to `/usr/local/bin/fish` which breaks `taglist`.

Workaround is simple. Either one of the following should work:

*   running `vim` with `SHELL` environmental variable set to `/bin/bash`

        set SHELL /bin/bash; and vim /tmp/main.cc

*   or configuring `shell` variable in `.vimrc`:

        set shell=/bin/bash
