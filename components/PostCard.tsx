import Image from 'next/image'
import React from 'react'

const PostCard = () => {
  return (
    <div className='flex flex-row'>
        <div className='flex flex-col'>
            <div className='flex flex-row'>Info
                <Image src='/avatar.jpg' alt='avatar' width={50} height={50} />
                <div>pos</div>
                <div>.</div>
                <div>post.</div>
            </div>

            <div>Post Title</div>
            <div>Post Description</div>
            <div className='flex flex-row'>
                <div>tags</div>
                <div>X min read Selected for you</div>
            </div>
        </div>
        <div>Image</div>
    </div>
  )
}

export default PostCard