import { Noto_Sans_Mono } from "next/font/google";
import { twJoin } from "tailwind-merge";

import { network } from "@/ui/config/network/btc";
import { Network } from "@/ui/types/network";

import "./globals.scss";
import Providers from "./providers";

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div
        className={twJoin(
          `relative h-full min-h-svh w-full`,
          notoSansMono.variable,
          network === Network.MAINNET ? "main-app-mainnet" : "main-app-testnet",
        )}
      >
        {children}
      </div>
    </Providers>
  );
}
