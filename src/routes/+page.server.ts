import { serverAuthority, tournamentKey } from '$lib/constants';
import { getSchedule } from '$lib/server/getStatus';
import { matchKey, type GameMatch } from '$lib/types/match';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const matches = await getSchedule();
    
    const isScoutedResponse = await fetch(`http://${serverAuthority}/API/manager/isScouted?` + new URLSearchParams({
        tournamentKey,
    }));

    const isScouted: { key: string, name: string | null }[] = await isScoutedResponse.json();

    let scoutedMatches: { match: GameMatch; scouted: boolean }[] = matches.map(match => ({
        match,
        scouted: isScouted.filter(a => JSON.stringify(matchKey(a.key)) == JSON.stringify(match.key) && a.name != null).length > 0,
    }));

    const nextMatch = scoutedMatches[scoutedMatches.findLastIndex(m => m.scouted) + 1];
    const nextTeamMatch = scoutedMatches.find(m => m.match.ordinalNumber >= nextMatch.match.ordinalNumber && m.match.teams.includes(8033)) || scoutedMatches[scoutedMatches.length - 1];
    const previousTeamMatch = scoutedMatches.findLast(m => m.match.ordinalNumber <= nextMatch.match.ordinalNumber && m.match.teams.includes(8033));

    return {
        previousTeamMatch,
        nextMatch,
        nextTeamMatch,
        timestamp: new Date(),
    };
}) satisfies PageServerLoad;