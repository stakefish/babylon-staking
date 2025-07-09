import { twJoin } from "tailwind-merge";

import { network } from "@/ui/common/config/network/btc";
import { Network } from "@/ui/common/types/network";

import { Footer } from "../componentsStakefish/Footer";
import { Header } from "../componentsStakefish/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <div
      className={twJoin(
        `relative h-full min-h-svh w-full`,
        network === Network.MAINNET ? "main-app-mainnet" : "main-app-testnet",
      )}
    >
      <Header />
      {children}

      <Footer simple fixed />
    </div>
  );
}
