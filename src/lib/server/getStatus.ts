import { serverAuthority, tournamentKey } from "$lib/constants";
import { matchKey, type GameMatch } from "$lib/types/match";

async function getSchedule(): Promise<GameMatch[]> {
    const matchesResponse = await fetch(`http://${serverAuthority}/API/manager/getMatches?` + new URLSearchParams({
        tournamentKey,
    }));

    const matchRows: { key: string, team: string, ordinalNumber: number }[] = await matchesResponse.json();
    const matches: GameMatch[] = [];

    for (let i = 0; i < matchRows.length; i++) {
        const row = matchRows[i];
        
        const match = matches.find((m) => JSON.stringify(m.key) === JSON.stringify(matchKey(row.key)));

        if (match === undefined) {
            matches.push({
                key: matchKey(row.key),
                teams: [ parseInt(row.team.replace('frc', '')) ],
                ordinalNumber: row.ordinalNumber,
            })
        } else {
            match.teams.push(parseInt(row.team.replace('frc', '')));
        }
    }

    matches.sort((a, b) => a.ordinalNumber - b.ordinalNumber);

    return matches;
}

export { getSchedule };
