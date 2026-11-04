import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { GithubStarLink } from "./GithubStarLink.js";

describe("GitHub star entry", () => {
  it("renders the verified count and accessible repository link without a browser or API request", () => {
    const fetcher = vi.spyOn(globalThis, "fetch");
    try {
      const html = renderToStaticMarkup(<GithubStarLink language="zh" />);
      expect(html).toContain('href="https://github.com/yuxino-labs/koma"');
      expect(html).toContain('aria-label="在 GitHub 上为 Koma 点 Star，298 个 Star"');
      expect(html).toContain('class="github-star-count" aria-hidden="true">298</span>');
      expect(html).toContain("2026-11-04 11:58:33 UTC");
      expect(fetcher).not.toHaveBeenCalled();
    } finally { fetcher.mockRestore(); }
  });
});
