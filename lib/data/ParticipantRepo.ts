import Participant from "../models/Participant";
import {delay} from "../Util.js";


const data = require('./data.json');

export async function getParticipants(offset: number = 0,
                                      limit: number = 10): Promise<Participant[]> {
    await delay(1000);
    return data.slice(offset, (offset + limit));
}
