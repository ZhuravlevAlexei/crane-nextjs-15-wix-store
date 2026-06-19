import { env } from "@/env";
import {
  backInStockNotifications,
  checkout,
  currentCart,
  orders,
  recommendations,
} from "@wix/ecom";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { reviews } from "@wix/reviews";
// import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, products, productsV3 } from "@wix/stores";
import { categories } from "@wix/categories";

// export function getWixClient(tokens: Tokens | undefined) {
export function getWixClient() {
  return createClient({
    modules: {
      products,
      collections,
      productsV3,
      categories,
      currentCart,
      checkout,
      redirects,
      orders,
      recommendations,
      backInStockNotifications,
      reviews,
      members,
      files,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
      // tokens,
    }),
  });
}

export type WixClient = ReturnType<typeof getWixClient>;
