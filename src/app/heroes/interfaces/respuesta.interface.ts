import { Hero } from "./hero.interface";

export interface Respuesta {
    status : number;
    msg: string;
    data?: Hero[]
}