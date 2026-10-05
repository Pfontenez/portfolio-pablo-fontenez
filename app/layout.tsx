import type { Metadata } from "next";
import { Blinker } from "next/font/google";
import "./globals.css";

const blinker = Blinker({
  variable: "--font-blinker",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pablo Fonteñez — Diseñador gráfico",
  description: "Portfolio inmersivo de Pablo Fonteñez: branding, redes sociales, banners, video e inteligencia artificial.",
  other: {
    "codex-preview": "development",
  },
  icons: {
  icon: "/icon.png",
  shortcut: "/icon.png",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${blinker.variable} antialiased`}>
        {children}
        <script
  type="module"
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon={JSON.stringify({
    token: "6eb972761a994e529d142660a9337c17",
  })}
></script>
      </body>
    </html>
  );
}
