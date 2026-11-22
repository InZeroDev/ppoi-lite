import type { Parser, Plugin } from "prettier";
import { parsers as babelParsers } from "prettier/plugins/babel";
import { parsers as tsParsers } from "prettier/plugins/typescript.js";
import { options } from "./data.js";
import { organizeImports } from "./organizeImports.js";

const withPreprocessor = (parser: Parser): Parser => ({
	...parser,
	preprocess: async (code, options) =>
		organizeImports(parser.preprocess ? await parser.preprocess(code, options) : code, options),
});

const plugin: Plugin = {
	options,
	parsers: {
		typescript: withPreprocessor(tsParsers.typescript),
		babel: withPreprocessor(babelParsers.babel),
		"babel-ts": withPreprocessor(babelParsers["babel-ts"]),
	},
};

export default plugin;
