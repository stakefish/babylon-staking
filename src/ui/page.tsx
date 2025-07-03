import { initBTCCurve } from "@babylonlabs-io/btc-staking-ts";
import { useEffect } from "react";

import FeatureFlagService from "@/ui/utils/FeatureFlagService";

import { Banner } from "./components/Banner/Banner";
import { MultistakingFormWrapper } from "./components/Multistaking/MultistakingForm/MultistakingFormWrapper";
import { PersonalBalance } from "./components/PersonalBalance/PersonalBalance";
import { StakingForm } from "./components/Staking/StakingForm";
import { Stats } from "./components/Stats/Stats";
import { Footer } from "./componentsStakefish/Footer";
import { Header } from "./componentsStakefish/Header";

const Home = () => {
  useEffect(() => {
    initBTCCurve();
  }, []);

  return (
    <>
      <Banner />
      <Header />

      <main className="min-h-screen py-12 flex flex-col">
        <div className="flex w-full grow flex-col gap-4">
          <section className="-mt-px flex flex-col gap-2 overflow-hidden salmon:flex-row salmon:gap-0">
            <div className="-mr-px w-[calc(100%+1px)] salmon:w-[calc(50%+1px)]">
              <Stats />
            </div>
            <div className="-ml-px w-[calc(100%+1px)] salmon:ml-0 salmon:w-[calc(50%+1px)]">
              <PersonalBalance />
            </div>
          </section>
          {FeatureFlagService.IsMultiStakingEnabled ? (
            <MultistakingFormWrapper />
          ) : (
            <StakingForm />
          )}
        </div>
      </main>
      <Footer simple fixed />
    </>
  );
};

export default Home;
