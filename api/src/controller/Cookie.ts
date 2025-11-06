import { Cookies } from "../model/Cookie";
import { app } from "../server"
import { CookieService } from "../service/Cookie";

export function CookieController() {
    const list: Cookies[] = [];
    const service = new CookieService(list);

    app.get("/cookies", (req, res) => { 
        const cookies = service.getCookies();
        res.json(cookies);
    });

    app.post("/cookies", (req, res) => {
        const cookieData = req.body;
        const newCookie = service.createCookie(cookieData);
        res.status(201).json(newCookie);
    });
}
