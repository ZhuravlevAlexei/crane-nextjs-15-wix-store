import { formatCurrency } from "@/lib/utils";
import { productsV3 } from "@wix/stores";

interface ProductPriceProps {
  // product: productsV3.V3Product;
  selectedVariant: productsV3.Variant | undefined;
}

export default function ProductPrice({
  // product,
  selectedVariant,
}: ProductPriceProps) {
  const actualPrice = selectedVariant?.price?.actualPrice?.amount || 0;
  if (!actualPrice) return null;

  const compareAtPrice = selectedVariant?.price?.compareAtPrice?.amount || 0;

  const hasDiscount = actualPrice < compareAtPrice;

  return (
    <div className="flex items-center gap-2.5 text-xl font-bold">
      {hasDiscount && (
        <span className="text-muted-foreground line-through">
          {formatCurrency(compareAtPrice)}
        </span>
      )}
      <span>{formatCurrency(actualPrice)}</span>
    </div>
  );
}
