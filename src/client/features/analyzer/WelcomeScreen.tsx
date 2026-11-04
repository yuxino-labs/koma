import { useEffect, useState } from "react";
import { Icon } from "../../shared/Icon.js";
import { publicPath, REPOSITORY_URL } from "../../shared/public-site.js";

export function GithubMark() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg>;
}

export function WelcomeScreen({ language, enabled, unavailable, expired, error, onRefresh, onHelp }: {
  language: "en" | "zh";
  enabled: boolean;
  unavailable: boolean;
  expired: boolean;
  error: string;
  onRefresh: () => void;
  onHelp: () => void;
}) {
  const zh = language === "zh";
  const [authError, setAuthError] = useState<string | null>(null);
  useEffect(() => { setAuthError(new URLSearchParams(window.location.search).get("auth")); }, []);
  const callbackError = ["cancelled", "expired", "unavailable"].includes(authError || "");
  const target = typeof window !== "undefined" && window.location.pathname.startsWith("/jobs/") ? window.location.pathname : publicPath(language);
  const loginUrl = `/api/auth/github?returnTo=${encodeURIComponent(target)}`;
  return <section className="welcome-layout" aria-labelledby="welcome-title">
    <div className="welcome-main"><h1 id="welcome-title">{zh ? "整理和查阅你的视频" : "Your videos, organized."}</h1><p className="welcome-description">{zh ? "上传视频或粘贴 MP4 直链，获取摘要、章节和可搜索字幕。所有结果都能定位到原片，方便核对和回看。" : "Upload a video or paste a direct MP4 URL for summaries, chapters, and searchable subtitles. Jump from a result to the source to check or revisit it."}</p>
      <div className="welcome-login">{enabled && !unavailable ? <a className="primary-button github-login" href={loginUrl}><GithubMark />{zh ? "使用 GitHub 登录" : "Continue with GitHub"}</a> : <div className="login-unavailable"><strong>{zh ? "登录服务暂时不可用" : "Sign-in is temporarily unavailable"}</strong><button className="text-button" type="button" onClick={onRefresh}>{zh ? "重新检查" : "Check again"}<Icon name="refresh" size={15} /></button></div>}<small>{zh ? "只读取公开账号信息，不申请仓库权限。" : "Public profile only. No repository access requested."}</small></div>
      {(expired || callbackError || error) && <div className="welcome-error" role="alert">{(expired || authError === "expired") ? (zh ? "登录已过期。重新登录后，就能继续查看自己的视频。" : "Your session expired. Sign in again to return to your videos.") : authError === "unavailable" ? (zh ? "GitHub 登录暂时没有连接成功，请稍后重试。" : "GitHub sign-in could not be reached. Please try again shortly.") : callbackError ? (zh ? "这次登录没有完成，请重新通过 GitHub 登录。" : "Sign-in wasn’t completed. Please try GitHub again.") : error}</div>}
      <div className="welcome-account-note"><p>{zh ? "视频和分析记录保存在你的账号下。换个浏览器，用同一个 GitHub 账号登录即可查看。" : "Your videos and analysis history are saved to your account. Sign in with the same GitHub account to access them in another browser."}</p></div>
    </div>
    <div className="welcome-capabilities">{(zh ? [["01", "先看摘要和章节", "摘要与章节，帮助你快速了解内容和脉络。"], ["02", "搜索字幕，回到原片", "搜索字幕，点一下就回到原片中的那一刻。"], ["03", "下载分析结果", "摘要、字幕、自定义数据，下载后继续使用。"]] : [["01", "Summaries and chapters", "Read a summary and browse the video by chapter."], ["02", "Search and replay", "Search a line and jump straight to where it happened."], ["03", "Download the results", "Download your summary, subtitles, and custom data."]]).map(([index, title, description]) => <div key={index}><div><h2>{title}</h2><p>{description}</p></div></div>)}</div>
    <details className="welcome-details"><summary>{zh ? "使用限制与数据隐私" : "Usage limits and data privacy"}</summary>
      <section><h2>{zh ? "视频与数据如何处理" : "How videos and data are handled"}</h2><p>{zh ? "音频会发送给配置的语音服务，关键帧和字幕上下文会发送给视觉服务。视频与分析结果保留到本人或管理员删除；新建账号任务会检查所有者权限。已签发的下载链接在到期前仍可被持有者使用。" : "Audio is sent to the configured speech provider; key frames and transcript context are sent to the configured vision provider. Videos and results stay stored until their owner or an administrator deletes them. New account-owned jobs check ownership; issued signed download links remain usable by their holder until expiry."}</p><a href={`${REPOSITORY_URL}/blob/main/${zh ? "README.md" : "README.en.md"}#${zh ? "数据与隐私" : "data-and-privacy"}`}>{zh ? "数据与隐私说明" : "Data and privacy details"}</a></section>
      <section><h2>{zh ? "自行部署与使用限制" : "Self-hosting and limits"}</h2><p>{zh ? "自行部署需要 Node.js 22.13 或更新版本，并配置 GitHub 登录、语音与视觉服务；未配置模型服务时使用模拟输出。上传默认限 500 MB、15 分钟，实际以站点配置为准。只接受本地上传或可直接下载的 MP4 直链，不解析第三方平台页面、分享链接或需要登录的视频。" : "Self-hosting requires Node.js 22.13 or newer, GitHub sign-in, and speech and vision providers. Unconfigured providers produce mock output. Uploads default to 500 MB and 15 minutes, subject to the site's settings. Only local uploads and downloadable MP4 URLs are accepted. Third-party platform pages, share links, and login-protected media are not supported."}</p><a href={`${REPOSITORY_URL}/blob/main/${zh ? "README.md" : "README.en.md"}`}>{zh ? "源码与部署指南" : "Source and setup guide"}</a></section>
    </details>
    <footer className="welcome-footer"><button type="button" onClick={onHelp}>{zh ? "使用帮助" : "Help"}</button><a href={REPOSITORY_URL} target="_blank" rel="noreferrer">GitHub</a><a href={`${REPOSITORY_URL}/issues`} target="_blank" rel="noreferrer">{zh ? "反馈问题" : "Report an issue"}</a></footer>
  </section>;
}
