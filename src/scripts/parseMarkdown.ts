import DOMPurify from 'isomorphic-dompurify'
import { type MarkedOptions, marked } from 'marked'

export function getRenderer(
	renderLinksAsExternal = true,
	renderImages = false
) {
	const renderer = new marked.Renderer()
	function sanitize(str) {
		return str.replace(/&<"/g, function (m) {
			if (m === '&') return '&amp;'
			if (m === '<') return '&lt;'
			return '&quot;'
		})
	}

	renderer.heading = function (text, level) {
		return `<h${level}>${text}</h${level}>`
	}

	renderer.checkbox = function () {
		return ''
	}

	renderer.code = function () {
		return ''
	}

	renderer.del = function (text) {
		return text
	}

	if (renderLinksAsExternal) {
		renderer.link = function (href, title, text) {
			return `<a class="external" rel="noopener noreferrer" ${
				typeof title !== 'undefined' && title !== null
					? `title=${title}`
					: ''
			} href="${href}">${text} <i class="external-icon" aria-hidden="true"></i></a>`
		}
	}

	if (!renderImages) {
		renderer.image = function () {
			return ''
		}
	} else {
		let res = ''
		renderer.image = function (src, title, alt) {
			const parts = /(.*)\s+=\s*(\d*)\s*x\s*(\d*)\s*$/.exec(src)
			var url = src
			var height = undefined
			var width = undefined
			if (parts) {
				url = parts[1]
				height = parts[2]
				width = parts[3]
			}

			var html5Regex = /.+\.(wav|mp3|ogg|mp4|wma|webm|mp3)$/i
			var html5Match = src.match(html5Regex)

			if (html5Match && html5Match[1]) {
				const Html5 = {
					link: html5Match[0],
					extension: html5Match[1]
				}
				res = '<video'

				if (height) res += ' height="' + height + '"'
				if (width) res += ' width="' + width + '"'
				res +=
					' controls loop muted><source src="' +
					Html5['link'] +
					'" type="video/' +
					Html5['extension'] +
					'">'
				if (alt) res += sanitize(alt)
				res += '</video>'
			} else {
				res = '<img '
				if (height) res += ' height="' + height + '"'
				if (width) res += ' width="' + width + '"'
				res +=
					'src="' +
					sanitize(url) +
					'" decoding="async" loading="lazy"'
				if (alt) res += ' alt="' + sanitize(alt) + '"'
				if (title) res += ' title="' + sanitize(title) + '"'
				res += '>'
			}

			return res
		}
	}

	renderer.table = function () {
		return ''
	}

	return renderer
}

export function parseMarkdown(
	markdown: string,
	renderLinksAsExternal = true,
	renderImage = false,
	breaks = true
) {
	const markedOptions: MarkedOptions = {
		breaks,
		gfm: true,
		renderer: getRenderer(renderLinksAsExternal, renderImage)
	}

	const data = DOMPurify.sanitize(marked.parse(markdown, markedOptions))

	return data
}
