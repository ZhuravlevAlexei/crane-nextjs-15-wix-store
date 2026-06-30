import Link from "next/link";
import WixImage from "./WixImage";
import { productsV3 } from "@wix/stores";

import { getWixImageUrl, formatCurrency } from "@/lib/utils";
import Badge from "./ui/badge";

interface ProductProps {
  product: productsV3.V3Product;
}

export default function Product({ product }: ProductProps) {
  // const mainImage = product.media?.itemsInfo?.items?.[0];
  // const productUrl = getWixImageUrl(mainImage?.image || "");

  const mainImage = product.media?.main;
  const productUrl = getWixImageUrl(mainImage?.image || "");

  return (
    <Link href={`/products/${product.slug}`} className="bg-card h-full border">
      <div className="relative overflow-hidden">
        <WixImage
          mediaIdentifier={productUrl || ""}
          alt={mainImage?.altText ?? undefined}
          width={700}
          height={700}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute right-3 bottom-3 flex flex-wrap items-center gap-2">
          {product.ribbon && <Badge>{product.ribbon.name}</Badge>}
          <Badge className="bg-secondary text-secondary-foreground font-semibold">
            {getFormattedPrice(product)}
          </Badge>
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

function getFormattedPrice(product: productsV3.V3Product) {
  const minPrice = product.actualPriceRange?.minValue?.amount;
  const maxPrice = product.actualPriceRange?.maxValue?.amount;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice)}`;
  } else {
    return formatCurrency(minPrice);
  }
}
