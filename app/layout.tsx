import ThemeModeToggle from "@/components/ThemeModeToggle";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-end p-2">
            <ThemeModeToggle />
          </header>
          <main className="flex-1 flex flex-col">{children}</main>
          <footer>
            <div className="container mx-auto px-2 py-3">
              <p className="text-sm text-center text-muted-foreground">
                This application was built by Maciej Trojan for recruitment
                purposes only.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
