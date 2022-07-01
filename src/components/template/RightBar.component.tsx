import { SubredditRow } from '@@components';
import { useQuery } from '@apollo/client';
import { GET_SUBREDDITS_WITH_LIMIT } from 'graphql/queries';
import React from 'react'

const RightBar = () => {

    const { data, error } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
        variables: {
            limit: 10
        }
    })

    const subreddits: Subreddit[] = data?.getSubredditListLimit;

    return (
        <>
            <div className="top-36 mx-5 hidden h-fit min-w-[300px]
                        rounded-md border border-gray-300 bg-white lg:inline">
                <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>

                {/* List subreddits */}
                <div>
                    {subreddits?.map((subreddit, i) => (
                        <SubredditRow
                            index={i}
                            key={subreddit.id}
                            topic={subreddit.topic} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default RightBar