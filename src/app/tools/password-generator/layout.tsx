import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator — Create Strong Random Passwords",
  description: "Free online password generator. Create strong, random, secure passwords with customizable length and character types. No data stored.",
  keywords: ["password generator", "random password", "strong password generator", "secure password", "password creator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
