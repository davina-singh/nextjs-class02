import Link from 'next/link'
import {Metadata} from 'next'
import styles from 'src/components/SpotImage.module.css'
import {getSiblings} from '@/lib/siblings'


export const metadata: Metadata = {
    title: `Patch's Page`,
    description: 'All about Patch'
}

type siblingsSearchQuery = {
    sortBy: string
}

type siblingsType = {
    title: string,
    slug: string,
    content: string,
    category: string
}

let siblings = getSiblings()

function compareSiblings(a: siblingsType, b: siblingsType) {
    if (a.title < b.title) {
        return -1;
    } else if (a.title > b.title) {
        return 1;
    } else { 
        return 0
    }
}

export default function Page({searchParams} : {searchParams: siblingsSearchQuery}) {

    let sortedSiblings = [...siblings]

    if (searchParams.sortBy == 'asc') {
        sortedSiblings.sort(compareSiblings)
    } else if (searchParams.sortBy == 'desc') {
        sortedSiblings.sort(compareSiblings).reverse()
    }

    return (
    <div className={`${styles.spotImage}`}>
        <div className="flex min-h-screen flex-col items-center p-0">
            <h4 className="p-5 font-bold">This is my About Page</h4>
            <p className='text-center p-5'>Like my siblings, I am responsible and cute and I often fantasize about mauling the villain Dirty Dawson from the Thunderbolt television series. I look up to Thunderbolt and his father as my role models, especially after they rescued me. When I was attacked by Jasper and Horace, I was the only one of the puppies to attempt to fight back. I also hold a small rivalry with Lucky. Lucky and I are very similar in personality; however, there are a few differences. Lucky is confident and arrogant, compared to myself, who is insecure and humble. Lucky is apparently considered the favourite of the pups; this could be part of our rivalry.
            </p>
            <div className="p-5 text-center underline">{searchParams.sortBy}
            <br />
            <Link href='/about'>Remove the sort</Link>
            <br />
            <Link href='/about?sortBy=asc'>Sort by ascending</Link>
            <br />
            <Link href='/about?sortBy=desc'>Sort by descending</Link>
            <br />
            </div>
            {sortedSiblings.map((sibling, index) => {
                return (
                    <div key={index}>
                        <Link href={`/about/${sibling.slug}`}>{sibling.title}</Link>
                    </div>
                )
            })}
            <Link className="p-5" href='/'>{`<-- Go back`}</Link>
        </div>
    </div>
    )
}