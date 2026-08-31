import type { Block } from "payload";

import { EmbedBlock } from "./Embed";
import { ImageGalleryBlock } from "./ImageGallery";
import { QuoteBlock } from "./Quote";
import { RichTextBlock } from "./RichText";

// The block library. Phase 1 ships the four blocks that news and blog bodies
// actually need; the event-page blocks (countdown, pricing table, schedule,
// rules, results board) arrive in phase 3, wrapping the components that already
// exist in src/components/ui/.
export const contentBlocks: Block[] = [RichTextBlock, ImageGalleryBlock, QuoteBlock, EmbedBlock];

export { RichTextBlock, ImageGalleryBlock, QuoteBlock, EmbedBlock };
