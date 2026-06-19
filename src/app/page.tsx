import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";

import banner from "@/assets/banner.jpg";
import { treeReference } from "@/lib/constants";
import { delay } from "@/lib/utils";
import { getWixClient } from "@/lib/wix-client.base";
import { getCategoryBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="bg-secondary flex items-center md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Fill the void in your heart
          </h1>
          <p>
            Tough day? Credit card maxed out? Buy some expensive stuff and
            become happy again!
          </p>
          <Button asChild>
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="Flow Shop Banner"
            className="h-full object-cover"
          />
          <div className="from-secondary absolute inset-0 bg-linear-to-r via-transparent to-transparent"></div>
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  await delay(1000);

  const wixClient = getWixClient();

  //УСТАРЕЛО изза того что коллекции больше не поддерживаются в Wix Stores V3
  // const {collection} =
  //   await wixClient.collections.getCollectionBySlug("featured-products");
  // if (!collection?._id) return null;

  // const featuredProducts = await wixClient.products
  //   .queryProducts()
  //   .hasSome("collectionIds", [collection._id])
  //   .descending("lastUpdated")
  //   .find();

  //ну и развитие через функцию, но пока неясно как быть с коллекциями
  // const { collection } = getCollectionBySlug("featured-products");
  //УСТАРЕЛО

  //через 2 дня разобрался в документации
  //новый вариант коллекций через категории
  const category = await getCategoryBySlug("featured-products");
  if (!category?._id) return null;

  const categoryId = String(category._id);
  const productsIds = await wixClient.categories.listItemsInCategory(
    categoryId,
    treeReference,
  );
  //сводим все id продуктов в один простой массив для фильтра
  //в продуктах каталога V3
  const catalogItemIds: string[] =
    productsIds.items?.flatMap((item) =>
      item.catalogItemId ? [item.catalogItemId] : [],
    ) || [];

  const featuredProducts = await queryProducts({ catalogItemIds });

  if (!featuredProducts?.products?.length) return null;

  return (
    <div className="space-y-5">
      <h2 className="text-2x1 font-bold">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-124 w-full" />
      ))}
    </div>
  );
}
