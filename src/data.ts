import type { AreEqual, Assert } from "@inzero/ts-ut/other";
import ts from "@typescript/typescript6";
import type { SupportOptions } from "prettier";

const category = "PPOI";

type ModeChoice = Uncapitalize<keyof typeof ts.OrganizeImportsMode>;
const modeChoices = [
	{ value: "removeUnused", description: "Remove unused imports only" },
	{ value: "sortAndCombine", description: "Sort and combine imports" },
	{ value: "all", description: "Remove unused, sort, and combine imports" },
] satisfies { value: ModeChoice; description: string }[];
{
	// Make sure all choices are present and valid.
	type Check = Assert<AreEqual<(typeof modeChoices)[number]["value"], ModeChoice>>;
}

type TypeOrderChoice = ts.OrganizeImportsTypeOrder;
const typeOrderChoices = [
	{ value: "inline", description: "Keep type imports alongside value imports." },
	{ value: "first", description: "Place type imports before value imports." },
	{ value: "last", description: "Place type imports after value imports." },
] satisfies { value: TypeOrderChoice; description: string }[];
{
	// Make sure all choices are present and valid.
	type Check = Assert<AreEqual<(typeof typeOrderChoices)[number]["value"], TypeOrderChoice>>;
}

export const options: SupportOptions = {
	organizeImportsMode: {
		category,
		type: "choice",
		choices: modeChoices,
		description: "Controls how imports are organized.",
	},
	organizeImportsTypeOrder: {
		category,
		type: "choice",
		choices: typeOrderChoices,
		description: "Controls how named type-only imports are organized.",
	},
};
