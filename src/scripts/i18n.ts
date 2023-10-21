import type { GetStaticPaths } from 'astro'
import json5 from 'json5'

const languages = ['en', 'fr'].sort((a, b) => a.localeCompare(b))

export function createI18n(slug: string, langs = languages): GetStaticPaths {
	return async () => {
		return await Promise.all(
			langs.map(async (lang) => {
				const file = await Bun.file(
					`./src/i18n/${slug}/${lang}.json5`
				).text()

				return {
					params: {
						lang
					},
					props: {
						translations: Object.create(json5.parse(file)),
						langs
					}
				}
			})
		)
	}
}

export async function getTranslations(slug: string, lang: string) {
	return Object.create(
		json5.parse(await Bun.file(`./src/i18n/${slug}/${lang}.json5`).text())
	)
}
