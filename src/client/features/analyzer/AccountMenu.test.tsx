import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AccountMenu } from "./AccountMenu.js";

const props = { language: "zh" as const, session: null, loading: false, unavailable: false, disabled: false, signingOut: false, onLibrary: vi.fn(), onNew: vi.fn(), onHelp: vi.fn(), onSignOut: vi.fn(async () => {}), onRefresh: vi.fn() };

describe("personal account entry", () => {
  it("uses the signed-in user's avatar and escapes their display name", () => {
    const html = renderToStaticMarkup(<AccountMenu {...props} session={{ enabled: true, authenticated: true, user: { id: "1", login: "viewer", name: '<img onerror="alert(1)">', avatarUrl: "https://example.com/avatar.png" } }} />);
    expect(html).toContain('src="https://example.com/avatar.png"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('&lt;img onerror=');
    expect(html).not.toContain('href="/admin"');
    expect(html).not.toContain('koma-editor');
  });
  it("renders a personal initial when an avatar is missing", () => {
    const html = renderToStaticMarkup(<AccountMenu {...props} session={{ enabled: true, authenticated: true, user: { id: "2", login: "viewer", name: null, avatarUrl: "" } }} />);
    expect(html).toContain('class="account-initial" aria-hidden="true">V</span>');
  });
  it.each([['zh', '%2Fzh%2F'], ['en', '%2F']] as const)("sends signed-out %s users to sign-in, never administration", (language, returnTo) => {
    const html = renderToStaticMarkup(<AccountMenu {...props} language={language} session={{ enabled: true, authenticated: false }} />);
    expect(html).toContain(`href="/api/auth/github?returnTo=${returnTo}"`);
    expect(html).not.toContain('/admin');
  });
  it("does not offer a login link while loading or unavailable", () => {
    expect(renderToStaticMarkup(<AccountMenu {...props} loading />)).toContain('role="status"');
    expect(renderToStaticMarkup(<AccountMenu {...props} unavailable />)).toContain('重试登录');
    expect(renderToStaticMarkup(<AccountMenu {...props} session={{ enabled: false, authenticated: false }} />)).toContain('disabled=""');
  });
});
