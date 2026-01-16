"use client";

import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { useState, useRef, useEffect, createElement } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { slugifyHeading } from "@/lib/utils";
import { cn } from "@/lib/utils";

function HeadingWithCopy({
  tag,
  children,
  ...props
}: {
  tag: "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
} & ComponentPropsWithoutRef<"h2" | "h3" | "h4" | "h5" | "h6">) {
  const [copied, setCopied] = useState(false);
  const [isInArticle, setIsInArticle] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingId = slugifyHeading(children);

  useEffect(() => {
    if (headingRef.current) {
      const article = headingRef.current.closest("article");
      setIsInArticle(!!article);
    }
  }, []);

  const copyUrl = async () => {
    if (typeof window === "undefined") return;

    const url = `${window.location.origin}${window.location.pathname}#${headingId}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const Tag = tag;

  return createElement(
    "div",
    {
      className: "group relative inline-flex w-full items-center gap-2",
    },
    createElement(Tag, { id: headingId, ref: headingRef, ...props }, children),
    isInArticle &&
      createElement(
        "button",
        {
          onClick: copyUrl,
          className: cn(
            "touch-hitbox inline-flex items-center opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
          ),
          "aria-label": `Copy link to ${headingId}`,
          type: "button",
        },
        copied
          ? createElement(Check, {
              className: "size-4 text-muted-foreground",
            })
          : createElement(LinkIcon, {
              className: "size-4 text-muted-foreground",
            })
      )
  );
}

export const H1 = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"h1">) => {
  return createElement("h1", props, children);
};

export const H2 = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) => {
  return createElement(HeadingWithCopy, { tag: "h2", children, ...props }, children);
};

export const H3 = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) => {
  return createElement(HeadingWithCopy, { tag: "h3", children, ...props }, children);
};

export const H4 = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"h4">) => {
  return createElement(HeadingWithCopy, { tag: "h4", children, ...props }, children);
};

export const H5 = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"h5">) => {
  return createElement(HeadingWithCopy, { tag: "h5", children, ...props }, children);
};

export const H6 = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"h6">) => {
  return createElement(HeadingWithCopy, { tag: "h6", children, ...props }, children);
};
