import { defineField, defineType } from '@sanity/types'

export const siteContentSchema = defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio (legacy)',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
    }),
    defineField({
      name: 'soloBio',
      title: 'Solo Bio',
      type: 'text',
      rows: 8,
      description: 'Used on the Press Kit page and Home page snippet.',
    }),
    defineField({
      name: 'bandBio',
      title: 'Band Bio',
      type: 'text',
      rows: 8,
      description: 'Used on the Press Kit page.',
    }),
    defineField({
      name: 'trioBio',
      title: 'Trio Bio',
      type: 'text',
      rows: 8,
      description: 'Used on the Press Kit page.',
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
