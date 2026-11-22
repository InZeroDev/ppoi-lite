import type { ParserOptions } from "prettier";
import { createLanguageService } from "./languageService.js";
import { getMode, getTypeOrder } from "./utils.js";

export const organizeImports = (source: string, options: ParserOptions): string => {
	const langSer = createLanguageService(options.filepath, source);

	const mode = getMode(options.organizeImportsMode);
	const organizeImportsTypeOrder = getTypeOrder(options.organizeImportsTypeOrder);

	const changes =
		langSer.organizeImports(
			{ fileName: options.filepath, type: "file", mode },
			{},
			{ organizeImportsTypeOrder },
		)[0]?.textChanges ?? [];

	return changes.reduceRight((source, change) => {
		const { newText } = change;
		const { start, length } = change.span;
		const end = start + length;

		const left = source.slice(0, start);
		const right = source.slice(end);

		return `${left}${newText}${right}`;
	}, source);
};
