import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertWixImageUrl(wixUrl: string) {
  const fileName = wixUrl.split("v1/")[1].split("/")[0];

  return `https://static.wixstatic.com/media/${fileName}`;
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "USD",
) {
  return Intl.NumberFormat("en", { style: "currency", currency }).format(
    Number(price),
  );
}
