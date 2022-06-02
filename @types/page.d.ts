export interface OpenGraph {
	title?: string;
	description?: string;
	url?: string;
	type?: 'article' | 'website' | 'profile';
	site_name?: string;
	locale?: string;
	determiner?: string;
	image?: OpenGraphImage;
	audio?: OpenGraphAudio;
	video?: OpenGraphVideo;
}

export interface OpenGraphImage {
	url: string;
	secure_url?: string;
	width?: number;
	height?: number;
	type: string;
	alt: string;
}

export interface OpenGraphVideo {
	url: string;
	secure_url?: string;
	width?: number;
	height?: number;
	type: string;
}

export interface OpenGraphAudio {
	url: string;
	secure_url?: string;
	type: string;
}

export interface OpenGraphArticle extends OpenGraph {
	type: 'article';
	published_time: string;
	modified_time: string;
	expiration_time: string;
	author: string;
	section: string;
	tag: string[];
}

export interface OpenGraphProfile extends OpenGraph {
	type: 'profile';
	first_name?: string;
	last_name?: string;
	username?: string;
}

export interface OpenGraphWebsite extends OpenGraph {
	type: 'website';
}

export interface TwitterCard {
	card: 'summary' | 'summary_large_image' | 'app' | 'player';
	site: string;
	creator: string;
}

export interface Page {
	title: OpenGraph['title'];
	description: OpenGraph['description'];
	keywords?: string;
	copyright?: string;
	author?: string;
	themeColor?: string;
	og: OpenGraph | OpenGraphArticle | OpenGraphProfile;
	twitter?: TwitterCard;
}

export interface BreadcumbPropsItem {
	label: string;
	icon?: string;
	path?: string;
	type?: string;
	active?: boolean;
}

export interface BreadcumbProps {
	content: BreadcumbPropsItem[];
	style?: string;
}

export interface BreadcrumbPage extends Page {
	breadcrumb?: BreadcumbProps;
	icon?: string;
	roundIcon?: boolean;
}