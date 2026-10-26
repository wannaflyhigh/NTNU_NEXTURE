import dotenv from 'dotenv'
import { createApp } from './app.js'
import { loadConfig } from './config.js'

dotenv.config({ path: '.env' })

const config = loadConfig()
const app = createApp(config)

app.listen(config.port, () => {
    console.info(`NTNU Nexture API listening on port ${config.port}`)
})
