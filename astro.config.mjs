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
		prefetch(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
					fr: 'fr-CA',
				},
			},
			serialize(item) {
				switch (true) {
					// ignoring case
					case /error\/\d{3}/i.test(item.url):
						return undefined
					// top level pages
					case /https:\/\/astrologgy.info\/[^/]+\/$/i.test(item.url):
						item.priority = 0.9
						break
					// index page
					case /^https:\/\/astrologgy.info\/$/i.test(item.url):
						item.priority = 1
						break
				}
				return item
			},
		}),
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
