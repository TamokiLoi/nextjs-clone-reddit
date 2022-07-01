import { Loading } from '@@components';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from 'graphql/queries';
import Post from './Post.component';

type Props = {
    topic?: string;
}

const Feed = ({ topic }: Props) => {
    const { data, error } = !topic ?
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery(GET_ALL_POSTS) :
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery(GET_ALL_POSTS_BY_TOPIC, {
            variables: { topic: topic }
        });
    const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

    if (!posts) return <Loading />;

    return (
        <div className="mt-5 space-y-4">
            {posts && posts.map((post: Post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Feed