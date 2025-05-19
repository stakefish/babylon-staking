"use client";

import { Button } from "@babylonlabs-io/core-ui";

import BitcoinBlock from "@/app/assets/bitcoin-block.svg";
import { Container } from "@/app/components/Container/Container";
import { Footer } from "@/app/componentsStakefish/Footer";
import { Header } from "@/app/componentsStakefish/SimpleHeader";

interface Props {
  title?: string;
  message?: string;
  image?: any;
}

export default function GenericError({
  title = "Oops! Something Went Wrong",
  message = `It looks like we’re experiencing a temporary issue on our end.
  Our team is already on it, and we’ll have things back to normal as soon as possible. 
  Please check back shortly, and thank you for your patience!`,
  image = BitcoinBlock,
}: Props) {
  return (
    <div className="h-full min-h-svh w-full flex flex-col justify-between">
      <Header />

      <section className="mt-[47px] relative overflow-hidden px-4 py-8 flounder:px-8 flounder:py-12 h-[calc(100vh-818px)] min-h-96 flounder:h-[calc(100vh-458px)]">
        <Container className=" mx-auto flex text-center flounder:max-w-3xl flounder:px-11 h-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="leading-none text-hero">{title}</h1>
            <p className="font-sans font-medium text-withLink text-body1 text-itemSecondaryDefault">
              {message}
            </p>
            <div className="mt-6">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.go()}
              >
                Back to homepage
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
