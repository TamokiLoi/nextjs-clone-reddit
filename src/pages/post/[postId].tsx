import { Avatar, Loading, Meta, Post, RightBar } from '@@components';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT } from 'graphql/mutations';
import { GET_POST_BY_POST_ID } from 'graphql/queries';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import TimeAgo from 'react-timeago';

type FormData = {
    comment: string
}

const PostPage: NextPage = () => {
    const { data: session } = useSession();
    const { query: { postId } } = useRouter();

    const [addComment] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId']
    })

    const { data, error } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: postId,
        }
    })

    const post: Post = data?.getPostByPostId[0];

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>();

    if (!post) return <Loading />;

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        if (!formData.comment) return;
        const notification = toast.loading('Posting your comment...');
        try {
            await addComment({
                variables: {
                    post_id: postId,
                    username: session?.user?.name,
                    text: formData.comment,
                }
            })
            setValue('comment', '');
            toast.success('Comment added successfully', { id: notification });
        } catch (error: any) {
            toast.success(error, { id: notification });
        }
    }

    return (
        <>
            <Meta title={`${post.title}`} />
            <div className="my-7 mx-auto max-w-5xl">
                <div className="flex">
                    <div className="w-full max-w-full min-w-0 min-h-screen">
                        <Post post={post} />

                        <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300
                            bg-white p-5 pl-16">
                            <p className="text-sm">
                                Comment as <span className="text-red-500">{session?.user?.name}</span>
                            </p>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col space-y-2">
                                <textarea
                                    {...register('comment')}
                                    disabled={!session}
                                    placeholder={session ? "What are you thoughts" : "Please sign in to comment"}
                                    className="h-24 rouded-md border border-gray-200 p-2 pl-4
                                        outline-none disabled:bg-gray-50"
                                />
                                {session && (
                                    <button
                                        disabled={!session}
                                        type="submit"
                                        className="rounded-full bg-red-500 p-3 font-semibold
                                        text-white disabled:bg-gray-200"
                                    >
                                        Comment
                                    </button>
                                )}
                            </form>
                        </div>

                        <div className="-my-5 rounded-b-md border border-t-0 border-gray-300
                            bg-white pb-10 px-10">
                            {/* <hr className="py-2" /> */}

                            {post?.comments.map((comment: any) => (
                                <div
                                    key={comment.id}
                                    className="relative flex items-center space-x-2 space-y-5"
                                >
                                    <hr className="absolute top-10 left-7 z-0 h-16 border" />
                                    <div className="z-50">
                                        <Avatar seed={comment?.username} />
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="py-2 text-xs text-gray-400">
                                            <span className="font-semibold text-gray-600">{comment.username}</span> •{' '}
                                            <TimeAgo date={comment.created_at} />
                                        </p>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <RightBar />
                </div>
            </div>
        </>
    )
}

export default PostPage