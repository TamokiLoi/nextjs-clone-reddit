import { useMutation } from '@apollo/client';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from 'graphql/queries';
import { useSession } from "next-auth/react";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import client from '../../../apollo-client';
import { ADD_POST, ADD_SUBREDDIT } from '../../../graphql/mutations';
import Avatar from "./Avatar.component";

type FormData = {
    postTitle: string,
    postBody: string,
    postImage: string,
    subreddit: string
}

type Props = {
    subreddit?: string
}

const PostBox = ({ subreddit }: Props) => {
    const { data: session } = useSession();

    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [GET_ALL_POSTS, 'getPostList'],
    });

    const [addSubreddit] = useMutation(ADD_SUBREDDIT);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>();

    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

    const onSubmit = handleSubmit(async (formData) => {
        let subredditCurrent = null;
        const notification = toast.loading('Creating new post...');
        try {
            // Query for the subreddit topic...
            const { data: { getSubredditListByTopic } } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: subreddit || formData.subreddit
                },
            })

            const subredditExists = getSubredditListByTopic.length > 0;

            if (!subredditExists) {
                // create subreddit...
                const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
                    variables: {
                        topic: formData.subreddit
                    }
                })
                subredditCurrent = newSubreddit;
            } else {
                // use existing subreddit...
                console.log(getSubredditListByTopic);
                subredditCurrent = getSubredditListByTopic[0];
            }

            const image = formData.postImage || '';
            const { data: { insertPost: newPost } } = await addPost({
                variables: {
                    body: formData.postBody,
                    image: image,
                    subreddit_id: subredditCurrent.id,
                    title: formData.postTitle,
                    username: session?.user?.name
                }
            })

            // After the post has added!
            setValue('postBody', '');
            setValue('postImage', '');
            setValue('postTitle', '');
            setValue('subreddit', '');

            toast.success('New Post Created!', { id: notification });
        } catch (error) {
            toast.error('Whoops something went wrong!', { id: notification });
        }
    })

    const renderFormInput = (title: string, placeholder: string, name: any, isRequired = false, type = 'text') => {
        return (
            <div className="flex items-center px-2">
                <p className="min-w-[90px]">{title}:</p>
                <input
                    {...register(name, { required: isRequired })}
                    type={type}
                    placeholder={placeholder}
                    className="m-2 flex-1 bg-blue-50 p-2 outline-none" />
            </div>
        )
    }

    return (
        <>
            <form
                onSubmit={onSubmit}
                className="top-20 z-50 rounded-md border border-gray-300 bg-white p-2">
                <div className="flex items-center space-x-3">
                    <Avatar />
                    <input
                        {...register('postTitle', { required: true })}
                        disabled={!session}
                        type="text"
                        placeholder={session ? subreddit ? `Create a post in r/${subreddit}` : 'Create a post by entering a title!' : 'Sign in to post'}
                        className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
                    />
                    <PhotographIcon
                        onClick={() => setImageBoxOpen(!imageBoxOpen)}
                        className={`h-6 cursor-pointer text-gray-300 ${imageBoxOpen && 'text-blue-300'}`} />
                    <LinkIcon className={`h-6 text-gray-300`} />
                </div>

                {!!watch('postTitle') && (
                    <div className="flex flex-col py-2">
                        {renderFormInput('Body', 'Text (optional)', 'postBody')}
                        {!subreddit && renderFormInput('Subreddit', 'i.e. reactjs', 'subreddit', true)}
                        {imageBoxOpen && renderFormInput('Image URL', 'Optional...', 'postImage')}
                    </div>
                )}

                {/* Form Errors */}
                {Object.keys(errors).length > 0 && (
                    <div className="space-y-2 p-2 text-red-500">
                        {errors.postTitle?.type === 'required' && (
                            <p>- A Post Title is required</p>
                        )}
                        {errors.subreddit?.type === 'required' && (
                            <p>- A Subreddit is required</p>
                        )}
                    </div>
                )}

                {!!watch('postTitle') && (
                    <button
                        type="submit"
                        className="w-full p-2 rounded-full bg-blue-400 text-white"
                    >
                        Create Post
                    </button>
                )}
            </form>
        </>
    )
}

export default PostBox