import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { h } from 'hastscript'
import prefetch from '@astrojs/prefetch'
import compress from 'astro-compress'

import mdx from '@astrojs/mdx'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkTextr from 'remark-textr'
import rehypeSlug from 'rehype-slug'

// https://astro.build/config
export default defineConfig({
	site: 'https://astrologgy.info/',
	server: {
		port: 3000,
		trailingSlash: 'always',
	},
	experimental: {
		assets: true,
	},
	integrations: [
		sitemap(),
		prefetch(),
		mdx({
			extendMarkdownConfig: true,
			optimize: true,
		}),
		compress(),
	],
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: 'material-palenight',
			wrap: false,
		},
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'append',
					properties: {
						class: 'header-anchor',
						'data-nosnippet': true,
						title: 'Copy link to this element',
					},
					content: () => [h(null, '#')],
				},
			],
		],
		remarkPlugins: [remarkTextr],
	},
	vite: {
		ssr: {
			external: ['svgo'],
		},
	},
})
