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
  description:
    "Portfolio inmersivo de Pablo Fonteñez: branding, redes sociales, banners, video e inteligencia artificial.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BSMMWE1THM"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BSMMWE1THM');
            `,
          }}
        />
      </head>

      <body className={`${blinker.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
