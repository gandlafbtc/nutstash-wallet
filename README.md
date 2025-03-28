⚠️ don't be reckless!
This app is in early development and most likely buggy. It does handle real sats though, so be sure to use only amounts that are small enough to lose.

# Nutstash wallet

A multi platform cashu wallet

## Development

To run the project for development, follow these steps:

1. Clone this repository
2. Install dependencies with `pnpm install`
3. Run the app with `npm run dev`

### Translations

This project uses [inlang](https://inlang.com/) for translations. To add a new language, follow these steps:

1. Create a new file in the `messages` directory with the language code as the filename (e.g., `en.json`)
1. add locale shorthand in `project.inlang/settings.json` under locales array 
1. add locale shorthand and label in `src/lib/langs.ts`  
1. copy the contents of an existing translation file and modify it to fit translations.
1. compile the translations with `pnpm run compile:i18n`
