import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";
import { productsV3 } from "@wix/stores";

interface ProductOptionsProps {
  product: productsV3.V3Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div className="space-y-2.5">
      {product.options?.map((option) => (
        <fieldset key={option.name} className="space-y-1.5">
          <legend>
            <Label asChild>
              <span>{option.name}</span>
            </Label>
          </legend>
          <div className="flex flex-wrap items-center gap-1.5">
            {option.choicesSettings?.choices?.map((choice) => (
              <div key={String(choice.name)}>
                <input
                  type="radio"
                  id={String(choice.name)}
                  name={String(option.name)}
                  checked={
                    selectedOptions[option._id || ""] === choice.choiceId
                  }
                  onChange={() => {
                    setSelectedOptions({
                      ...selectedOptions,
                      [option._id || ""]: choice.choiceId || "",
                    });
                  }}
                  value={String(choice.name)}
                  className="peer hidden"
                />
                <Label
                  htmlFor={String(choice.name)}
                  className={cn(
                    "peer-checked:border-primary flex min-w-14 cursor-pointer items-center justify-center gap-1.5 border p-2",
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option._id || ""]: choice.choiceId || "",
                    }) && "opacity-50",
                    // cursor-not-allowed,
                  )}
                >
                  {choice.choiceType === "ONE_COLOR" && (
                    <span
                      className="size-4 rounded-full border"
                      style={{ backgroundColor: choice.colorCode }}
                    />
                  )}
                  <span>{choice.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
