<div align="center">
  <img src="public/koma-family-logo.png" width="112" alt="Koma">
  <h1>Koma</h1>
  <p>整理视频摘要，搜索字幕，回看原片。</p>
  <p>简体中文 · <a href="README.en.md">English</a> · <a href="https://koma.yuxino.cn/zh/">在线体验</a> · <a href="https://github.com/yuxino-labs/koma/issues">问题反馈</a></p>
</div>

Koma 是可自行部署的 AI 视频分析工具。上传视频或粘贴 MP4 直链，快速找到视频重点，并把结果整理成笔记或表格。

## 功能

- 生成摘要、章节、标签、字幕和关键帧描述；点击结果跳回视频对应时刻。
- 搜索字幕，导出 Markdown 分析和 SRT 字幕；自定义提取字段，生成 JSON、CSV、Markdown、SRT 或 TXT。
- GitHub 登录个人工作区，跨浏览器查看、搜索、重试和删除任务；独立管理后台配置模型服务与 API Key。

## 快速开始

需要 Node.js 22.13+，FFmpeg 和 ffprobe 已内置。

```bash
git clone https://github.com/yuxino-labs/koma.git
cd koma
npm install
npm run dev
```

打开 `http://localhost:5173`。网页分析需要[配置 GitHub 登录](docs/CONFIGURATION.zh-CN.md#github-登录)。真实字幕需要语音识别服务，摘要、画面分析和自定义输出需要视觉模型；未配置相应服务时使用演示数据。详见[配置说明](docs/CONFIGURATION.zh-CN.md)。

默认限制为 500 MB、15 分钟。远程输入仅支持可直接下载的 HTTP(S) MP4 文件（可带签名参数），不支持平台页面、分享链接或需要登录、会员权限的视频。

## 数据与隐私

音频会发送给配置的语音服务，关键帧和字幕上下文会发送给视觉模型。新任务仅所有者和管理员可访问，视频与结果保留到主动删除；OSS 签名下载地址在过期前仍可被持有者使用。自定义分析草稿保存在当前浏览器，并按账号区分。

旧回看链接的访问与认领规则见[任务迁移](docs/ADMIN.zh-CN.md#旧任务与迁移)。GitHub 登录不授予管理权限；公开部署前应配置出站网络策略或可信 URL 白名单，URL 导入并非完整的 SSRF 防线。详见[管理与存储](docs/ADMIN.zh-CN.md)。

## CLI

本地命令行无需 GitHub 账号：

```bash
npm run build
node dist-server/cli.js demo.mp4 --lang zh --json result.json
node dist-server/cli.js --help
```

## 文档

[配置](docs/CONFIGURATION.zh-CN.md) · [管理后台](docs/ADMIN.zh-CN.md) · [HTTP API](docs/API.zh-CN.md) · [部署](DEPLOY.md)
