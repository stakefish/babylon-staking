import { useEffect, useState } from "react";

import { COMPLIANCE_CONFIG } from "./config";
import { getComplianceCookie, setComplianceCookie } from "./cookies";
import { detectSingaporeUser } from "./geolocationService";

export const useSingaporeCompliance = () => {
  const [isSingaporeUser, setIsSingaporeUser] = useState<boolean | null>(null);
  const [hasApprovedCompliance, setHasApprovedCompliance] = useState<
    boolean | null
  >(null);
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const checkSingaporeUser = async () => {
      setIsDetecting(true);
      try {
        const result = await detectSingaporeUser(COMPLIANCE_CONFIG.geolocation);
        setIsSingaporeUser(result.isSingapore);

        if (result.isSingapore) {
          const hasApproved = getComplianceCookie();
          setHasApprovedCompliance(hasApproved);

          if (!hasApproved) {
            setShouldShowDialog(true);
          }
        }
      } catch (error) {
        console.error("Error checking Singapore user status:", error);
        setIsSingaporeUser(false);
      } finally {
        setIsDetecting(false);
      }
    };

    checkSingaporeUser();
  }, []);

  const approveCompliance = () => {
    setComplianceCookie();
    setHasApprovedCompliance(true);
    setShouldShowDialog(false);
  };

  const closeDialog = () => {
    setShouldShowDialog(false);
  };

  return {
    isSingaporeUser,
    hasApprovedCompliance,
    shouldShowDialog,
    isDetecting,
    approveCompliance,
    closeDialog,
  };
};
