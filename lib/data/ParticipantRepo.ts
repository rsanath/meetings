import Participant from "../models/Participant";
import {delay} from "../Util.js";


const data: Participant[] = require('./data.json');

export async function getParticipants(offset: number = 0,
                                      limit: number = 10): Promise<Participant[]> {
    await delay(1000);
    return data.slice(offset, (offset + limit));
}

export async function searchParticipants(query: string): Promise<Participant[]> {
    await delay(1000);
    if (query.length == 0) return [];
    const q = query.toLocaleLowerCase();
    return data.filter(p => {
        return p.name.toLocaleLowerCase().includes(q)
            || p.locality.toLocaleLowerCase().includes(query);
    });
}

export async function registerParticipant(params: Participant): Promise<void> {
    await delay(1000);
    data.unshift(params);
}
