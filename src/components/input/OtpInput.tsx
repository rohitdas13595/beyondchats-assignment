"use client";

import { cn } from "@/lib/utils";
import { OTPInput, SlotProps } from "input-otp";

export function OtpInput(props: {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}) {
  //   const { value, onChange, autoFocus } = props;
  return (
    <OTPInput
      maxLength={6}
      containerClassName="group flex items-center has-[:disabled]:opacity-30"
      render={({ slots }) => (
        <div className="flex gap-4">
          <div className="flex">
            {slots.slice(0, 3).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
          <div className="flex">
            {slots.slice(3).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        </div>
      )}
      {...props}
    />
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-14 h-14 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-border border-gray-600 border-y border-r first:border-l first:rounded-l-md last:rounded-r-md",
        "group-hover:border-blue-400/80 group-focus-within:border-cta3/20",
        "outline outline-0 outline-blue-400/80",
        { "outline-2 outline-cta3": props.isActive }
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}

// Inspired by Stripe's MFA input.
function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-border" />
    </div>
  );
}
