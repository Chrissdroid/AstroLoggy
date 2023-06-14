---
title: How i created this website
description: Steps i took to create this website and my approach to it
published_at: 2022-04-25
author:
  name: Alexis Balthazard
  url: /alexis-balthazard
---

Sometimes creating a new website can be a daunting task. Especially if you're doing everything from scratch. It can be time consuming and it can be hard to keep track of everything.

So, I decided to make this article to explain my approach and explain the steps I took to create this website.

## Project Creation

First, i'm using [Astro](//astro.build/), it's a free and open source tool that helps you to create a static website at a blazing fast speed.

Starting by creating a new project, i'm going to use the CLI tool `create-astro` created by the team behind Astro:

```bash
# using npm
$ npm init astro my-astro-project

# using yarn
$ yarn create astro my-astro-project
```

You can choose any templates that you like, for this project i created everything from scratch, so i'm not using any.

then installing all the dependencies:

```bash
# using npm
$ npm install

# using yarn
$ yarn
```

If you're new to Astro, you can read the [documentation](//astro.build/docs/getting-started) to learn more about it and how to use it, i'll not go into the details here.

## File Structure

Here is the file structure of this website (at the moment) and how i managed to have locales and translations:

```toml
astrologgy.info/
  ├── node_modules/
  ├── public/
  │   ├── favicon.ico
  │   └── robots.txt
  ├── src/
  │   │   # Pages of the website
  │   ├── pages/
  │   │   │   # Languages routes
  │   │   ├── [lang]/
  │   │   │   └── index.astro
  │   │   │
  │   │   │  # Home page (used for redirecting)
  │   │   └── index.astro
  │   │
  │   │   # Base Layouts for all pages
  │   ├── layouts/
  │   │   └── PageLayout.astro
  │   │
  │   │   # All translations files
  │   └── i18n/
  │       │   # List of available languages on the website
  │       ├── languages.json5
  │       │
  │       │   # Translation for the page at path "/index.html"
  │       └── index/
  │           ├── fr.json5
  │           └── en.json5
  │
  │   # Astro configuration
  ├── astro.config.mjs
  │   # Package definition with dependencies
  ├── package.json
  │   # TypeScript configuration
  └── tsconfig.json
```

As you can see, all pages have their own file in `src/pages/[lang]/`, and all translations are in `src/i18n/` at the same relative path.

I'm using json5 to be able to have more control and have a more readable file with easier syntax. But you can use any other format you want (json, yaml, etc). You just need to have the correct dependencies installed to use it and import it in your different pages.

Each routes are generated depending their `src/i18n/` folder, so you can have a page for each language specified here. That mean i can have my entire website in english and french, but i can also have a deutch version for a specific page. Depending if it's correctly specified in the `src/i18n/languages.json5` file.

```json
// src/i18n/languages.json5
{
  "en": {
    "name": "English",
    "code": "en",
    "dir": "ltr",
    "flag": "gb",
  },
  "fr": {
    "name": "Français",
    "code": "fr",
    "dir": "ltr",
    "flag": "fr",
  },
  "de": {
    "name": "Deutsch",
    "code": "de",
    "dir": "ltr",
    "flag": "de",
  }
}
```

> The `dir` property is used to specify the direction of the language, it can be `ltr` or `rtl`. Usefull if you want a arabic translation to be displayed correctly.

It's not used to generate the routes, only for the display of the language name and flag. Only the `code` property is used to specify the routes path (like `/fr/index.html`).

The layout is the base layout for all pages, it's the same for all languages. It avoid to have to duplicate code and make it easier to manage. With this layout, you can have a global header and footer, and a global sidebar for both `.astro` and `.md` files inside `src/pages/`.

## Automatic redirection

I'm not using server-side rendering (SSR) nor nginx/apache to redirect the home route to the correct language. This is because i don't want to have to deal with the server side configuration and the performance impact, pretty much everything is done client-side as it's supposed to be static.

So i'm using this code to redirect the home route to the correct language:

```astro
---
// src/pages/index.astro
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script is:inline define:vars={{url: Astro.request.url.origin}}>
    const languages = ['en', 'fr'];
    const language = navigator.language || navigator.userLanguage;
    const currentLanguage = languages.indexOf(language.substr(0, 2)) > -1 ? language.substr(0, 2) : 'en';

    window.location.replace(currentLanguage + '/');
  </script>
</body>
</html>
```

Here all the bases languages and titles are static but you can fetch thems from the frontmatter and inject them in the `<script>` tag.

You may want to have title and description for SEO purposes.

You can also use a `meta` tag to redirect the default language as fallback if javascript is disabled. Like this:

```html
  <meta http-equiv="refresh" content="5; url=en/">
```

> Here, the `5` is the number of seconds before the redirection. It's better to not setting it to `0` to avoid the redirection to happen immediately after the page is loaded and skip the redirection inside the `<script>` tag.

Some website generate every page path without the language and include this snipet inside so every page as a default url to automatically redirect, but i'm not using this approach because i don't want this behavior the way my website is built. If you want this, check out the [Astro's docs source code](https://github.com/withastro/docs/blob/main/src/pages/%5B...slug%5D.astro) which uses it for redirecting to every `en` pages.

## Final notes

Next time i'll explain how i've created the design system for my website light and dark themes. And adapt it to the user's preference.

Overall, I'm happy of the result and i'm happy to have a website that is fast and easy to use. Don't hesitate to [contact me](/en/contact) if you have any question or suggestion, i'm always open to discuss new ideas and new projects.

Have a nice day!
