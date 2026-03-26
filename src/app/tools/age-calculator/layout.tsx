import type { Metadata } from "next";
export const metadata: Metadata = { title: "Age Calculator — How Old Am I?", description: "Free online age calculator. Calculate your exact age in years, months, days, weeks, and hours from your date of birth.", keywords: ["age calculator", "calculate age", "how old am i", "birthday calculator", "date of birth calculator"] };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
