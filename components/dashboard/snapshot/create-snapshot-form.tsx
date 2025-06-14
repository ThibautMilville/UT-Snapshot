'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Search, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from 'next/image';

interface Token {
  id: string;
  name: string;
  image: string;
  attributes: Record<string, string>;
}

const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Token #1',
    image: 'https://picsum.photos/200/200?random=1',
    attributes: {
      rarity: 'Common',
      type: 'Character'
    }
  },
  {
    id: '2',
    name: 'Token #2',
    image: 'https://picsum.photos/200/200?random=2',
    attributes: {
      rarity: 'Rare',
      type: 'Weapon'
    }
  },
  {
    id: '3',
    name: 'Token #3',
    image: 'https://picsum.photos/200/200?random=3',
    attributes: {
      rarity: 'Epic',
      type: 'Armor'
    }
  },
  {
    id: '4',
    name: 'Token #4',
    image: 'https://picsum.photos/200/200?random=4',
    attributes: {
      rarity: 'Legendary',
      type: 'Accessory'
    }
  },
  {
    id: '5',
    name: 'Token #5',
    image: 'https://picsum.photos/200/200?random=5',
    attributes: {
      rarity: 'Common',
      type: 'Character'
    }
  },
  {
    id: '6',
    name: 'Token #6',
    image: 'https://picsum.photos/200/200?random=6',
    attributes: {
      rarity: 'Rare',
      type: 'Weapon'
    }
  }
];

export function CreateSnapshotForm() {
  const [step, setStep] = useState(1);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedTokens, setSelectedTokens] = useState<Token[]>([]);
  const [snapshotType, setSnapshotType] = useState<'full' | 'specific' | 'criteria'>('full');
  const [startDate, setStartDate] = useState<Date>();
  const [recurrence, setRecurrence] = useState('once');
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedOptions, setAdvancedOptions] = useState({
    notifyOnFailure: true,
    priority: 'normal',
    autoExport: false,
    exportFormat: 'csv',
    includeMetadata: true,
    includeImages: true,
    includeAttributes: true,
    includeHistory: false,
    groupByAttribute: '',
    sortBy: 'id',
    sortDirection: 'asc',
    enableRewards: false,
    rewardType: 'uos',
    rewardTopUsers: 15,
    rewardAmount: 100,
    rewardBasedOn: 'unique_holders',
    selectedUniqs: [] as string[],
    distributionMethod: 'equal' // 'equal' or 'weighted'
  });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [addedCriteria, setAddedCriteria] = useState<Array<{type: string, value: string}>>([]);

  const criteriaOptions = {
    rarity: ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'],
    type: ['Character', 'Weapon', 'Armor', 'Accessory', 'Pet'],
    armor: ['Light', 'Medium', 'Heavy', 'Mythic', 'Legendary'],
    weapon: ['Sword', 'Bow', 'Staff', 'Dagger', 'Axe'],
    background: ['Forest', 'Castle', 'Dungeon', 'Mountain', 'Ocean'],
    level: ['1-10', '11-20', '21-30', '31-40', '41-50'],
    power: ['1-100', '101-200', '201-300', '301-400', '401-500']
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleTokenSelect = (token: Token) => {
    if (!selectedTokens.find(t => t.id === token.id)) {
      setSelectedTokens([...selectedTokens, token]);
    }
  };

  const handleTokenRemove = (tokenId: string) => {
    setSelectedTokens(selectedTokens.filter(t => t.id !== tokenId));
  };

  const filteredTokens = mockTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Object.values(token.attributes).some(value =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getValueOptions = (attribute: string) => {
    switch (attribute) {
      case 'rarity':
        return ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];
      case 'type':
        return ['Character', 'Weapon', 'Armor', 'Accessory', 'Pet'];
      case 'armor':
        return ['Light', 'Medium', 'Heavy', 'Mythic', 'Legendary'];
      case 'weapon':
        return ['Sword', 'Bow', 'Staff', 'Dagger', 'Axe'];
      case 'background':
        return ['Forest', 'Castle', 'Dungeon', 'Mountain', 'Ocean'];
      case 'level':
        return ['1-10', '11-20', '21-30', '31-40', '41-50'];
      case 'power':
        return ['1-100', '101-200', '201-300', '301-400', '401-500'];
      default:
        return [];
    }
  };

  // Calculate total rewards
  const calculateTotalRewards = () => {
    if (advancedOptions.rewardType === 'uos') {
      return advancedOptions.rewardTopUsers * advancedOptions.rewardAmount;
    } else {
      return advancedOptions.rewardTopUsers * advancedOptions.selectedUniqs.length;
    }
  };

  // Calculate distribution per user
  const calculateDistributionPerUser = () => {
    if (advancedOptions.rewardType === 'uos') {
      return advancedOptions.rewardAmount;
    } else {
      return advancedOptions.selectedUniqs.length;
    }
  };

  // Calculate estimated cost
  const calculateEstimatedCost = () => {
    const baseFee = 10; // Base fee in UOS
    const processingFee = 5; // Processing fee per user
    const storageFee = 2; // Storage fee per UNIQ (if applicable)
    
    let total = baseFee;
    
    if (advancedOptions.rewardType === 'uos') {
      total += (processingFee * advancedOptions.rewardTopUsers);
    } else {
      total += (processingFee * advancedOptions.rewardTopUsers);
      total += (storageFee * advancedOptions.selectedUniqs.length * advancedOptions.rewardTopUsers);
    }
    
    return total;
  };

  // Calculate snapshot costs
  const calculateSnapshotCosts = () => {
    const costs = {
      baseFee: 10, // Base fee for snapshot creation
      processingFee: 5, // Processing fee per user
      storageFee: 2, // Storage fee per UNIQ (if applicable)
      exportFee: 0,
      rewardFee: 0,
      transactionFee: 0 // New fee for transaction costs
    };

    // Add export fee based on format
    if (advancedOptions.autoExport) {
      switch (advancedOptions.exportFormat) {
        case 'csv':
          costs.exportFee = 2;
          break;
        case 'json':
          costs.exportFee = 3;
          break;
        case 'excel':
          costs.exportFee = 5;
          break;
      }
    }

    // Add reward fees if enabled
    if (advancedOptions.enableRewards) {
      if (advancedOptions.rewardType === 'uos') {
        costs.rewardFee = advancedOptions.rewardTopUsers * 1; // 1 UOS per user for UOS distribution
        costs.transactionFee = advancedOptions.rewardTopUsers * 0.5; // 0.5 UOS per transaction
      } else {
        costs.rewardFee = advancedOptions.rewardTopUsers * advancedOptions.selectedUniqs.length * 2; // 2 UOS per UNIQ per user
        costs.transactionFee = advancedOptions.rewardTopUsers * 0.5; // 0.5 UOS per transaction
      }
    }

    return costs;
  };

  // Calculate total tokens in snapshot
  const calculateTotalTokens = () => {
    if (snapshotType === 'full') {
      return mockTokens.length;
    } else if (snapshotType === 'specific') {
      return selectedTokens.length;
    } else {
      // For criteria-based, estimate based on selected criteria
      return Math.floor(mockTokens.length * 0.5); // Example estimation
    }
  };

  // Calculate estimated processing time
  const calculateProcessingTime = () => {
    const baseTime = 5; // 5 minutes base
    const tokens = calculateTotalTokens();
    const timePerToken = 0.1; // 0.1 minutes per token
    return Math.ceil(baseTime + (tokens * timePerToken));
  };

  // Calculate weighted distribution
  const calculateWeightedDistribution = () => {
    const totalUsers = advancedOptions.rewardTopUsers;
    const totalWeight = (totalUsers * (totalUsers + 1)) / 2; // Sum of ranks (1 to n)
    
    return Array.from({ length: totalUsers }, (_, i) => {
      const rank = i + 1;
      const weight = totalUsers - i; // Higher rank = higher weight
      const percentage = (weight / totalWeight) * 100;
      
      return {
        rank,
        weight,
        percentage: percentage.toFixed(2)
      };
    });
  };

  // Calculate reward amount for a specific rank
  const calculateRewardForRank = (rank: number) => {
    if (advancedOptions.distributionMethod !== 'weighted') {
      return advancedOptions.rewardType === 'uos' 
        ? advancedOptions.rewardAmount 
        : advancedOptions.selectedUniqs.length;
    }

    const totalUsers = advancedOptions.rewardTopUsers;
    const totalWeight = (totalUsers * (totalUsers + 1)) / 2;
    const weight = totalUsers - rank + 1;
    const percentage = weight / totalWeight;

    if (advancedOptions.rewardType === 'uos') {
      return Math.round(advancedOptions.rewardAmount * percentage * 100) / 100;
    } else {
      return Math.round(advancedOptions.selectedUniqs.length * percentage);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Create a Snapshot</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white/70">Step {step} of 3</span>
          <div className="h-2 w-32 bg-primary rounded-full">
            <div 
              className="h-full bg-highlight rounded-full transition-all shadow-sm shadow-secondary"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <div className="space-y-6">
            <Card className="bg-primary/20 border-none shadow-sm shadow-secondary">
              <CardHeader>
                <CardTitle className="text-white">Collection Selection</CardTitle>
                <CardDescription className="text-white/70">
                  Choose a collection and the tokens to include in the snapshot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="collection" className="text-white">Collection</Label>
                    <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                      <SelectTrigger className="bg-transparent border-muted text-white">
                        <SelectValue placeholder="Select a collection" />
                      </SelectTrigger>
                      <SelectContent className="bg-primary border-muted">
                        <SelectItem value="collection1" className="text-white hover:bg-[#622C6C]">Collection 1</SelectItem>
                        <SelectItem value="collection2" className="text-white hover:bg-[#622C6C]">Collection 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="search" className="text-white">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-3 h-4 w-4 text-white/70" />
                      <Input
                        id="search"
                        placeholder="Search a collection..."
                        className="pl-8 border-[#622C6C] text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-white">Snapshot Type</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Card
                      className={`cursor-pointer transition-colors bg-[#28274A] border-[#622C6C] hover:border-[#AC46E7] ${
                        snapshotType === 'full' ? 'border-[#AC46E7] shadow-sm shadow-secondary' : ''
                      }`}
                      onClick={() => setSnapshotType('full')}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white">Full Collection</h3>
                        <p className="text-sm text-white/70">
                          Snapshot of all collection tokens
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer transition-colors bg-[#28274A] border-[#622C6C] hover:border-[#AC46E7] ${
                        snapshotType === 'specific' ? 'border-[#AC46E7] shadow-sm shadow-secondary' : ''
                      }`}
                      onClick={() => setSnapshotType('specific')}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white">Specific Tokens</h3>
                        <p className="text-sm text-white/70">
                          Select individual tokens
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer transition-colors bg-[#28274A] border-[#622C6C] hover:border-[#AC46E7] ${
                        snapshotType === 'criteria' ? 'border-[#AC46E7] shadow-sm shadow-secondary' : ''
                      }`}
                      onClick={() => setSnapshotType('criteria')}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white">By Criteria</h3>
                        <p className="text-sm text-white/70">
                          Filter tokens by attributes
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {snapshotType === 'specific' && (
                  <div className="space-y-4">
                    <Label className="text-white">Selected Tokens</Label>
                    <div className="grid grid-cols-4 gap-4">
                      {selectedTokens.map((token) => (
                        <Card key={token.id} className="relative bg-primary border-muted group">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#622C6C] hover:bg-[#AC46E7] z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleTokenRemove(token.id)}
                          >
                            <X className="h-4 w-4 text-white" />
                          </Button>
                          <CardContent className="p-2">
                            <img
                              src={token.image}
                              alt={token.name}
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <p className="mt-2 text-sm font-medium text-white">{token.name}</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {Object.entries(token.attributes).map(([key, value]) => (
                                <span key={key} className="text-xs text-white/70">
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Dialog >
                        <DialogTrigger asChild>
                          <Card className="border-dashed border-muted bg-primary cursor-pointer hover:border-[#AC46E7] transition-colors">
                            <CardContent className="p-2 flex items-center justify-center h-full">
                              <Button variant="ghost" className="h-full w-full text-white hover:bg-[#622C6C]">
                                <Plus className="h-6 w-6" />
                              </Button>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="bg-foreground border-muted max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle className="text-white">Select Tokens</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="relative">
                              <Search className="absolute left-2 top-3 h-4 w-4 text-white/70" />
                              <Input
                                placeholder="Search tokens..."
                                className="pl-8 bg-transparent border-muted text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
                              {filteredTokens.map((token) => (
                                <Card
                                  key={token.id}
                                  className={`relative bg-transparent border-muted cursor-pointer transition-all ${
                                    selectedTokens.find(t => t.id === token.id) 
                                      ? 'border-[#AC46E7] shadow-[0_0_10px_rgba(172,70,231,0.3)] scale-[1.02]' 
                                      : 'hover:border-[#AC46E7]'
                                  }`}
                                  onClick={() => handleTokenSelect(token)}
                                >
                                  <CardContent className="p-2">
                                    <div className="relative">
                                      <Image
                                        src={token.image}
                                        alt={token.name}
                                        width={10}
                                        height={10}
                                        className="w-full h-24 object-cover rounded-md"
                                      />
                                      {selectedTokens.find(t => t.id === token.id) && (
                                        <div className="absolute top-2 right-2 bg-[#AC46E7] rounded-full p-1">
                                          <svg
                                            className="h-4 w-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M5 13l4 4L19 7"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                    <p className="mt-3 text-sm font-medium text-white">{token.name}</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {Object.entries(token.attributes).map(([key, value]) => (
                                        <span key={key} className="text-xs text-white/70">
                                          {key}: {value}
                                        </span>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}

                {snapshotType === 'criteria' && (
                  <div className="space-y-4">
                    <Label className="text-white">Filter Criteria</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Attribute</Label>
                        <Select 
                          value={selectedAttribute}
                          onValueChange={(value) => {
                            setSelectedAttribute(value);
                            setSelectedValue('');
                          }}
                        >
                          <SelectTrigger className="bg-[#28274A] border-[#622C6C] text-white">
                            <SelectValue placeholder="Select an attribute" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#28274A] border-[#622C6C]">
                            <SelectItem value="rarity" className="text-white hover:bg-[#622C6C]">Rarity</SelectItem>
                            <SelectItem value="type" className="text-white hover:bg-[#622C6C]">Type</SelectItem>
                            <SelectItem value="armor" className="text-white hover:bg-[#622C6C]">Armor</SelectItem>
                            <SelectItem value="weapon" className="text-white hover:bg-[#622C6C]">Weapon</SelectItem>
                            <SelectItem value="background" className="text-white hover:bg-[#622C6C]">Background</SelectItem>
                            <SelectItem value="level" className="text-white hover:bg-[#622C6C]">Level</SelectItem>
                            <SelectItem value="power" className="text-white hover:bg-[#622C6C]">Power</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Value</Label>
                        {selectedAttribute ? (
                          <Select
                            value={selectedValue}
                            onValueChange={setSelectedValue}
                          >
                            <SelectTrigger className="bg-[#28274A] border-[#622C6C] text-white">
                              <SelectValue placeholder="Select a value" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#28274A] border-[#622C6C]">
                              {getValueOptions(selectedAttribute).map((option) => (
                                <SelectItem 
                                  key={option} 
                                  value={option} 
                                  className="text-white hover:bg-[#622C6C]"
                                >
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input 
                            placeholder="Select an attribute first" 
                            className="bg-[#28274A] border-[#622C6C] text-white"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full border-[#622C6C] text-white hover:bg-[#622C6C]"
                      onClick={() => {
                        if (selectedAttribute && selectedValue) {
                          const criterionExists = addedCriteria.some(
                            c => c.type === selectedAttribute && c.value === selectedValue
                          );
                          
                          if (!criterionExists) {
                            setAddedCriteria([...addedCriteria, { type: selectedAttribute, value: selectedValue }]);
                            setSelectedAttribute('');
                            setSelectedValue('');
                          }
                        }
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Add a criterion
                    </Button>

                    {addedCriteria.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-white">Added Criteria</Label>
                          <span className="text-sm text-white/70">{addedCriteria.length} criteria</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {addedCriteria.map((criterion, index) => (
                            <div 
                              key={index}
                              className="group flex items-center space-x-2 bg-[#28274A] px-3 py-1.5 rounded-full border border-[#622C6C] hover:border-[#AC46E7] transition-colors"
                            >
                              <span className="text-white text-sm capitalize">{criterion.type}:</span>
                              <span className="text-white/70 text-sm">{criterion.value}</span>
                              <button
                                onClick={() => {
                                  setAddedCriteria(addedCriteria.filter((_, i) => i !== index));
                                }}
                                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3 text-white/70 hover:text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="bg-primary/20 border-none shadow-[0_0_15px_rgba(98,44,108,0.3)]">
              <CardHeader>
                <CardTitle className="text-white">Snapshot Configuration</CardTitle>
                <CardDescription className="text-white/70">
                  Define snapshot parameters and scheduling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Snapshot Name</Label>
                    <Input 
                      id="name" 
                      placeholder="My Snapshot" 
                      className="bg-[#28274A] border-[#622C6C] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Input 
                      id="description" 
                      placeholder="Snapshot description" 
                      className="bg-[#28274A] border-[#622C6C] text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-white">Scheduling</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Recurrence Type</Label>
                      <Select value={recurrence} onValueChange={setRecurrence}>
                        <SelectTrigger className="bg-[#28274A] border-[#622C6C] text-white">
                          <SelectValue placeholder="Select recurrence" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#28274A] border-[#622C6C]">
                          <SelectItem value="once" className="text-white hover:bg-[#622C6C]">Once</SelectItem>
                          <SelectItem value="daily" className="text-white hover:bg-[#622C6C]">Daily</SelectItem>
                          <SelectItem value="weekly" className="text-white hover:bg-[#622C6C]">Weekly</SelectItem>
                          <SelectItem value="monthly" className="text-white hover:bg-[#622C6C]">Monthly</SelectItem>
                          <SelectItem value="custom" className="text-white hover:bg-[#622C6C]">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-[#28274A] border-[#622C6C] text-white hover:bg-[#622C6C]"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? (
                              format(startDate, 'PPP', { locale: fr })
                            ) : (
                              <span>Select a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#28274A] border-[#622C6C]">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            className="bg-[#28274A] text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label className="text-white">Start Time</Label>
                      <Input 
                        type="time"
                        className="bg-[#28274A] border-[#622C6C] text-white"
                        onChange={(e) => {
                          if (startDate) {
                            const [hours, minutes] = e.target.value.split(':');
                            const newDate = new Date(startDate);
                            newDate.setHours(parseInt(hours), parseInt(minutes));
                            setStartDate(newDate);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Advanced Options</Label>
                    <Switch 
                      checked={showAdvancedOptions}
                      onCheckedChange={setShowAdvancedOptions}
                      className="data-[state=checked]:bg-[#AC46E7]" 
                    />
                  </div>
                  {showAdvancedOptions && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Export Format</Label>
                        <Select
                          value={advancedOptions.exportFormat}
                          onValueChange={(value) =>
                            setAdvancedOptions({
                              ...advancedOptions,
                              exportFormat: value
                            })
                          }
                        >
                          <SelectTrigger className="bg-[#28274A] border-[#622C6C] text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#28274A] border-[#622C6C]">
                            <SelectItem value="csv" className="text-white hover:bg-[#622C6C]">CSV</SelectItem>
                            <SelectItem value="json" className="text-white hover:bg-[#622C6C]">JSON</SelectItem>
                            <SelectItem value="excel" className="text-white hover:bg-[#622C6C]">Excel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Sort By</Label>
                        <Select
                          value={advancedOptions.sortBy}
                          onValueChange={(value) =>
                            setAdvancedOptions({
                              ...advancedOptions,
                              sortBy: value
                            })
                          }
                        >
                          <SelectTrigger className="bg-[#28274A] border-[#622C6C] text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#28274A] border-[#622C6C]">
                            <SelectItem value="id" className="text-white hover:bg-[#622C6C]">ID</SelectItem>
                            <SelectItem value="name" className="text-white hover:bg-[#622C6C]">Name</SelectItem>
                            <SelectItem value="rarity" className="text-white hover:bg-[#622C6C]">Rarity</SelectItem>
                            <SelectItem value="type" className="text-white hover:bg-[#622C6C]">Type</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* <div className="col-span-2 flex items-center space-x-2">
                        <Switch
                          checked={advancedOptions.includeMetadata}
                          onCheckedChange={(checked) =>
                            setAdvancedOptions({
                              ...advancedOptions,
                              includeMetadata: checked
                            })
                          }
                          className="data-[state=checked]:bg-[#AC46E7]"
                        />
                        <Label className="text-white">Include Metadata</Label>
                      </div>
                      <div className="col-span-2 flex items-center space-x-2">
                        <Switch
                          checked={advancedOptions.includeImages}
                          onCheckedChange={(checked) =>
                            setAdvancedOptions({
                              ...advancedOptions,
                              includeImages: checked
                            })
                          }
                          className="data-[state=checked]:bg-[#AC46E7]"
                        />
                        <Label className="text-white">Include Images</Label>
                      </div>
                      <div className="col-span-2 flex items-center space-x-2">
                        <Switch
                          checked={advancedOptions.includeAttributes}
                          onCheckedChange={(checked) =>
                            setAdvancedOptions({
                              ...advancedOptions,
                              includeAttributes: checked
                            })
                          }
                          className="data-[state=checked]:bg-[#AC46E7]"
                        />
                        <Label className="text-white">Include Attributes</Label>
                      </div> */}

                      <div className="col-span-2 flex items-center space-x-2">
                        <Switch
                          checked={advancedOptions.autoExport}
                          onCheckedChange={(checked) =>
                            setAdvancedOptions({
                              ...advancedOptions,
                              autoExport: checked
                            })
                          }
                          className="data-[state=checked]:bg-[#AC46E7]"
                        />
                        <Label className="text-white">Auto Export After Snapshot</Label>
                      </div>

                      <div className="col-span-2 border-t border-[#622C6C] pt-4 mt-2">
                        <h3 className="text-lg font-semibold text-white mb-4">Rewards Distribution</h3>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={advancedOptions.enableRewards}
                              onCheckedChange={(checked) =>
                                setAdvancedOptions({
                                  ...advancedOptions,
                                  enableRewards: checked
                                })
                              }
                              className="data-[state=checked]:bg-[#AC46E7]"
                            />
                            <Label className="text-white">Enable Rewards</Label>
                          </div>

                          {advancedOptions.enableRewards && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-white">Reward Type</Label>
                                <Select
                                  value={advancedOptions.rewardType}
                                  onValueChange={(value) =>
                                    setAdvancedOptions({
                                      ...advancedOptions,
                                      rewardType: value,
                                      selectedUniqs: value === 'uos' ? [] : advancedOptions.selectedUniqs
                                    })
                                  }
                                >
                                  <SelectTrigger className="bg-[#28274A] border-[#622C6C] text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#28274A] border-[#622C6C]">
                                    <SelectItem value="uos" className="text-white hover:bg-[#622C6C]">UOS</SelectItem>
                                    <SelectItem value="uniq" className="text-white hover:bg-[#622C6C]">UNIQ</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label className="text-white">Number of Top Users</Label>
                                <Input
                                  type="number"
                                  value={advancedOptions.rewardTopUsers}
                                  onChange={(e) =>
                                    setAdvancedOptions({
                                      ...advancedOptions,
                                      rewardTopUsers: parseInt(e.target.value)
                                    })
                                  }
                                  className="bg-[#28274A] border-[#622C6C] text-white"
                                />
                              </div>

                              {advancedOptions.rewardType === 'uos' ? (
                                <div>
                                  <Label className="text-white">UOS Amount per User</Label>
                                  <Input
                                    type="number"
                                    value={advancedOptions.rewardAmount}
                                    onChange={(e) =>
                                      setAdvancedOptions({
                                        ...advancedOptions,
                                        rewardAmount: parseInt(e.target.value)
                                      })
                                    }
                                    className="bg-[#28274A] border-[#622C6C] text-white"
                                  />
                                </div>
                              ) : (
                                <div className="col-span-2">
                                  <Label className="text-white">Select UNIQs to Distribute</Label>
                                  <div className="mt-2 grid grid-cols-3 gap-2">
                                    {['UNIQ #1', 'UNIQ #2', 'UNIQ #3', 'UNIQ #4', 'UNIQ #5'].map((uniq) => (
                                      <div
                                        key={uniq}
                                        className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                                          advancedOptions.selectedUniqs.includes(uniq)
                                            ? 'bg-[#AC46E7] border-[#AC46E7]'
                                            : 'bg-[#28274A] border-[#622C6C] hover:border-[#AC46E7]'
                                        }`}
                                        onClick={() => {
                                          const newSelectedUniqs = advancedOptions.selectedUniqs.includes(uniq)
                                            ? advancedOptions.selectedUniqs.filter(u => u !== uniq)
                                            : [...advancedOptions.selectedUniqs, uniq];
                                          setAdvancedOptions({
                                            ...advancedOptions,
                                            selectedUniqs: newSelectedUniqs
                                          });
                                        }}
                                      >
                                        <div className={`w-3 h-3 rounded-full ${
                                          advancedOptions.selectedUniqs.includes(uniq)
                                            ? 'bg-white'
                                            : 'border border-white/50'
                                        }`} />
                                        <span className="text-white text-sm">{uniq}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="col-span-2">
                                <Label className="text-white">Reward Based On</Label>
                                <Select
                                  value={advancedOptions.rewardBasedOn}
                                  onValueChange={(value) =>
                                    setAdvancedOptions({
                                      ...advancedOptions,
                                      rewardBasedOn: value
                                    })
                                  }
                                >
                                  <SelectTrigger className="bg-[#28274A] border-[#622C6C] text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#28274A] border-[#622C6C]">
                                    <SelectItem value="unique_holders" className="text-white hover:bg-[#622C6C]">
                                      UNIQs Held
                                    </SelectItem>
                                    <SelectItem value="total_value" className="text-white hover:bg-[#622C6C]">
                                      Total Value
                                    </SelectItem>
                                    <SelectItem value="rarity_score" className="text-white hover:bg-[#622C6C]">
                                      Rarity Score
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <p className="text-white/70 text-sm mt-1">
                                  Each of the top {advancedOptions.rewardTopUsers} users will receive exactly {
                                    advancedOptions.rewardType === 'uos' 
                                      ? `${advancedOptions.rewardAmount} UOS`
                                      : `${advancedOptions.selectedUniqs.length} UNIQ(s)`
                                  }
                                </p>
                              </div>

                              <div className="col-span-2 bg-[#28274A] p-4 rounded-lg border border-[#622C6C]">
                                {advancedOptions.rewardType === 'uos' ? (
                                  <>
                                    <p className="text-white text-sm">
                                      Total UOS to distribute: {calculateTotalRewards()} UOS
                                    </p>
                                    <p className="text-white/70 text-xs mt-1">
                                      {advancedOptions.rewardTopUsers} users will receive exactly {advancedOptions.rewardAmount} UOS each
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-white text-sm">
                                      Selected UNIQs to distribute: {advancedOptions.selectedUniqs.length}
                                    </p>
                                    <p className="text-white/70 text-xs mt-1">
                                      {advancedOptions.rewardTopUsers} users will receive exactly {advancedOptions.selectedUniqs.length} UNIQ(s) each
                                    </p>
                                    {advancedOptions.selectedUniqs.length > 0 && (
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {advancedOptions.selectedUniqs.map((uniq) => (
                                          <span key={uniq} className="text-xs text-white/70 bg-[#622C6C] px-2 py-1 rounded-full">
                                            {uniq}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card className="bg-primary/20 border-none shadow-[0_0_15px_rgba(98,44,108,0.3)]">
              <CardHeader>
                <CardTitle className="text-white">Validation and Costs</CardTitle>
                <CardDescription className="text-white/70">
                  Check parameters and confirm snapshot creation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Snapshot Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-white/70">Collection</p>
                      <p className="font-medium text-white">{selectedCollection || 'Not selected'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Snapshot Type</p>
                      <p className="font-medium text-white">
                        {snapshotType === 'full'
                          ? 'Full Collection'
                          : snapshotType === 'specific'
                          ? 'Specific Tokens'
                          : 'By Criteria'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Total Tokens</p>
                      <p className="font-medium text-white">{calculateTotalTokens()} tokens</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Estimated Processing Time</p>
                      <p className="font-medium text-white">{calculateProcessingTime()} minutes</p>
                    </div>
                    {snapshotType === 'criteria' && addedCriteria.length > 0 && (
                      <div className="col-span-2">
                        <p className="text-sm text-white/70">Selected Criteria</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {addedCriteria.map((criterion, index) => (
                            <span key={index} className="text-xs text-white/70 bg-[#622C6C] px-2 py-1 rounded-full">
                              {criterion.type}: {criterion.value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Cost Estimation (Manager's Fees)</h3>
                  <div className="space-y-2">
                    {(() => {
                      const costs = calculateSnapshotCosts();
                      return (
                        <>
                          <div className="flex justify-between text-white">
                            <span>Base fee (Snapshot creation)</span>
                            <span>{costs.baseFee} UOS</span>
                          </div>
                          <div className="flex justify-between text-white">
                            <span>Processing fee</span>
                            <span>{costs.processingFee} UOS</span>
                          </div>
                          {advancedOptions.autoExport && (
                            <div className="flex justify-between text-white">
                              <span>Export fee ({advancedOptions.exportFormat})</span>
                              <span>{costs.exportFee} UOS</span>
                            </div>
                          )}
                          {advancedOptions.enableRewards && (
                            <>
                              <div className="flex justify-between text-white">
                                <span>Reward distribution fee</span>
                                <span>{costs.rewardFee} UOS</span>
                              </div>
                              <div className="flex justify-between text-white">
                                <span>Transaction fees</span>
                                <span>{costs.transactionFee} UOS</span>
                              </div>
                            </>
                          )}
                          <div className="border-t border-[#622C6C] pt-2">
                            <div className="flex justify-between font-semibold text-white">
                              <span>Total Fees (Manager's Cost)</span>
                              <span>
                                {Object.values(costs).reduce((a, b) => a + b, 0)} UOS
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {advancedOptions.enableRewards && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">Rewards Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-white">
                        <span>Reward Type</span>
                        <span className="capitalize">{advancedOptions.rewardType}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Number of Recipients</span>
                        <span>{advancedOptions.rewardTopUsers} users</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Reward Based On</span>
                        <span className="capitalize">{advancedOptions.rewardBasedOn}</span>
                      </div>
                      {advancedOptions.rewardType === 'uos' ? (
                        <div className="flex justify-between text-white">
                          <span>Amount per User (Net)</span>
                          <span>{advancedOptions.rewardAmount} UOS</span>
                        </div>
                      ) : (
                        <div className="flex justify-between text-white">
                          <span>UNIQs per User</span>
                          <span>{advancedOptions.selectedUniqs.length} UNIQs</span>
                        </div>
                      )}
                      <div className="flex justify-between text-white">
                        <span>Total Rewards (Net)</span>
                        <span>{calculateTotalRewards()} {advancedOptions.rewardType === 'uos' ? 'UOS' : 'UNIQs'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleBack}
              className="border-[#622C6C] bg-transparent text-white hover:bg-[#622C6C]"
            >
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button 
              type="button" 
              onClick={handleNext}
              className="bg-[#AC46E7] text-white hover:bg-[#8757B2] shadow-[0_0_10px_rgba(172,70,231,0.3)]"
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit"
              className="bg-[#AC46E7] text-white hover:bg-[#8757B2] shadow-[0_0_10px_rgba(172,70,231,0.3)]"
            >
              Create Snapshot
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #28274A;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #622C6C;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #AC46E7;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 