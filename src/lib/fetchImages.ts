import type { ImagesReslts } from "../Models/Imgaes"
import { ImagesSchemaWithPhotos } from "../Models/Imgaes"
import env from './env'

export default async function fetchImages(url: string): Promise<ImagesReslts | undefined> {
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: env.PEXLS_API_KEY
            }
        })
        if (!res.ok) throw new Error("Fetch Images error!\n")
        const imagesResults: ImagesReslts = await res.json()
        
        const parsedData = ImagesSchemaWithPhotos.parse(imagesResults)
        if (parsedData.total_results === 0) return undefined
    
        return parsedData
    } catch (e) {
        if (e instanceof Error) console.log(e.stack)
    }
}
