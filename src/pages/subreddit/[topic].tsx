import { Avatar, Feed, Meta, PostBox } from '@@components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const SubredditPage: NextPage = () => {
    const { query: { topic } } = useRouter();
    return (
        <>
            <Meta title={`${topic}`} />
            <div className={`h-24 bg-red-400 p-8`}>
                <div className="-mx-8 mt-10 bg-white">
                    <div className="flex mx-auto max-w-5xl items-center space-x-4 pb-3">
                        <div className="-mt-5">
                            <Avatar seed={topic as string} large />
                        </div>
                        <div className="py-2">
                            <h1 className="text-3xl font-semibold">Welcome to the r/{topic} subreddit</h1>
                            <p className="text-sm text-gray-400">r/{topic}</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-8 max-w-5xl pb-10">
                    <PostBox subreddit={topic as string} />
                    <Feed topic={topic as string} />
                </div>
            </div>
        </>
    )
}

export default SubredditPage