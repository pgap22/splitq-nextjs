import { Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata = {
  title: "SplitQ",
  description: "Recarga, Compra y Disfruta en SplitQ, Descubre una nueva manera de comprar con SplitQ - Una novedosa logistica que facilita tus compras",
  keywords: ["split-q","Splitq", "splitq", "colegio don bosco", "tickets", "don bosco", "colegio don bosco splitq"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
