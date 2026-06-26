import { ResolvingViewport } from "next/types.js";
import { getWixClient } from "@/lib/wix-client.base";
import { cache } from "react";

interface QueryProductsFilter {
  catalogItemIds?: string[];
}

export async function queryProducts({ catalogItemIds }: QueryProductsFilter) {
  const wixClient = getWixClient();

  const featuredProducts = await wixClient.productsV3.queryProducts(
    {
      filter: {
        _id: {
          $in: catalogItemIds,
        },
      },
      // cursorPaging: {
      //   limit: 8,
      // },
    },
    { fields: ["MEDIA_ITEMS_INFO", "PLAIN_DESCRIPTION"] },
  );

  return featuredProducts;
}

export const getProductsBySlug = cache(async (slug: string) => {
  const wixClient = getWixClient();
  try {
    const { product } = await wixClient.productsV3.getProductBySlug(slug, {
      fields: ["MEDIA_ITEMS_INFO", "PLAIN_DESCRIPTION"],
    });

    if (!product || !product.visible) return null;

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
});
