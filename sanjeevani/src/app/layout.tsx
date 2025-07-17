import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanjeevani - Mental Wellness Companion",
  description: "A soothing space for mental wellness, anonymous sharing, and compassionate AI support",
  keywords: "mental health, wellness, meditation, therapy, support, anonymous",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f0fdf5" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-mint-50 via-cream-50 to-lavender-50 font-sans antialiased">
        <div className="relative min-h-screen">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0fdf5' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              width: '100%',
              height: '100%'
            }}></div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
