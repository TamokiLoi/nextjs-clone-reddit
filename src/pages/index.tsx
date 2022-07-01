import { Feed, Meta, PostBox, RightBar } from '@@components'
import type { NextPage } from 'next'

const Home: NextPage = () => {
    return (
        <>
            <Meta title={'Home - Reddit Clone'} />
            <div className="my-7 mx-auto max-w-5xl">

                <div className="flex">
                    <div>
                        <PostBox />
                        <Feed />
                    </div>

                    <RightBar />
                </div>
            </div>
        </>
    )
}

export default Home
