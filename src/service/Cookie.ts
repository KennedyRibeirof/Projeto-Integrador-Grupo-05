import { Cookies } from "../model/Cookie";

export class CookieService {
    lista: Cookies[] = [];

    constructor(public armazenamento: Cookies[]) {
        this.lista = armazenamento;
    }

    createCookie(cookie: {
        sabor: string;
        recheio: string;
        preco: number;
    }): Cookies {
        const uuid = crypto.randomUUID();
        const cookieCreated = new Cookies(
            uuid,
            cookie.sabor,
            cookie.recheio,
            cookie.preco
        );
        this.lista.push(cookieCreated);
        return cookieCreated;
    }

      getCookies(): Cookies[] {
            return this.lista;
    }
}