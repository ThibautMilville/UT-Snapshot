import Image from 'next/image'
import React from 'react'

const CollectionComponent = () => {
  return (
    <div className='h-full w-full rounded-md flex-1 flex relative shadow-sm shadow-secondary'>
        <Image 
            src={"/nft3.jpg"}
            alt='ultratimes'
            width={10}
            height={10}
            className='h-full w-full rounded-md flex flex-1'
        />
        <div className='p-4 bg-primary/60 rounded-md flex flex-row items-center justify-center absolute w-[80%] bottom-[5%] left-[10%] gap-4'>
            <Image 
                src={"/ultra.png"}
                alt='ultratimes'
                width={10}
                height={10}
                className='h-10 w-10 rounded-md '
            />
            <p className='text-white text-sm font-bold'>UltraTimes Copyright 2025</p>
        </div>
    </div>
  )
}

export default CollectionComponent