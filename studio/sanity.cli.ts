import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ahosaeod',
    dataset: 'production',
  },
})
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ahosaeod',
    dataset: 'production'
  },
  deployment: {
    appId: 'zamz7gmip97s20z6qw4gdd08',
  }
})