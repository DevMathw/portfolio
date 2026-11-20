import Link from "next/link";

export const metadata = {
  title: "Page not found — mat.dev",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound-inner">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">This page doesn&apos;t exist</h1>
        <p className="notfound-text">
          The link may be broken or the page may have moved. Esta página no existe:
          es posible que el enlace esté roto o que la página se haya movido.
        </p>
        <div className="notfound-actions">
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
          <Link className="btn btn-ghost" href="/#contact">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
