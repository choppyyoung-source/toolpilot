import type { Metadata } from "next";
export const metadata: Metadata = { title: "BMI Calculator — Calculate Body Mass Index", description: "Free online BMI calculator. Calculate your Body Mass Index using metric or imperial units. Get instant results with health category.", keywords: ["bmi calculator", "body mass index calculator", "calculate bmi", "bmi checker", "weight calculator"] };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
