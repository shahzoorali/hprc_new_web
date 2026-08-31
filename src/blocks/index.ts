import type { Block } from "payload";

import { EmbedBlock } from "./Embed";
import { ImageGalleryBlock } from "./ImageGallery";
import { QuoteBlock } from "./Quote";
import { RichTextBlock } from "./RichText";
import {
  CountdownBlock,
  CtaBlock,
  EventScheduleBlock,
  HeroVideoBlock,
  MediaTextBlock,
  PageHeroBlock,
  PricingTableBlock,
  ResultsBoardBlock,
  RulesBlock,
  StatsBlock,
  TimelineBlock,
} from "./event-blocks";

// Blocks offered for article bodies — news and blog posts. Deliberately smaller
// than the page set: an article does not need a countdown or a pricing table.
export const contentBlocks: Block[] = [
  RichTextBlock,
  ImageGalleryBlock,
  QuoteBlock,
  EmbedBlock,
  MediaTextBlock,
];

// The full set for event and marketing pages. Every entry except richText,
// mediaText, stats and cta wraps a component that already exists in
// src/components/ui/, so pages built from these render the same markup the
// hand-written ones do.
export const pageBlocks: Block[] = [
  PageHeroBlock,
  HeroVideoBlock,
  RichTextBlock,
  MediaTextBlock,
  StatsBlock,
  CountdownBlock,
  EventScheduleBlock,
  PricingTableBlock,
  RulesBlock,
  TimelineBlock,
  ResultsBoardBlock,
  ImageGalleryBlock,
  QuoteBlock,
  EmbedBlock,
  CtaBlock,
];

export {
  CountdownBlock,
  CtaBlock,
  EmbedBlock,
  EventScheduleBlock,
  HeroVideoBlock,
  ImageGalleryBlock,
  MediaTextBlock,
  PageHeroBlock,
  PricingTableBlock,
  QuoteBlock,
  ResultsBoardBlock,
  RichTextBlock,
  RulesBlock,
  StatsBlock,
  TimelineBlock,
};
