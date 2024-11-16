'use client'

import { useState } from "react"
import { Search, Pizza, Apple, ShoppingCart, Cake, Coffee, Utensils } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const categories = [
  { id: 1, name: "Fast Food", icon: Pizza },
  { id: 2, name: "Fruits & Vegetables", icon: Apple },
  { id: 3, name: "Supermarket", icon: ShoppingCart },
  { id: 4, name: "Bakery", icon: Cake },
  { id: 5, name: "Cafe", icon: Coffee },
  { id: 6, name: "Restaurants", icon: Utensils },
]

export default function SearchAndCategories() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  return (
    <div className="w-full px-4 py-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Text */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Discover Amazing Deals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t miss out on our unmissable promotions! Get the best quality products at unbeatable prices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 h-12"
          />
          <Button className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
            Search
          </Button>
        </div>

        {/* Categories */}
        <div className="pt-4 flex flex-col mx-auto justify-center">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
            <div className="flex space-x-4 p-4">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="flex flex-col items-center p-4 h-auto space-y-2 min-w-[100px]"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </Button>
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}