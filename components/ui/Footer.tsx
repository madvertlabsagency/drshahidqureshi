import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="container">
        <span>© {new Date().getFullYear()} Dr. Shahid Qureshi · Promoting Purpose Driven Entrepreneurship</span>
        <nav aria-label="Legal">
          <Link href="/resources">Free Resources</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund-policy">Refund Policy</Link>
        </nav>
        <p className="disc">
          GCE is a certificate program, not an accredited degree. USASBE awards recognise entrepreneurship programs designed and delivered by Dr. Shahid Qureshi. Results depend
          on individual effort; no income or business outcome is guaranteed. Event photographs are shown for historical professional context and do not imply endorsement.
        </p>
      </div>
    </footer>
  );
}
