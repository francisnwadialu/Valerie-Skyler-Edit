export const signUpPlan = {
  name: "signUpPlan",
  title: "Sign Up Plan",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phaseLabel",
      title: "Phase Label",
      type: "string",
      description: "e.g. Phase I · Prelude",
    },
    {
      name: "price",
      title: "Price",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "timeline",
      title: "Timeline",
      type: "string",
      description: "e.g. 3 to 5 weeks",
    },
    {
      name: "features",
      title: "Features / Bullets",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Start with this",
    },
    {
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      initialValue: "/contact",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
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
      subtitle: "price",
      media: "coverImage",
    },
  },
};
