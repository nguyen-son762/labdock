import type { Metadata } from "next";
import { Key, SecuritySafe, ShieldTick } from "iconsax-reactjs";

export const metadata: Metadata = {
  title: "Security",
  description: "Learn how Labdock protects account sessions and user data.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security | Labdock",
    description: "Learn how Labdock protects account sessions and user data.",
    url: "/security",
  },
};

const protections = [
  {
    title: "Cookie-based sessions",
    description: "Access tokens are not stored in local storage. Secure session cookies are managed by the backend.",
    icon: SecuritySafe,
  },
  {
    title: "Server-side authorization",
    description:
      "The interface is not an authorization boundary. Private APIs verify every user and permission server-side.",
    icon: Key,
  },
  {
    title: "Isolated private cache",
    description:
      "Private query data is cleared at authentication boundaries to prevent information leaking across sessions.",
    icon: ShieldTick,
  },
] as const;

export default function SecurityPage() {
  return (
    <main className="container py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-primary">Defence in depth</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Secure by design</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Labdock reduces its attack surface with clear data boundaries and backend-controlled sessions.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {protections.map(({ title, description, icon: Icon }) => (
          <section key={title} className="rounded-xl border bg-card p-6">
            <Icon className="size-6 text-primary" aria-hidden="true" />
            <h2 className="mt-5 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
