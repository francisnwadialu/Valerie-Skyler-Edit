export const faqItem = {
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    {
      name: "page",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Contact (/contact)", value: "contact" },
          { title: "Shows (/shows)", value: "shows" },
          { title: "Sign Up (/sign-up)", value: "sign-up" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "page",
    },
  },
};
