import type { ImagesReslts } from "../Models/Imgaes"

function getPageNumber(url: string) {
    const { searchParams } = new URL(url)
    return searchParams.get('page')
}

export default function getPrevNextPages(images: ImagesReslts) {

    let nextPage = images?.next_page ? getPageNumber(images.next_page) : null
    const prevPage = images?.prev_page ? getPageNumber(images.prev_page) : null

    const totalPages = images.total_results % images.per_page ? Math.ceil(images.total_results / images.per_page) : (images.total_results / images.per_page) + 1

    prevPage && (parseInt(prevPage) + 5) < totalPages ? nextPage = (parseInt(prevPage) + 5).toString() : null

    nextPage && parseInt(nextPage) >= totalPages ? nextPage = null : null

    return { prevPage, nextPage }
}
