import React from "react";
import Image from "next/image";

const PropertyImages = ({ images }: { images: string[] | undefined }) => {
  if (!images) return;
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            className="object-cover h-[400px] mx-auto rounded-xl"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
            loading="eager"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index + 1}
                className={`
                            ${
                              images.length === 3 && index === 2
                                ? "col-span-2"
                                : "col-span-1"
                            }    
                        `}
              >
                <Image
                  src={image}
                  className="object-cover h-[400px] w-full rounded-xl"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
