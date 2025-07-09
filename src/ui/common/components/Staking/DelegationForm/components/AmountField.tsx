import { NumberField } from "@babylonlabs-io/core-ui";

import { Label } from "@/ui";

import { getNetworkConfigBTC } from "@/ui/common/config/network/btc";
import { satoshiToBtc } from "@/ui/common/utils/btc";

interface AmountFieldProps {
  min?: number;
  max?: number;
}

const { coinSymbol } = getNetworkConfigBTC();

export function AmountField({ min = 0, max = 0 }: AmountFieldProps) {
  const label = (
    <div className="flex flex-1 justify-between items-center">
      <Label>Amount</Label>
      <Label>
        min/max: {satoshiToBtc(min)}/{satoshiToBtc(max)} {coinSymbol}
      </Label>
    </div>
  );

  return (
    <NumberField
      name="amount"
      controlClassName="mb-6 [&_.bbn-input]:py-2.5 [&_.bbn-form-control-title]:mb-1 [&_.bbn-input-field]:text-base"
      label={label}
      placeholder={coinSymbol}
    />
  );
}
