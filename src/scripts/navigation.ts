
abstract class Nav {
	protected togglers: NodeListOf<HTMLElement>
	protected navigator: HTMLElement
	protected opened: Boolean = false
	protected listenKey: Boolean

	/**
	 * Navigation controller
	 * @param togglers List of elements to toggle the nav
	 * @param navigator Navigator element
	 */
	constructor(
		togglers: NodeListOf<HTMLElement> | String,
		navigator: HTMLElement | String,
		protected openKey: string,
		protected closeKey: string,
		protected blockScroll: Boolean = false
	) {
		this.listenKey = true
		this.togglers = (
			typeof togglers == 'string'
				? document.querySelectorAll(togglers)
				: togglers
		) as NodeListOf<HTMLElement>
		this.navigator = (
			typeof navigator == 'string'
				? document.querySelector(navigator)
				: navigator
		) as HTMLElement
		;[].forEach.call(this.togglers, (el: HTMLElement) =>
			el.addEventListener('click', () => this.toggle(), {
				passive: true
			})
		)

		document.addEventListener('keydown', this.onKeyDown)
		document.addEventListener('keyup', this.onKeyUp)
	}

	protected onKeyDown = (e: KeyboardEvent): void => {
		this.shortcutHandle(e)
	}

	protected onKeyUp = (e: KeyboardEvent): void => {
		this.preventKeySpam(e)
	}

	protected focusOutHandle = (e: FocusEvent): void => {
		if (
			!this.navigator.contains(e.relatedTarget as HTMLElement) &&
			![].some.call(
				this.togglers,
				(el) => el === (e.relatedTarget as HTMLElement)
			) &&
			this.opened
		) {
			this.close()
		}
	}

	protected shortcutHandle = (e: KeyboardEvent): void => {
		let key = e.key,
			source = e.target as HTMLElement,
			exclude = ['input', 'textarea']
		if (
			!this.listenKey ||
			exclude.indexOf(source.tagName.toLowerCase()) > 0 ||
			(key != this.openKey && key != this.closeKey)
		)
			return
		e.preventDefault()
		this.listenKey = false

		if (key == this.openKey) {
			this.toggle()
		} else if (this.opened && key == this.closeKey) {
			this.close()
		}

		return
	}

	protected preventKeySpam = (e: KeyboardEvent) => {
		this.listenKey = true
	}

	public open(disableAutoFocus: boolean = false): void {
		if (this.opened) return
		if (this.blockScroll) document.body.classList.add('block-scroll')
		;[].forEach.call(this.togglers, (el: HTMLElement) => {
			if (el.ariaLabel)
				el.ariaLabel = el.dataset.labelClose || 'Close navigation'
			else if (el.dataset.tippyContent) {
				el.dataset.tippyContent =
					el.dataset.labelClose || 'Close navigation'
				;(el as any)?._tippy?.setContent(
					el.dataset.labelClose || 'Close navigation'
				)
			}
			el.classList.add('active')
		})

		this.navigator.classList.add('active')
		this.navigator.tabIndex = 0
		this.navigator.setAttribute('aria-hidden', 'false')
		this.navigator.addEventListener('focusout', this.focusOutHandle)
		if (!disableAutoFocus) this.navigator.focus()

		this.opened = true
	}

	public close(): void {
		if (!this.opened) return
		if (this.blockScroll) document.body.classList.remove('block-scroll')
		;[].forEach.call(this.togglers, (el: HTMLElement) => {
			if (el.ariaLabel)
				el.ariaLabel = el.dataset.labelOpen || 'Open navigation'
			else if (el.dataset.tippyContent) {
				el.dataset.tippyContent =
					el.dataset.labelOpen || 'Open navigation'
				;(el as any)?._tippy?.setContent(
					el.dataset.labelOpen || 'Open navigation'
				)
			}
			el.classList.remove('active')
		})

		this.navigator.classList.remove('active')
		this.navigator.tabIndex = -1
		this.navigator.setAttribute('aria-hidden', 'true')
		this.navigator.removeEventListener('focusout', this.focusOutHandle)
		this.navigator.blur()

		this.opened = false
	}

	abstract toggle(): void
}

class NavigationMenu extends Nav {
	public mode: 'scrollDown' | 'default' = 'default'
	protected targetSection: HTMLElement

	constructor(
		togglers: NodeListOf<HTMLElement> | String,
		navigator: HTMLElement | String,
		mode: 'scrollDown' | 'default',
		targetSection: HTMLElement | String
	) {
		super(togglers, navigator, 'e', 'Escape')
		this.changeMode(mode)
		this.targetSection = (
			typeof targetSection == 'string'
				? document.querySelector(targetSection)
				: targetSection
		) as HTMLElement
	}

	public changeMode(mode: 'scrollDown' | 'default'): void {
		if (this.opened) this.close()
		;[].forEach.call(this.togglers, (el: HTMLElement) => {
			const icon = el.querySelector('i') as HTMLElement
			icon.dataset.mode = mode
		})

		this.mode = mode
	}

	public toggle(): void {
		switch (this.mode) {
			case 'scrollDown':
				this.targetSection.scrollIntoView({
					behavior: 'smooth'
				})
				break
			default:
				this.opened ? this.close() : this.open()
				break
		}
	}
}

class NavigationScreen extends Nav {
	public toggle(): void {
		this.opened ? this.close() : this.open()
	}
}

export const navigationMenu = new NavigationMenu('#navigation-toggler', '.navigation-menu', 'default', '#about')
// export const navigationScreen = new NavigationScreen('.navigation-screen-button', '.navigation-screen', 'E', 'Escape', true)