import { initBTCCurve } from "@babylonlabs-io/btc-staking-ts";
import { useEffect } from "react";

import FeatureFlagService from "@/ui/common/utils/FeatureFlagService";

import { MultistakingFormWrapper } from "./components/Multistaking/MultistakingForm/MultistakingFormWrapper";
import { PersonalBalance } from "./components/PersonalBalance/PersonalBalance";
import { StakingForm } from "./components/Staking/StakingForm";
import { Stats } from "./components/Stats/Stats";
import Layout from "./layout";

const Home = () => {
  useEffect(() => {
    initBTCCurve();
  }, []);

  return (
    <Layout>
      <main className="min-h-screen flex flex-col">
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
    </Layout>
  );
};

export default Home;
