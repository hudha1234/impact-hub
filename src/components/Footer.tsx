import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <span className="font-display text-lg font-bold text-foreground">Impact Hub</span>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Digitizing NGO fund management with verifiable accountability and full transparency.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Navigation</h4>
            <nav className="mt-3 flex flex-col gap-2">
              {["/", "/about", "/projects", "/donate", "/volunteer"].map((p) => (
                <Link key={p} to={p} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {p === "/" ? "Home" : p.slice(1).charAt(0).toUpperCase() + p.slice(2)}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact</h4>
            <p className="mt-3 text-sm text-muted-foreground">contact@impacthub.org</p>
            <p className="text-sm text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Impact Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
