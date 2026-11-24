export const musicItem = {
  name: "musicItem",
  title: "Music Item",
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
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "time",
      title: "Time Tag",
      type: "string",
      description: "e.g. 18:58",
    },
    {
      name: "tags",
      title: "Tags",
      type: "string",
      description: "e.g. Brand identity · App UI/UX · Launch site",
    },
    {
      name: "sector",
      title: "Sector / Genre",
      type: "string",
    },
    {
      name: "result",
      title: "Result / Note",
      type: "string",
    },
    {
      name: "headline",
      title: "Headline",
      type: "text",
      rows: 2,
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "stills",
      title: "Gallery Stills",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "body",
      title: "Story Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
    {
      name: "featuredOnHome",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: true,
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
      subtitle: "year",
      media: "coverImage",
    },
  },
};
