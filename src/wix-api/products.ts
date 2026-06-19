import { getWixClient } from "@/lib/wix-client.base";

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
