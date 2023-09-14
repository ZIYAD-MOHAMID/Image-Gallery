import type { ImagesReslts } from "../../Models/Imgaes"

import fetchImages from "@/lib/fetchImages"
import addBlurredDataUrls from "@/lib/getBase64"
import getPrevNextPages from "@/lib/getPrevNextPages"

import ImgContainer from "./ImgContainer"
import Footer from "./Footer"

type Props = {
    topic?: string | undefined,
    page?: string | undefined,
}
export default async function Gallery({ topic = 'curated', page }: Props) {
    let url
    let mainUrl: string = 'https://api.pexels.com/v1/'
    
    topic === 'curated' && page ? url = `${mainUrl}curated?page=${page}` : topic === 'curated' ? url = `${mainUrl}curated` : !page ? url = `${mainUrl}search?query=${topic}` : url = `${mainUrl}search?query=${topic}&page=${page}` 

    const images: ImagesReslts | undefined = await fetchImages(url)


    if (!images || images.per_page === 0) {
        return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>
    }
    const photosWithBlur = await addBlurredDataUrls(images)
    const { prevPage, nextPage } = getPrevNextPages(images)
    const footerProps = { topic, page, nextPage, prevPage }
    return (
        <>
            <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
                {photosWithBlur.map(photo => (
                    <ImgContainer key={photo.id} photo={photo} />
                ))}
            </section>
            <Footer {...footerProps} />
        </>
    )
}
