import { treeReference } from "@/lib/constants";
import { getWixClient } from "@/lib/wix-client.base";

// УСТАРЕЛО
// export async function getCollectionBySlug(slug: string) {
//   const wixClient = getWixClient();
//   const { collection } = await wixClient.collections.getCollectionBySlug(slug);

//   return collection || null;
// }
// УСТАРЕЛО

export async function getCategoryBySlug(slug: string) {
  const wixClient = getWixClient();

  const { category } = await wixClient.categories.getCategoryBySlug(
    slug,
    treeReference,
    { fields: ["DESCRIPTION"] },
  );

  return category || null;
}
