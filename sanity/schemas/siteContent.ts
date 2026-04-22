import { defineField, defineType } from '@sanity/types'

export const siteContentSchema = defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'heroTagline' },
    prepare: ({ title }: { title?: string }) => ({
      title: 'Site Content',
      subtitle: title,
    }),
  },
})
