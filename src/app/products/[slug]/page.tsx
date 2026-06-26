import { notFound } from "next/navigation";
import { getProductsBySlug } from "@/wix-api/products";
import ProductDetails from "./ProductDetails";
import { convertWixImageUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductsBySlug(slug);

  if (!product?._id) return notFound();

  const mainImage = product.media?.main;
  const productUrl = convertWixImageUrl(mainImage?.image || "");

  return {
    title: product.name,
    description: (product.plainDescription || "").slice(0, 198) + "...",
    openGraph: {
      images: productUrl
        ? [
            {
              url: productUrl,
              width: 200,
              height: 200,
              alt: product.media?.main?.altText || "",
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // await delay(3000);

  const product = await getProductsBySlug(slug);

  if (!product?._id) return notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
    </main>
  );
}
