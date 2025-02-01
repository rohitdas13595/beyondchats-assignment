import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string | undefined | null) => {
  if (!name) {
    return "NU";
  }
  const splitName = name.split(" ");
  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  } else if (splitName.length === 1) {
    return splitName[0][0] + "U";
  } else {
    return "NU";
  }
};
