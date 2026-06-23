"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push(next);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setLoading(false);
      }
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm border border-neutral-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <Image src="/hprc_logo.png" alt="HPRC" width={56} height={49} className="h-12 w-auto" />
        <h1 className="mt-3 font-display text-xl font-bold text-neutral-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">Sign in with your credentials.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-neutral-700">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            autoComplete="username"
            required
            className="mt-1 w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </label>

        <label className="block text-sm font-medium text-neutral-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="mt-1 w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-3 border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-800">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
