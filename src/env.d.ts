/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	// In case for .env typings
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}