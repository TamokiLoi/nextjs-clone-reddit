import { Ring } from '@uiball/loaders'

const Loading = () => {
    return (
        <>
            <div className="flex w-full items-center justify-center p-10 text-xl">
                <Ring size={50} color="#F87171" />
            </div>
        </>
    )
}

export default Loading