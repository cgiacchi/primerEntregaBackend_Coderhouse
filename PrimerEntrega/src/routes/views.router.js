import { Router } from "express";

const router = Router();



router.get('/', (req, res) => {
    const data={
        firstName:'Carlos'
    }
    res.status(200).render('index', data)
}
)
export default router;