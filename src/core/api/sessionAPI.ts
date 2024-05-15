import express { Request, Response} from 'express'

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ username: {req.session.username ? req.session.username : null}})
})
app.delete('/', (req: Request, res: Response) => {
    req.session = null
    return res.status(200).json({ succed: true })
})

export default app