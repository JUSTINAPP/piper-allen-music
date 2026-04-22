import { defineField, defineType } from '@sanity/types'

export const pressQuoteSchema = defineType({
  name: 'pressQuote',
  title: 'Press Quote',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'source', subtitle: 'quote' },
  },
})
