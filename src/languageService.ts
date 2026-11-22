import { iife, isUndefined, mapDefined } from "@inzero/ts-uf";
import ts from "@typescript/typescript6";
import path from "node:path";

export const createLanguageService = (filepath: string, source: string) => {
	const files = new Map([[filepath, source]]);

	const tsConfig = findTsConfig(filepath);
	const compilerOptions = getCompilerOptions(tsConfig);

	const host: ts.LanguageServiceHost = {
		getScriptFileNames: () => [...files.keys()],
		getScriptVersion: () => "0",
		getScriptSnapshot: (name) => mapDefined(files.get(name), ts.ScriptSnapshot.fromString),
		getCurrentDirectory: () => mapDefined(tsConfig, path.dirname) ?? process.cwd(),
		getCompilationSettings: () => compilerOptions,
		getDefaultLibFileName: ts.getDefaultLibFilePath,
		fileExists: (name) => files.has(name) || ts.sys.fileExists(name),
		readFile: (name) => files.get(name) ?? ts.sys.readFile(name),
		readDirectory: ts.sys.readDirectory,
	};

	const languageService = ts.createLanguageService(host);

	return languageService;
};

const cache = new Map<string, string | undefined>();

function findTsConfig(filepath: string): string | undefined {
	const dir = path.dirname(filepath);
	if (cache.has(dir)) return cache.get(dir);
	const result = ts.findConfigFile(dir, ts.sys.fileExists);
	return (cache.set(dir, result), result);
}

function getCompilerOptions(tsConfig: string | undefined) {
	const options = iife(() => {
		if (isUndefined(tsConfig)) return ts.getDefaultCompilerOptions();
		const config = ts.parseJsonConfigFileContent(
			ts.readConfigFile(tsConfig, ts.sys.readFile).config, // Added .config
			ts.sys,
			path.dirname(tsConfig),
		);
		return config.options;
	});

	options.allowJs = true;

	return options;
}
