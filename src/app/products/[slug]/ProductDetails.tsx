"use client";

import { useState } from "react";
import { productsV3 } from "@wix/stores";

import WixImage from "@/components/WixImage";
import Badge from "@/components/ui/badge";
import ProductOptions from "./ProductOptions";

import { checkInStock, convertWixImageUrl, findVariant } from "@/lib/utils";
import ProductPrice from "./ProductPrice";

interface ProductDetailsProps {
  product: productsV3.V3Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.options
      ?.map((option) => ({
        [option._id || ""]:
          option.choicesSettings?.choices?.[0]?.choiceId || "",
      }))
      .reduce((acc, option) => ({ ...acc, ...option }), {}) || {},
  );

  const selectedVariant = findVariant(product, selectedOptions);

  // const inStock = checkInStock(product, selectedOptions);

  const mainImage = product.media?.main;
  const productUrl = convertWixImageUrl(mainImage?.image || "");

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <div className="basis-2/5">
        <WixImage
          mediaIdentifier={productUrl || ""}
          alt={mainImage?.altText ?? undefined}
          width={1000}
          height={1000}
          className="sticky top-0"
        />
      </div>
      <div className="basis-3/5 space-y-5">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          {product.brand && (
            <div className="text-muted-foreground">{product.brand.name}</div>
          )}
          {product.ribbon && (
            <Badge className="block">{product.ribbon.name}</Badge>
          )}
        </div>
        {product.plainDescription && (
          <div
            dangerouslySetInnerHTML={{ __html: product.plainDescription }}
            className="prose dark:prose-invert"
          />
        )}
        <ProductPrice selectedVariant={selectedVariant} />
        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        {/* <div>
          Selected options:
          <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
        </div>
        <div>
          Selected variant:
          <pre>{JSON.stringify(selectedVariant, null, 2)}</pre>
        </div> */}
      </div>
    </div>
  );
}
