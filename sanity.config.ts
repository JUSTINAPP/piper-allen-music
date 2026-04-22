import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { showSchema } from './sanity/schemas/show'
import { lyricsSchema } from './sanity/schemas/lyrics'
import { pressQuoteSchema } from './sanity/schemas/pressQuote'
import { siteContentSchema } from './sanity/schemas/siteContent'

export default defineConfig({
  name: 'piper-allen-music',
  title: 'Piper Allen',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [showSchema, lyricsSchema, pressQuoteSchema, siteContentSchema],
  },
})
