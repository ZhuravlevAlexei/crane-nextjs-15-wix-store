import { productsV3 } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
import { convertWixImageUrl } from "@/lib/utils";

interface ProductProps {
  product: productsV3.V3Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.itemsInfo?.items?.[0];

  const productUrl = convertWixImageUrl(mainImage?.image || "");

  return (
    <Link href={`/shop/${product.slug}`} className="h-full border">
      <div className="relative overflow-hidden">
        <WixImage
          // mediaIdentifier={mainImage?.url}
          mediaIdentifier={productUrl || ""}
          alt={mainImage?.altText ?? undefined}
          width={700}
          height={700}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute right-3 bottom-3 flex flex-wrap items-center gap-2">
          here
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.plainDescription || "" }}
        />
      </div>
    </Link>
  );
}
