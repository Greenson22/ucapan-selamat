import { BadgeVariant } from "@/components/elements/Badge";

export interface PhotoSlideItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  quote: string;
  badge: {
    icon: string;
    label: string;
    variant: BadgeVariant;
  };
}

export type PhotoSlide = PhotoSlideItem;
export type PhotoSlideData = PhotoSlideItem;
