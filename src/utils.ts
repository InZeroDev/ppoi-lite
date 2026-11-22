import { hasKey, isOneOf, isString } from "@inzero/ts-uf";
import type { AreEqual, Assert } from "@inzero/ts-ut/other";
import ts from "@typescript/typescript6";

export const modeChoices = {
	removeUnused: ts.OrganizeImportsMode.RemoveUnused,
	sortAndCombine: ts.OrganizeImportsMode.SortAndCombine,
	all: ts.OrganizeImportsMode.All,
} satisfies ChoicesMap;
// Make sure all options are present and have the correct value.
type ChoicesMap = {
	[P in keyof typeof ts.OrganizeImportsMode as Uncapitalize<P>]: (typeof ts.OrganizeImportsMode)[P];
};

export const getMode = (modeOpt: unknown) => {
	if (!isString(modeOpt)) return;

	if (hasKey(modeChoices, modeOpt)) return modeChoices[modeOpt];
};

export const typeOrderChoices = ["inline", "first", "last"] satisfies ts.OrganizeImportsTypeOrder[];
{
	// Make sure no choices are missing.
	type Check = Assert<AreEqual<(typeof typeOrderChoices)[number], ts.OrganizeImportsTypeOrder>>;
}

export const getTypeOrder = (typeOrderOpt: unknown) => {
	return isOneOf(typeOrderOpt, typeOrderChoices) ? typeOrderOpt : undefined;
};
