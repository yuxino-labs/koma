<div align="center">
  <img src="public/koma-family-logo.png" width="112" alt="Koma">
  <h1>Koma</h1>
  <p>Summarize videos, search subtitles, and jump back to the source.</p>
  <p><a href="README.md">简体中文</a> · English · <a href="https://koma.yuxino.cn/">Try online</a> · <a href="https://github.com/yuxino-labs/koma/issues">Report an issue</a></p>
</div>

Koma is a self-hosted AI video analysis tool. Upload a video or paste a direct MP4 URL to find the key moments and turn the results into notes or spreadsheets.

## Features

- Generate summaries, chapters, tags, subtitles, and key-frame descriptions. Click a result to jump to that moment in the video.
- Search subtitles and export Markdown analysis or SRT subtitles. Define custom fields and generate JSON, CSV, Markdown, SRT, or TXT.
- Sign in with GitHub to view, search, retry, and delete your jobs across browsers. Configure model providers and API keys in a separate admin console.

## Quick start

Requires Node.js 22.13+. FFmpeg and ffprobe are bundled.

```bash
git clone https://github.com/yuxino-labs/koma.git
cd koma
npm install
npm run dev
```

Open `http://localhost:5173`. Web analysis requires [GitHub sign-in configuration](docs/CONFIGURATION.md#github-sign-in). Real subtitles need a speech provider; summaries, frame analysis, and custom output need a vision provider. Unconfigured providers produce mock output. See [Configuration](docs/CONFIGURATION.md).

Defaults are 500 MB and 15 minutes. Remote input must be a directly downloadable HTTP(S) MP4 file (signed query parameters are supported). Platform pages, share links, and login- or subscription-protected videos are not supported.

## Data and privacy

Audio goes to the configured speech provider; key frames and transcript context go to the vision provider. New jobs are accessible only to their owner and administrators. Videos and results remain stored until explicitly deleted; issued OSS download links remain usable by their holder until expiry. Custom analysis drafts stay in the current browser, separated by account.

See [job migration](docs/ADMIN.md#existing-jobs-and-migration) for access to and claiming of older replay links. GitHub sign-in does not grant admin access. Public deployments need an egress policy or trusted URL allowlist: URL import is not a complete SSRF boundary. See [Administration and storage](docs/ADMIN.md).

## CLI

Local command-line analysis does not require a GitHub account:

```bash
npm run build
node dist-server/cli.js demo.mp4 --lang en --json result.json
node dist-server/cli.js --help
```

## Docs

[Configuration](docs/CONFIGURATION.md) · [Administration](docs/ADMIN.md) · [HTTP API](docs/API.md) · [Deployment](DEPLOY.md)
