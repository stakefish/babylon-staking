"use client";

import { initBTCCurve } from "@babylonlabs-io/btc-staking-ts";
import { useEffect, useState } from "react";

import { StakeNowModal } from "@/stakefish/app/components/Modals/StakeNowModal";

import { Container } from "./components/Container/Container";
import { Activity } from "./components/Delegations/Activity";
import { Header } from "./components/Header/Header";
import { PersonalBalance } from "./components/PersonalBalance/PersonalBalance";
import { Stats } from "./components/Stats/Stats";

const Home = () => {
  useEffect(() => {
    initBTCCurve();
  }, []);

  //todo: move later from here
  const [showSfStakeNowModal, setShowSfStakeNowModal] = useState(true);

  return (
    <>
      <Header />

      <Container
        as="main"
        className="-mt-[10rem] md:-mt-[6.5rem] flex flex-col gap-12 md:gap-16 pb-16"
      >
        <Stats />
        <PersonalBalance />
        <StakeNowModal
          open={showSfStakeNowModal}
          onClose={() => setShowSfStakeNowModal(false)}
        />
        <Activity />
      </Container>
    </>
  );
};

export default Home;
