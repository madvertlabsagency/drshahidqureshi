"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { hasConsent, newEventId, track } from "@/lib/tracking";

export function CheckoutForm({ order, value, pathway }: { order: string; value: number | null; pathway: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    track("view_checkout", { pathway, value: value ?? 0, currency: "PKR" });
  }, [pathway, value]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const method = new FormData(e.currentTarget).get("method");
    const eventId = newEventId("chk");
    const res = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ order, method, eventId, analyticsConsent: hasConsent() }) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) {
      setMsg(json.error || "Payment could not be started. Please try again.");
      setBusy(false);
      return;
    }
    track("begin_checkout", { pathway, value: value ?? 0, currency: "PKR", payment_type: String(method) }, eventId);
    router.push(json.next);
  }

  return (
    <form onSubmit={submit}>
      <h3 style={{ marginBottom: 6 }}>Payment method</h3>
      <div className="pay-opt">
        <label className="opt"><input type="radio" name="method" value="card" defaultChecked /><b>Online card payment</b><span>Visa · Mastercard</span></label>
        <label className="opt"><input type="radio" name="method" value="bank" /><b>Bank transfer</b><span>PK &amp; international</span></label>
      </div>
      <button className="btn btn-primary btn-lg btn-block" disabled={busy || value == null}>
        {busy ? "Starting secure payment…" : "Complete Payment"} {!busy && <Icon name="lock" />}
      </button>
      <div className={`form-msg${msg ? " show" : ""}`} role="alert">{msg}</div>
    </form>
  );
}
