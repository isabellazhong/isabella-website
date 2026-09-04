import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="container-page flex flex-col items-start gap-4 py-24">
      <h1 className="font-display text-4xl tracking-tight">Page not found</h1>
      <p className="text-ink-soft">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink">
        Back home
      </Link>
    </div>
  );
}
