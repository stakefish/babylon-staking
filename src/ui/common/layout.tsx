import { twJoin } from "tailwind-merge";

import { network } from "@/ui/common/config/network/btc";
import { Network } from "@/ui/common/types/network";

import { ComplianceDialog } from "../componentsStakefish/ComplianceDialog";
import { useSingaporeCompliance } from "../componentsStakefish/ComplianceDialog/useSingaporeCompliance";
import { Footer } from "../componentsStakefish/Footer";
import { Header } from "../componentsStakefish/Header";

import { SfBanner } from "./components/SfBanner/SfBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const { shouldShowDialog } = useSingaporeCompliance();

  return (
    <div
      className={twJoin(
        `relative h-full min-h-svh w-full`,
        network === Network.MAINNET ? "main-app-mainnet" : "main-app-testnet",
      )}
    >
      <Header />
      <section className="py-12">
        <SfBanner />
        {children}
      </section>

      <Footer simple fixed />

      {!!shouldShowDialog && <ComplianceDialog />}
    </div>
  );
}
