import { notFound } from "next/navigation";
import { getPrpductsBySlug } from "@/wix-api/products";
import ProductDetails from "./ProductDetails";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const product = await getPrpductsBySlug(slug);

  if (!product?._id) return notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
}
