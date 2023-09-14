import { cleanEnv, str } from "envalid"

const env = cleanEnv(process.env, {
    PEXLS_API_KEY: str(),
})

export default env
