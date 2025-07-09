import { Button, EmptyPrompt, PromptBox } from "@/ui";
import { useBTCWallet } from "@/ui/common/context/wallet/BTCWalletProvider";

export const DisconectedPrompt = () => {
  const { open } = useBTCWallet();

  return (
    <PromptBox className="py-[10vh]">
      <EmptyPrompt
        title="Connect to see the dashboard"
        cta={
          <Button application variant="outline" onClick={open}>
            Connect Wallets
          </Button>
        }
      />
    </PromptBox>
  );
};
