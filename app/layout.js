import { Outfit, Ovo, Monda} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

const monda = Monda({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "matt.dev",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} ${monda.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
