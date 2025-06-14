import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

const MoneySend = () => {
    return (
        <Card className="border-none shadow-sm shadow-secondary bg-primary/20">
            <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold text-white">Share UOS</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex space-x-2 items-center">
                        <div
                            className='bg-secondary p-2 rounded-md flex items-center justify-center'
                        >
                            <p className='text-xs text-white font-semibold'>To</p>
                        </div>
                        <Input 
                            placeholder='Enter receiver Id'
                            className='w-full py-2 px-4'
                        />
                    </div>
                    <div className="flex space-x-2 items-center">
                        <Image 
                            src={"/uos.jpg"}
                            alt='nft'
                            width={10}
                            height={10}
                            className='rounded-full h-8 w-8'
                        />
                        <Input 
                            placeholder='Enter amount'
                            className='w-full py-2 px-4'
                        />
                    </div>
                    <Button className='w-full' variant={"secondary"}>
                        Send Amount
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default MoneySend