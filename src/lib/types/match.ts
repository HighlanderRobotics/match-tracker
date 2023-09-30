enum MatchType {
    Qualifier,
    Elimination,
}

const matchTypeShortNames = [
    {type: MatchType.Qualifier, shortName: 'qm'},
    {type: MatchType.Elimination, shortName: 'em'},
]

function matchType(shortName: string): MatchType | null {
    const type = matchTypeShortNames.find(t => t.shortName === shortName);

    if (type === undefined) return null;
    return type.type;
}

interface MatchKey {
    tournamentKey: string;
    type: MatchType;
    matchNumber: number;
}

function matchKey(keyString: string): MatchKey {
    const [ tournamentKey, match ] = keyString.split('_');

    return {
        tournamentKey,
        matchNumber: parseInt(match.match(/\d+/)?.[0]!),
        type: matchType(match.match(/[a-z]+/)?.[0]!)!,
    }
}

function localizedMatchKey(key: MatchKey): string {
    return `${matchTypeShortNames.find(t => t.type === key.type)?.shortName.toUpperCase()} ${key.matchNumber}`;
}

interface GameMatch {
    key: MatchKey;
    teams: number[];
    ordinalNumber: number;
}

export type { MatchType, MatchKey, GameMatch, };

export { matchType, matchKey, localizedMatchKey, };
