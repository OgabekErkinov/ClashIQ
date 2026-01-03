import Providers from "@/providers/Providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="full-size full-center main-linear-bg">
          {children}
        </div>
        </Providers>
      </body>
    </html>
  );
}
