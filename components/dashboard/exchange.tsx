import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { DollarSign, Repeat } from 'lucide-react'

const Exchange = () => {
  return (
    <div className='flex w-full items-center justify-center px-20 my-10'>
        <Card className='container mx-auto px-28 py-3 bg-transparent '>
            <CardContent className='p-2 bg-primary-foreground/10 rounded-sm flex flex-row shadow-sm shadow-secondary'>
                <div className='bg-primary-foreground/10 h-full w-[50%] rounded-sm flex flex-row justify-between items-center px-4 pr-10 py-4 '>
                    <div className='flex flex-row gap-2 items-center'>
                        <Image 
                            src={"/uos.jpg"}
                            alt='uos'
                            width={10}
                            height={10}
                            className='w-8 h-8 rounded-full'
                        />
                        <div className='flex flex-col'>
                            <p className='text-white text-xs font-semibold'>UOS</p>
                            <p className='text-white text-xs font-light'>Ultra</p>
                        </div>
                    </div>
                    <p className='text-white text-sm font-semibold'>1</p>
                </div>
                <div className='bg-transparent h-full w-[50%] rounded-sm flex flex-row justify-between items-center px-4 pl-10 py-4'>
                    <p className='text-white text-sm font-semibold'>0.063</p>
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='flex flex-col items-end'>
                            <p className='text-white text-xs font-semibold'>USD</p>
                            <p className='text-white text-xs font-light'>United States Dollars</p>
                        </div>
                        <div className='absolute left-[49%] p-2 rounded-full bg-orange-600'>
                            <Repeat 
                             size={20}
                                color='white'
                            />
                        </div>
                        <div
                            className="bg-muted-foreground p-2 rounded-full flex items-center justify-center"
                        >
                            <DollarSign 
                                size={20}
                                color='black'
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default Exchange