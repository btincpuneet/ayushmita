import React, { useState } from "react";
import { Share2, Copy } from "lucide-react";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const ShareButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center bg-[#FBF6DD] cursor-pointer gap-2 px-4 py-2 rounded-lg share-blog-btn"
      >
        <Share2 size={16} />
        Share
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[340px] relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <h3 className="text-center font-semibold mb-3">
              Share link
            </h3>

            {/* Clickable URL */}
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-blue-600 underline break-all mb-2"
            >
              {shareUrl}
            </a>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-md py-2 text-sm mb-4"
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy URL"}
            </button>

            {/* Social Icons */}
            <div className="flex justify-center gap-4">
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={44} round />
              </WhatsappShareButton>

              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={44} round />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={44} round />
              </TwitterShareButton>

              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={44} round />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
