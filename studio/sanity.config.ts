import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { showSchema } from './schemas/show'
import { lyricsSchema } from './schemas/lyrics'
import { pressQuoteSchema } from './schemas/pressQuote'
import { siteContentSchema } from './schemas/siteContent'

export default defineConfig({
  name: 'piper-allen-music',
  title: 'Piper Allen',
  projectId: 'ahosaeod',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [showSchema, lyricsSchema, pressQuoteSchema, siteContentSchema],
  },
})
