# nikoboi.dev

This repository contains my website, which contains several lightweight, open-source web tools. All tools are fully client-side, easy to use, and open-source under the **GPLv3 License**.

## Overview of Tools

| Site | Description | Live Demo | Source |
|------|------------|-----------|--------|
| **Home** | Simple site for easy access to all of my socials | [root](https://nikoboi.dev/) | [root](https://github.com/NikoboiNFTB/nikoboinftb.github.io/) |
| **Bingo** | Very simple, clean and Open-Source Bingo host and client. | [bingo](https://nikoboi.dev/bingo) | [bingo](https://github.com/NikoboiNFTB/nikoboinftb.github.io/tree/main/bingo) |
| **Encryptor** | Easily encrypt and decrypt your messages, because fuck Chat Control. | [encrypt](https://nikoboi.dev/encrypt) | [encrypt](https://github.com/NikoboiNFTB/nikoboinftb.github.io/tree/main/encrypt) |
| **Open Links** | Quickly open multiple URLs in new browser tabs. | [links](https://nikoboi.dev/links) | [links](https://github.com/NikoboiNFTB/nikoboinftb.github.io/tree/main/links) |
| **Userscript Safety Guide** | A simple tutorial to guide you in safe installation and use of userscripts. | [safety](https://nikoboi.dev/safety) | [safety](https://github.com/NikoboiNFTB/nikoboinftb.github.io/tree/main/safety) |

## Home

A simple, free and open-source portal where all of my public social media accounts can be found. The code is easily tweakable, so others can create their own social portals based on this project (feel free to do so :D). Most socials have icons in [`/assets/svg/brand/`](https://github.com/NikoboiNFTB/nikoboinftb.github.io/tree/main/assets/svg/brand).

### Features

- Centralized hub for all social media links.
- Clean, minimal interface.
- Fully open-source and easily forkable for personal use.

### Usage

**Open Live Version**:
- [https://nikoboi.dev/](https://nikoboi.dev/)
- Or Download & Run/Edit Locally:
  - The main HTML file is `index.html`, and the main CSS file is `style.css`.

### Screenshot

![Screenshot of Root](assets/screenshot/root-2025-11-27-12-06-39.png)

## Bingo

A simple, free and open-source Bingo game.

### Features

- Separate Play and Host views.
- Clean, minimal interface.
- Fully open-source and easily forkable for personal use.

### Usage

**Option 1**. Open Live Version:

[https://nikoboi.dev/bingo](https://nikoboi.dev/bingo)

**Option 2**: Download & Run Locally (not recommended, as you wont have HTTPS, which is annoying on *some* secure browsers):

1. Clone this repository, in terminal, run:

```bash
git clone https://github.com/NikoboiNFTB/nikoboinftb.github.io`
cd nikoboinftb.github.io`
```

2. Start a Python server:
```bash
python3 -m http.server 5500
```

>> Requires Python

3. Visit the server by running:
```bash
firefox firefox http://localhost:5500/bingo/index.html
```

>> Any browser works.

You can also open `http://<PC-ip>:5500/bingo/index.html` on any device in your LAN.

### Screenshots

![Screenshot of Bingo](assets/screenshot/bingo-2025-11-27-12-07-39.png)

![Screenshot of Bingo Client](assets/screenshot/bingo-client-2025-11-27-12-08-09.png)

![Screenshot of Bingo Host](assets/screenshot/bingo-host-2025-11-27-12-08-35.png)

## Text Encryption Tool

A lightweight, free, and open-source web tool to encrypt and decrypt text quickly. Perfect for small messages or learning about simple encryption techniques. The code is reusable, so you can modify or integrate it into your own projects.

### Features

- Encrypt and decrypt text in the browser.
- Simple, intuitive interface.
- Fully open-source and easily forkable for personal use.

### Usage

**Option 1**. Open Live Version:
[https://nikoboi.dev/encrypt/](https://nikoboi.dev/encrypt/)

**Option 2**. Download and Run locally (recommended)
1. Create a folder anywhere, open the terminal in it and run:
```bash
git clone https://github.com/NikoboiNFTB/nikoboinftb.github.io
```

2. Run:
```bash
cd nikoboinftb.github.io/encrypt/
```

3. On Linux, just run:
```bash
xdg-open index.html
```

4. On Windows (or Linux if you want), run the following;
```bash
python3 -m http.server 5500
```

>> Requires Python

5. Then just open in your browser: [http://localhost:5500/encrypt/](http://localhost:5500/encrypt/)
```bash
firefox http://localhost:5500/encrypt/
```

![Screenshot of Encrypt](assets/screenshot/encrypt-2025-11-27-12-09-03.png)

## Open Links

A lightweight tool for opening multiple URLs at once in new tabs. Useful for bulk opening tabs. A great extra tool to use with [Link Gopher](https://addons.mozilla.org/en-US/firefox/addon/link-gopher/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search) (just as they likely intended "... or copy and paste into other systems").

### Features

- Open multiple URLs in a single click.
- Ignores invalid links (must start with `http://` or `https://`).
- Clean, dark-themed interface.
- Fully client-side; no data is sent anywhere.
  - Well, GitHub is owned by Microsoft, so... Download it and run locally if you want FULL privacy.
  - (And use Linux)

### Usage

**Option 1**. Open Live Version:

[https://nikoboi.dev/links](https://nikoboi.dev/links)

**Option 2**. Download & Run Locally:
1. Clone the repository and open `links/index.html`.
  - Technically even better for privacy, since not even GitHub can track you anymore

2. Paste URLs (one per line), click **Open All Links**, or **Clear Links** to reset.

**Example input**:
```text
https://www.instagram.com/nikoboi
https://www.youtube.com/@NikoboiNFTB
https://www.reddit.com/r/deslop
```

>> Shameless plug

### Screenshot

![Screenshot of Open Links](assets/screenshot/open-links-2025-11-20.png)

## Repository Structure

>> Not a **full** tree. Only relevant bits, and examples where relevant.
```text
.
├── assets
│   │
│   ├── screenshot
│   │   ├── example.png
│   │   └── example.png
│   │
│   ├── svg
│   │   ├── brand
│   │   │   │
│   │   │   ├── example.svg
│   │   │   └── example.svg
│   │   │
│   │   └── regular
│   │       ├── example.svg
│   │       └── example.svg
│   │
│   ├── clippy.png
│   ├── fin-circle-gradient.svg
│   └── fin-square-gradient.svg
│
├── bingo
│   ├── client
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   │
│   ├── host
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   │
│   ├── index.html
│   └── style.css
│
├── encrypt
│   ├── index.html
│   ├── README.md
│   ├── script.js
│   ├── style.css
│   └── test.js
│
├── js
│   └── safety
│       ├── index.html
│       └── style.css
│
├── links
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── player
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── sh
│   ├── all-pull
│   ├── all-push
│   ├── all-status
│   ├── clone-author
│   ├── clone-repo
│   ├── compare
│   ├── disable-ssh
│   ├── enable-ssh
│   ├── pull
│   ├── push
│   ├── setup-auto
│   ├── setup-ssh
│   ├── sort-file
│   ├── status
│   ├── test123.txt
│   └── workflow
│
├── CNAME
├── index.html
├── LICENSE
├── README.md
├── robots.txt
├── sitemap.xml
└── style.css

20 directories, 882 files
```

## Contributing

Feel free to fork this repository and submit issues or pull requests if you have any suggestions or improvements. If you encounter any bugs or have feature requests, please open an issue.

## Credits

Created by **[Nikoboi](https://github.com/NikoboiNFTB/)**

JavaScript fine-tuned with **ChatGPT**

Theme inspired by the great nation of **Finland** 🇫🇮 and the perfectly cromulent color **black**.

## License

This project is licenced under the GNU General Public License V3. See [LICENSE](/LICENSE) for details.
