import { Box, Button, Checkbox, Dialog } from "@/ui";
import { useState } from "react";

import { useSingaporeCompliance } from "./useSingaporeCompliance";

export const ComplianceDialog = () => {
  const { shouldShowDialog, approveCompliance, closeDialog, isDetecting } =
    useSingaporeCompliance();
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProceed = async () => {
    if (!isChecked) return;

    setIsSubmitting(true);
    try {
      approveCompliance();
    } catch (error) {
      console.error("Error approving compliance:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (shouldShowDialog) {
      return;
    }
    closeDialog();
  };

  // Don't render dialog while detecting location
  if (isDetecting) {
    return null;
  }

  return (
    <Dialog.Root open={shouldShowDialog} onOpenChange={handleClose}>
      <Dialog.Content
        title={undefined}
        hideCloseButton={shouldShowDialog}
        innerClassName="max-w-[392px] flounder:w-[392px] flounder:p-4"
      >
        <Box className="pt-2">
          <Box className="space-y-4">
            <Box flex className="gap-2">
              <img src="/sg.svg" alt="compliance-icon" width={20} height={20} />
              <h5 className="text-h5 text-balance">Singapore Service Notice</h5>
            </Box>

            <Box className="rich-text *:text-callout text-itemPrimaryHighlight *:text-pretty *:font-sans">
              <p>
                We believe you may be accessing our Services in Singapore. In
                Singapore, only institutional clients and accredited investors,
                as defined by the Monetary Authority of Singapore, may use our
                Services.
              </p>
              <p>
                By accessing and using our Services, you represent and warrant
                that you are an institutional client or an accredited investor.
              </p>
              <p>
                More information on accredited investors can be found{" "}
                <a
                  href="https://stake.fish/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </p>
            </Box>
          </Box>

          <Box className="p-4 -mx-4 mt-4 -mb-4 border-t bg-backgroundSecondaryDefault border-itemSecondaryMute">
            <Checkbox
              id="compliance-checkbox"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked as boolean)}
              label="I acknowledge that I have read and understood the above information, and I confirm that I am an institutional
          client or accredited investor as defined by the Monetary Authority of Singapore."
              labelProps={{
                className: "font-sans font-normal text-callout text-balance",
              }}
              wrapperClassName="items-start [&>button]:mt-1"
            />
            <Button
              application
              size="md"
              className="mt-6 w-full"
              disabled={!isChecked || isSubmitting}
              onClick={handleProceed}
            >
              {isSubmitting ? "Processing..." : "Proceed to Staking Dashboard"}
            </Button>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};
