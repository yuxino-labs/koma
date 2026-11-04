import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "../../shared/Icon.js";
import { publicPath } from "../../shared/public-site.js";
import type { GithubSession } from "./github-session.js";

export function AccountMenu({ language, session, loading, unavailable, disabled, signingOut, onLibrary, onNew, onHelp, onSignOut, onRefresh }: {
  language: "zh" | "en";
  session: GithubSession | null;
  loading: boolean;
  unavailable: boolean;
  disabled: boolean;
  signingOut: boolean;
  onLibrary: () => void;
  onNew: () => void;
  onHelp: () => void;
  onSignOut: () => Promise<void>;
  onRefresh: () => void;
}) {
  const zh = language === "zh";
  const [open, setOpen] = useState(false);
  const [brokenAvatar, setBrokenAvatar] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const identity = session?.user;
  const name = identity?.name || identity?.login || (zh ? "我的账号" : "My account");

  useEffect(() => { setBrokenAvatar(false); }, [identity?.avatarUrl]);
  useEffect(() => { setOpen(false); }, [identity?.id, session?.authenticated, language, disabled]);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault(); setOpen(false); trigger.current?.focus();
    };
    const blur = () => setOpen(false);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    window.addEventListener("blur", blur);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("blur", blur);
    };
  }, [open]);

  if (loading) return <span className="account-loading" role="status" aria-label={zh ? "正在读取账号" : "Loading account"} />;
  if (!session?.authenticated) {
    if (unavailable) return <button className="account-login" type="button" onClick={onRefresh}>{zh ? "重试登录" : "Retry sign-in"}</button>;
    if (!session?.enabled) return <button className="account-login" type="button" disabled title={zh ? "登录服务暂时不可用" : "Sign-in is unavailable"}>{zh ? "登录不可用" : "Sign-in unavailable"}</button>;
    const path = typeof window !== "undefined" && window.location.pathname.startsWith("/jobs/") ? window.location.pathname : publicPath(language);
    return <a className="account-login" href={`/api/auth/github?returnTo=${encodeURIComponent(path)}`}>{zh ? "登录" : "Sign in"}</a>;
  }

  function navigate(action: () => void) {
    setOpen(false); action();
    // The requested view is rendered before moving keyboard focus to its heading.
    requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>(".main-shell h1");
      if (heading) { heading.tabIndex = -1; heading.focus(); }
    });
  }

  return <div className="account-menu" ref={root} onBlur={(event) => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
  }}>
    <button className="account-trigger" ref={trigger} type="button" disabled={disabled || signingOut} aria-label={zh ? `${name}的账号菜单` : `Account menu for ${name}`} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)}>
      {identity?.avatarUrl && !brokenAvatar ? <img src={identity.avatarUrl} alt="" referrerPolicy="no-referrer" onError={() => setBrokenAvatar(true)} /> : <span className="account-initial" aria-hidden="true">{Array.from(name.trim())[0]?.toUpperCase() || "K"}</span>}
      <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    </button>
    {open && <div id={panelId} className="account-panel" ref={panel} role="group" aria-label={zh ? "账号选项" : "Account options"}>
      <div className="account-summary"><strong>{name}</strong>{identity?.login && <span>@{identity.login}</span>}</div>
      <button type="button" onClick={() => navigate(onLibrary)}><Icon name="library" size={17} /><span>{zh ? "我的视频与记录" : "My videos & history"}</span></button>
      <button type="button" onClick={() => navigate(onNew)}><Icon name="plus" size={17} /><span>{zh ? "新建分析" : "New analysis"}</span></button>
      <button type="button" onClick={() => { setOpen(false); trigger.current?.focus(); onHelp(); }}><Icon name="info" size={17} /><span>{zh ? "使用帮助" : "Help"}</span></button>
      <div className="account-divider" />
      <button type="button" disabled={signingOut} onClick={() => { setOpen(false); void onSignOut(); }}><Icon name="sign-out" size={17} /><span>{signingOut ? (zh ? "正在退出…" : "Signing out…") : (zh ? "退出登录" : "Sign out")}</span></button>
    </div>}
  </div>;
}
