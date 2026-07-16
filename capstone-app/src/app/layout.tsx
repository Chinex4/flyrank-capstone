import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME || "StudyFlow";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/calendar", label: "Calendar" },
  { href: "/settings", label: "Settings" },
  { href: "/health", label: "Health" },
];

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: "A student productivity workspace for planning focused study.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-border bg-surface/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
              <Link
                href="/"
                className="w-fit rounded-radius text-xl font-semibold text-primary-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {appName}
              </Link>
              <nav aria-label="Primary navigation">
                <ul className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:flex sm:flex-wrap">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-10 w-full items-center justify-center rounded-radius border border-border bg-background px-3 py-2 text-sm font-medium text-secondary-text transition hover:border-accent hover:bg-surface hover:text-primary-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto sm:border-transparent sm:bg-transparent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
              {children}
            </div>
          </main>
          <footer className="border-t border-border bg-surface">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-secondary-text sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <p>&copy; {new Date().getFullYear()} {appName}</p>
              <p>Built for focused student planning.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
