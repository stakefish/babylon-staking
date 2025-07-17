import { durationTillNow } from "@/ui/common/utils/time";

interface Inception {
  value: string;
}

export function Inception({ value }: Inception) {
  const currentTime = Date.now();

  return (
    <div className="order-3 lg:order-1 whitespace-pre-line break-words">
      {durationTillNow(value, currentTime)}
    </div>
  );
}
