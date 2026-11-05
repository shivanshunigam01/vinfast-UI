declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

/** Load GTM when VITE_GTM_ID is set (configure in production .env). */
export function initAnalytics() {
  const gtmId = import.meta.env.VITE_GTM_ID?.trim();
  if (!gtmId || typeof document === "undefined") return;
  if (document.getElementById("gtm-script")) return;

  ensureDataLayer();
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);

  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.title = "Google Tag Manager";
  noscript.appendChild(iframe);
  document.body.prepend(noscript);
}

export type ConversionEvent =
  | "test_drive_submit"
  | "book_now_submit"
  | "lead_strip_submit"
  | "click_phone"
  | "click_whatsapp";

export function trackConversion(event: ConversionEvent, detail?: Record<string, string | number | boolean>) {
  ensureDataLayer();
  window.dataLayer!.push({
    event,
    ...detail,
  });
}
