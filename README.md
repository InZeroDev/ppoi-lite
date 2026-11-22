# @inzero/ppoi-lite

A prettier plugin to organize imports using TypeScript language service API which is the same as using `Organize Imports` command in VS Code.

## Installation

```sh
npm install @inzero/ppoi-lite -D
```

```sh
pnpm add @inzero/ppoi-lite -D
```

## Notes

### Supported Extensions

The supported extensions are: `js`, `ts`, `jsx`, `tsx`.

### Caveat

This plugin overrides the `typescript`, `babel` and `babel-ts` parsers to use the `preprocess` hook. Which means, it's incompatible with other plugins that do the same. Only the last loaded plugin will work.

## Usage

Add the plugin in your `.prettierrc`:

```json
{
	// ...
	"plugins": ["@inzero/ppoi-lite"]
}
```

## Config

### organizeImportsMode

Controls how imports are organized:

- `removeUnused`: Remove unused imports only.
- `sortAndCombine`: Sort and combine imports.
- `all`: Removed unused, sort, and combine imports.

### organizeImportsTypeOrder

Controls how named type-only imports are organize:

- `inline`: Keep type imports alongside value imports.
- `first`: Place type imports before value imports.
- `last`: Place type imports after value imports.

## Changelog

[Changelog](https://github.com/InZeroDev/ppoi-lite/blob/HEAD/CHANGELOG.md)

## License

[MIT](https://github.com/InZeroDev/ppoi-lite/blob/HEAD/LICENSE)
