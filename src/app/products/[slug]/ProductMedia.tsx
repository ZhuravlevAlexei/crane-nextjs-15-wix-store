import { useState } from "react";
import { productsV3 } from "@wix/stores";

import WixImage from "@/components/WixImage";

import {
  cn,
  getWixImageUrl,
  getWixVideoThumbnailrUrl,
  getWixVideoUrl,
} from "@/lib/utils";

interface ProductMediaProps {
  media: productsV3.Media | undefined;
}

export default function ProductMedia({ media }: ProductMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState(
    media?.itemsInfo?.items?.[0],
  );

  if (!media?.itemsInfo?.items?.length) return null;

  let selectedImage = undefined;
  let selectedVideo = undefined;
  if (selectedMedia?.image) {
    selectedImage = getWixImageUrl(selectedMedia?.image || "");
  }
  if (selectedMedia?.video) {
    selectedVideo = getWixVideoUrl(selectedMedia?.video || "");
  }

  return (
    <div className="basis-2/5">
      <div className="bg-secondary aspect-square">
        {selectedImage ? (
          <WixImage
            mediaIdentifier={selectedImage}
            alt={selectedMedia?.altText ?? "Product image"}
            width={1000}
            height={1000}
          />
        ) : selectedVideo ? (
          <div className="flex size-full items-center bg-black">
            <video controls className="size-full">
              <source src={selectedVideo} type="video/mp4" />
            </video>
          </div>
        ) : null}
      </div>
      {media?.itemsInfo?.items?.length > 1 && (
        <div className="flex flex-wrap gap-5">
          {media.itemsInfo.items.map((mediaItem) => (
            <MediaPreview
              key={mediaItem._id}
              mediaItem={mediaItem}
              isSelected={mediaItem._id === selectedMedia?._id}
              onSelect={() => setSelectedMedia(mediaItem)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface MediaPreviewProps {
  mediaItem: productsV3.ProductMedia;
  isSelected: boolean;
  onSelect: () => void;
}

function MediaPreview({ mediaItem, isSelected, onSelect }: MediaPreviewProps) {
  let imageUrl = undefined;
  // let videoUrl = undefined;
  let posterUrl = undefined;
  let altText = undefined;
  if (mediaItem.image) {
    imageUrl = getWixImageUrl(mediaItem.image || "");
  }
  if (mediaItem.video) {
    // videoUrl = getWixVideoUrl(mediaItem.video || "");
    posterUrl = getWixVideoThumbnailrUrl(mediaItem.video || "");
  }
  if (mediaItem.altText) {
    altText = mediaItem.altText;
  }
  return (
    <div
      className={cn(
        "bg-secondary relative cursor-pointer",
        isSelected && "outline-primary outline outline-1",
      )}
    >
      <WixImage
        mediaIdentifier={imageUrl || posterUrl || ""}
        alt={altText || "Product image"}
        width={100}
        height={100}
        onMouseEnter={onSelect}
      />
    </div>
  );
}
