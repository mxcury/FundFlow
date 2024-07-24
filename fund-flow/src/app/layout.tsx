import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-outfit",
});

export const metadata: Metadata = {
	title: "FundFlow",
	description:
		"FundFlow is a digital investment management platform for automated transfers between bank accounts.",
	icons: { icon: "/icons/logo.svg" },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${outfit.variable}`}>{children}</body>
		</html>
	);
}
