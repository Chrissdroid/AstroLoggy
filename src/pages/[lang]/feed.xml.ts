import { createI18n } from '$/scripts/i18n'
import { readFileSync } from 'fs'
import rss, { type RSSFeedItem } from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import json5 from 'json5'

export const getStaticPaths = createI18n('defaults/page')

export const get: APIRoute = async function get(context) {
	const blog = await getCollection('blog')
	const { lang } = context.params
	const file = readFileSync(`./src/i18n/defaults/page/${lang}.json5`).toString()
	const translations = Object.create(json5.parse(file))

	const computeSlug = (slug: string) => {
		const [lang, ...ids] = slug.split('/')

		return {
			lang,
			id: ids.join('/'),
		}
	}

	const correctLangCode = lang === 'fr' ? 'fr-FR' : lang

	return rss({
		title: translations.rssTitle,
		description: translations.rssDescription,
		stylesheet: '/assets/rss/styles.xsl',
		site: context.site?.href || '',
		customData: `<language>${correctLangCode}</language>`,
		items: blog
			.filter(post => {
				const { lang: postLang } = computeSlug(post.slug)

				return postLang === lang
			})
			.map(post => {
				const { id } = computeSlug(post.slug)

				const item: RSSFeedItem = {
					title: post.data.title,
					pubDate: post.data.published_at,
					author: post.data.author.name,
					description: post.data.description,
					link: `/${lang}/blog/${id}/`,
				}

				return item
			}),
	})
}
