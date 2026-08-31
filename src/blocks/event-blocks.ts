import type { Block, Field } from "payload";

import { imageFields } from "../fields/image";

// Blocks that wrap components already living in src/components/ui/. Each maps
// one-to-one onto that component's props, so the rendered output is the same
// markup the hand-built event pages produce today — only the data source moves.

const actionFields: Field[] = [
  {
    name: "actions",
    type: "array",
    labels: { singular: "Button", plural: "Buttons" },
    maxRows: 3,
    fields: [
      { name: "label", type: "text", required: true },
      { name: "href", type: "text", required: true },
      {
        name: "variant",
        type: "select",
        defaultValue: "primary",
        options: [
          { label: "Solid", value: "primary" },
          { label: "Outline", value: "outline" },
        ],
      },
    ],
  },
];

export const PageHeroBlock: Block = {
  slug: "pageHero",
  interfaceName: "PageHeroBlock",
  labels: { singular: "Page hero", plural: "Page heroes" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "background",
      type: "group",
      label: "Background image",
      fields: imageFields({ name: "image", altFallback: false }),
    },
    ...actionFields,
  ],
};

export const HeroVideoBlock: Block = {
  slug: "heroVideo",
  interfaceName: "HeroVideoBlock",
  labels: { singular: "Hero video", plural: "Hero videos" },
  fields: [
    {
      name: "videoUrl",
      type: "text",
      required: true,
      admin: { description: "YouTube URL. The component extracts the id itself." },
    },
    {
      name: "fallback",
      type: "group",
      label: "Fallback image",
      fields: imageFields({ name: "image", altFallback: false }),
    },
    { name: "imageAlt", type: "text" },
  ],
};

export const CountdownBlock: Block = {
  slug: "countdown",
  interfaceName: "CountdownBlock",
  labels: { singular: "Countdown", plural: "Countdowns" },
  fields: [
    { name: "heading", type: "text" },
    {
      name: "targetDate",
      type: "date",
      required: true,
      admin: {
        date: { pickerAppearance: "dayAndTime" },
        description: "Counts down to this moment, then shows zeros.",
      },
    },
  ],
};

export const PricingTableBlock: Block = {
  slug: "pricingTable",
  interfaceName: "PricingTableBlock",
  labels: { singular: "Pricing table", plural: "Pricing tables" },
  fields: [
    { name: "heading", type: "text", required: true },
    {
      name: "rows",
      type: "array",
      minRows: 1,
      required: true,
      admin: {
        description: "The GST and Total columns only appear if at least one row fills them in.",
      },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "40%" } },
            { name: "price", type: "text", required: true, admin: { width: "20%" } },
            { name: "gst", type: "text", admin: { width: "20%" } },
            { name: "total", type: "text", admin: { width: "20%" } },
          ],
        },
      ],
    },
  ],
};

export const EventScheduleBlock: Block = {
  slug: "eventSchedule",
  interfaceName: "EventScheduleBlock",
  labels: { singular: "Schedule", plural: "Schedules" },
  fields: [
    {
      name: "schedule",
      type: "array",
      labels: { singular: "Day", plural: "Days" },
      minRows: 1,
      required: true,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "day",
              type: "text",
              required: true,
              admin: {
                width: "33%",
                description: "Day 1, Day 2 … this also selects the header image.",
              },
            },
            { name: "date", type: "text", required: true, admin: { width: "33%" } },
            { name: "dateFull", type: "text", required: true, admin: { width: "34%" } },
          ],
        },
        {
          name: "activities",
          type: "array",
          minRows: 1,
          fields: [
            {
              type: "row",
              fields: [
                { name: "time", type: "text", admin: { width: "25%" } },
                { name: "activity", type: "text", required: true, admin: { width: "45%" } },
                {
                  name: "type",
                  type: "select",
                  required: true,
                  defaultValue: "match",
                  admin: { width: "30%", description: "Sets the icon and colour." },
                  options: [
                    { label: "Arrival", value: "arrival" },
                    { label: "Practice", value: "practice" },
                    { label: "Match", value: "match" },
                    { label: "Ceremony", value: "ceremony" },
                    { label: "Hospitality", value: "hospitality" },
                    { label: "Media", value: "media" },
                    { label: "Final", value: "final" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const RulesBlock: Block = {
  slug: "rules",
  interfaceName: "RulesBlock",
  labels: { singular: "Rules / requirements", plural: "Rules sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    {
      name: "categories",
      type: "array",
      minRows: 1,
      required: true,
      fields: [
        { name: "category", type: "text", required: true },
        {
          name: "items",
          type: "array",
          minRows: 1,
          fields: [{ name: "text", type: "text", required: true }],
        },
      ],
    },
  ],
};

export const TimelineBlock: Block = {
  slug: "timeline",
  interfaceName: "TimelineBlock",
  labels: { singular: "Timeline", plural: "Timelines" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 1,
      required: true,
      fields: [
        { name: "year", type: "text", required: true },
        { name: "summary", type: "textarea", required: true },
      ],
    },
  ],
};

export const ResultsBoardBlock: Block = {
  slug: "resultsBoard",
  interfaceName: "ResultsBoardBlock",
  labels: { singular: "Results board", plural: "Results boards" },
  fields: [
    {
      name: "resultSet",
      type: "relationship",
      relationTo: "result-sets",
      required: true,
      admin: {
        description: "Which competition to show. Its classes come along automatically.",
      },
    },
  ],
};

export const StatsBlock: Block = {
  slug: "stats",
  interfaceName: "StatsBlock",
  labels: { singular: "Stats strip", plural: "Stats strips" },
  fields: [
    {
      name: "stats",
      type: "array",
      minRows: 1,
      maxRows: 6,
      required: true,
      fields: [
        {
          type: "row",
          fields: [
            { name: "value", type: "text", required: true, admin: { width: "40%" } },
            { name: "label", type: "text", required: true, admin: { width: "60%" } },
          ],
        },
      ],
    },
  ],
};

export const MediaTextBlock: Block = {
  slug: "mediaText",
  interfaceName: "MediaTextBlock",
  labels: { singular: "Image + text", plural: "Image + text blocks" },
  fields: [
    { name: "heading", type: "text" },
    { name: "body", type: "richText", required: true },
    {
      name: "media",
      type: "group",
      label: "Image",
      fields: imageFields({ name: "image" }),
    },
    {
      name: "imagePosition",
      type: "select",
      defaultValue: "right",
      options: [
        { label: "Image on the right", value: "right" },
        { label: "Image on the left", value: "left" },
      ],
    },
  ],
};

export const CtaBlock: Block = {
  slug: "cta",
  interfaceName: "CtaBlock",
  labels: { singular: "Call to action", plural: "Calls to action" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "description", type: "textarea" },
    ...actionFields,
  ],
};
