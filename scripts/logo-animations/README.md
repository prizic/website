# Prizic logo animations

blink.mjs: eyes blink (2.4s loop). smile.mjs: z turns into a smile (3.6s loop).
Each writes PNG frames for black-on-white and white-on-black.

    npm i playwright-core && npx playwright install chromium-headless-shell
    node blink.mjs    # frames-<variant>/
    node smile.mjs    # smile-<variant>/

Turn frames into a GIF (needs ffmpeg):

    ffmpeg -framerate 30 -i smile-black-on-white/%03d.png -vf "scale=600:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=32[p];[b][p]paletteuse=dither=none" -loop 0 prizic-smile-black-on-white.gif

Timing, size and colours are constants at the top of each script.
