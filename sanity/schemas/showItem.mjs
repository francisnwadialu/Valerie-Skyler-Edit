export const showItem = {
  name: "showItem",
  title: "Show Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "orderLabel",
      title: "Time / Order Label",
      type: "string",
      description: "e.g. 01, 19:58, 20:41, 20:58",
    },
    {
      name: "phase",
      title: "Phase / Tag",
      type: "string",
      description: "e.g. Prelude, Blue hour, Afterglow, Last light",
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "priceLabel",
      title: "Price Label",
      type: "string",
      description: "e.g. From €12,000",
    },
    {
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Details →",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "body",
      title: "Details Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "priceLabel",
      media: "coverImage",
    },
  },
};
