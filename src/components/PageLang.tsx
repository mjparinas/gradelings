"use client";

import { useEffect } from "react";
import { DEFAULT_LANG, langFromOgLocale } from "@/lib/pageLang.mjs";

/**
 * Keeps `<html lang>` true to the page after moving between pages in the browser, where the root layout
 * doesn't render again: a US state's pages are en-US, everything else en-CA (src/lib/pageLang.mjs). The new
 * page's metadata streams into <head> after the page itself, so this follows <head> rather than the URL.
 */
export function PageLang() {
  useEffect(() => {
    const update = () => {
      const og = document.head.querySelector('meta[property="og:locale"]')?.getAttribute("content");
      const lang = langFromOgLocale(og) ?? DEFAULT_LANG;
      if (document.documentElement.lang !== lang) document.documentElement.lang = lang;
    };
    update();
    const watch = new MutationObserver(update);
    watch.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["content"] });
    return () => watch.disconnect();
  }, []);
  return null;
}
