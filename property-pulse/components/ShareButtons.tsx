import React from "react";
import type { Property } from "@/types/types";
import { FaShare } from "react-icons/fa";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const SharePropertyButton = ({ property }: { property: Property | null }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property?._id}`;
  return (
    <div>
      <h1 className="text-xl text-center font-bold mt-2">Share Property</h1>

      <div className="flex items-center justify-center gap-3 mt-2">
        <FacebookShareButton
          url={shareUrl}
          quote={`Check out this property for renting ${property?.name}`}
          hashtag={`${property?.type.replace(/\s/g, "")}`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={`Check out this property for renting ${property?.name}`}
          hashtags={[`${property?.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={`Check out this property for renting ${property?.name}`}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property?.name}
          body={`Check out this property for renting ${property?.name}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default SharePropertyButton;
