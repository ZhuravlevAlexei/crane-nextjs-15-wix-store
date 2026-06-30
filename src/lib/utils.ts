import { media } from "@wix/sdk";
import { productsV3 } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getWixImageUrl(wixUrl: string) {
  const imageData = media.getImageUrl(wixUrl);

  return imageData.url;
  // устарело, но рабочее решение
  // const fileName = wixUrl.split("v1/")[1].split("/")[0];
  // return `https://static.wixstatic.com/media/${fileName}`;
}

export function getWixVideoUrl(wixVideoUrl: string) {
  const videoData = media.getVideoUrl(wixVideoUrl);

  return videoData.url;
}
export function getWixVideoThumbnailrUrl(wixVideoUrl: string) {
  const videoData = media.getVideoUrl(wixVideoUrl);

  return videoData.thumbnail;
  // устарело, но рабочее решение
  // const fileName = wixVideoUrl.split("#posterUri=")[1].split("&posterWidth")[0];
  // return `https://static.wixstatic.com/media/${fileName}`;
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "USD",
) {
  return Intl.NumberFormat("en", { style: "currency", currency }).format(
    Number(price),
  );
}

export function findVariant(
  product: productsV3.V3Product,
  selectedOptions: Record<string, string>,
) {
  return product.variantsInfo?.variants?.find((variant) => {
    // 1. Здесь return обязателен, так как это ранняя проверка (guard clause)
    if (!variant.visible) return false;

    // 2. Убираем фигурные скобки после ([key, value]) => чтобы сделать неявный return
    return Object.entries(selectedOptions).every(([key, value]) =>
      // 3. Метод .find() вернет объект или undefined.
      // Оборачиваем в Boolean(...) или используем !!, чтобы вернуть true/false для .every()
      Boolean(
        variant.choices?.find(
          (choice) =>
            choice.optionChoiceIds?.optionId === key &&
            choice.optionChoiceIds?.choiceId === value,
        ),
      ),
    );
  });
}

export function checkInStock(
  product: productsV3.V3Product,
  selectedOptions: Record<string, string>,
) {
  const variant = findVariant(product, selectedOptions);
  return variant
    ? variant?.inventoryStatus?.inStock
    : product.inventory?.availabilityStatus === "IN_STOCK";
}
