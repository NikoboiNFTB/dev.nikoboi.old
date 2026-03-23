#!/usr/bin/env bash

set -e

# Remove maximization
for id in 0x02a02f32 0x02a02feb 0x02a0300b 0x02a0302b 0x02a0304b 0x02a0306b 0x02a0308b 0x02a030ab; do
    wmctrl -i -r $id -b remove,maximized_vert,maximized_horz
done

# Resize and move. Replace values with values from "wmctrl -l"
wmctrl -i -r 0x02a02f32 -e 0,0,0,480,540
wmctrl -i -r 0x02a02feb -e 0,480,0,480,540
wmctrl -i -r 0x02a0300b -e 0,960,0,480,540
wmctrl -i -r 0x02a0302b -e 0,1440,0,480,540
wmctrl -i -r 0x02a0304b -e 0,0,540,480,540
wmctrl -i -r 0x02a0306b -e 0,480,540,480,540
wmctrl -i -r 0x02a0308b -e 0,960,540,480,540
wmctrl -i -r 0x02a030ab -e 0,1440,540,480,540
