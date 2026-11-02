"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CritterSvg } from "@/components/CritterArt";
import { APP_NAME } from "@/lib/brand";
import { useNow } from "@/lib/useNow";
import { certificateDate, type CertificateText } from "@/lib/certificate";

/** A "Print certificate" button. The certificate is drawn only when printing (see `.certificate` in globals.css). */
export function PrintCertificate({ text, companion = "ollie", label = "Print certificate", className = "" }: { text: CertificateText; companion?: string; label?: string; className?: string }) {
  const now = useNow();
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const done = () => document.body.classList.remove("printing-certificate");
    window.addEventListener("afterprint", done);
    // The portal needs document.body, which only exists in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHost(document.body);
    return () => window.removeEventListener("afterprint", done);
  }, []);
  return (
    <>
      <button
        type="button"
        className={`min-h-11 rounded-xl border border-line bg-white px-3 text-sm font-semibold print:hidden ${className}`}
        onClick={() => {
          document.body.classList.add("printing-certificate");
          window.print();
        }}
      >
        <span aria-hidden="true">🖨️ </span>
        {label}
      </button>
      {host &&
        createPortal(
          <div data-certificate className="certificate" aria-hidden="true">
            <div className="certificate-frame">
              <div className="certificate-critter">
                <CritterSvg id={companion} mood="cheer" holiday={null} />
              </div>
              <p className="certificate-brand">{APP_NAME}</p>
              <h1>{text.heading}</h1>
              <p className="certificate-line">{text.line}</p>
              <p className="certificate-date">{certificateDate(now)}</p>
              <p className="certificate-note">{text.note}</p>
            </div>
          </div>,
          host,
        )}
    </>
  );
}
