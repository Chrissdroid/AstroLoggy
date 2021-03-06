import { defineConfig } from 'astro/config'
import { astroImageTools } from 'astro-imagetools'
import sitemap from '@astrojs/sitemap'

import { h } from 'hastscript'

// https://astro.build/config
export default defineConfig({
  site: 'https://astrologgy.info/',
  server: {
    port: 3000,
    trailingSlash: 'always'
  },
  experimental: {
    integrations: true
  },
  integrations: [sitemap(), astroImageTools],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'material-palenight',
      wrap: false
    },
    rehypePlugins: [
      'rehype-slug',
      'remark-smartypants',
      'remark-gfm',
      ['rehype-autolink-headings', {
        behavior: 'append',
        properties: { class: 'header-anchor', 'data-nosnippet': true, title: "Copy link to this element"},
        content: () => [h(null, '#')]
      }]
    ],
    remarkPlugins: [
      'remark-textr',
    ]
  },
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});