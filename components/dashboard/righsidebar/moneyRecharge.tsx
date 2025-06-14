"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditCard, Wallet, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { motion, AnimatePresence } from 'framer-motion'

const MoneyRecharge = () => {
    const [amount, setAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [isProcessing, setIsProcessing] = useState(false)

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value)
        }
    }

    const calculateUOS = (amount: string) => {
        if (!amount) return '0'
        const usdAmount = parseFloat(amount)
        const uosAmount = usdAmount * 100 // 1 USD = 100 UOS (example rate)
        return uosAmount.toFixed(2)
    }

    return (
        <Card className="border-none shadow-sm shadow-secondary bg-primary/20">
            <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold text-white">Recharge your wallet</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex space-x-2 items-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image 
                                src={"/uos.jpg"}
                                alt='UOS'
                                width={10}
                                height={10}
                                className='rounded-full h-8 w-8'
                            />
                        </motion.div>
                        <div className="flex-1">
                            <Input 
                                placeholder='Enter amount in USD'
                                className='w-full py-2 px-4 bg-[#28274A] border-[#622C6C] text-white'
                                value={amount}
                                onChange={handleAmountChange}
                            />
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {amount && (
                            <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-white/70 mt-1"
                            >
                                You will receive: {calculateUOS(amount)} UOS
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-[#28274A]">
                            <TabsTrigger 
                                value="card"
                                className="data-[state=active]:bg-highlight text-white"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center"
                                >
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Card
                                </motion.div>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="crypto"
                                className="data-[state=active]:bg-highlight text-white"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center"
                                >
                                    <Wallet className="h-4 w-4 mr-2" />
                                    Crypto
                                </motion.div>
                            </TabsTrigger>
                        </TabsList>
                        <AnimatePresence mode="wait">
                            <TabsContent value="card" className="space-y-4 mt-4">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-2"
                                >
                                    <Input 
                                        placeholder="Card number"
                                        className="bg-[#28274A] border-[#622C6C] text-white"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input 
                                            placeholder="MM/YY"
                                            className="bg-[#28274A] border-[#622C6C] text-white"
                                        />
                                        <Input 
                                            placeholder="CVC"
                                            className="bg-[#28274A] border-[#622C6C] text-white"
                                        />
                                    </div>
                                </motion.div>
                            </TabsContent>
                            <TabsContent value="crypto" className="space-y-4 mt-4">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Select>
                                        <SelectTrigger className="bg-[#28274A] border-[#622C6C] text-white">
                                            <SelectValue placeholder="Select cryptocurrency" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#28274A] border-[#622C6C]">
                                            <SelectItem value="btc" className="text-white hover:bg-[#622C6C]">Bitcoin (BTC)</SelectItem>
                                            <SelectItem value="eth" className="text-white hover:bg-[#622C6C]">Ethereum (ETH)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </motion.div>
                            </TabsContent>
                        </AnimatePresence>
                    </Tabs>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Alert className="bg-[#28274A] border-[#622C6C]">
                            <AlertCircle className="h-4 w-4 text-white/70" />
                            <AlertTitle className="text-white">Important Information</AlertTitle>
                            <AlertDescription className="text-white/70 text-xs">
                                <ul className="list-disc list-inside space-y-1 mt-2">
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Minimum recharge amount: 10 USD
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        Maximum recharge amount: 10,000 USD
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        Processing time: 1-3 business days
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        Transaction fees: 2.5% for card payments
                                    </motion.li>
                                </ul>
                            </AlertDescription>
                        </Alert>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button 
                            className='w-full bg-[#AC46E7] text-white hover:bg-[#8757B2]'
                            disabled={!amount || parseFloat(amount) < 10 || isProcessing}
                            onClick={() => {
                                setIsProcessing(true)
                                // Simulate processing
                                setTimeout(() => setIsProcessing(false), 2000)
                            }}
                        >
                            {isProcessing ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                'Recharge wallet'
                            )}
                        </Button>
                    </motion.div>
                </div>
            </CardContent>
        </Card>
    )
}

export default MoneyRecharge