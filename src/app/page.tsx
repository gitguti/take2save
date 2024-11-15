'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from 'lucide-react'



// Simulated product data
const products = [
  { id: 1, name: "Laptop", price: 999.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Smartphone", price: 599.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Headphones", price: 149.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Smartwatch", price: 249.99, image: "/placeholder.svg?height=200&width=200" },
]

type Product = typeof products[0]

type Screen = 'products' | 'detail' | 'purchase' | 'rating' | 'confirmation'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('products')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [purchaseProgress, setPurchaseProgress] = useState(0)
  const [rating, setRating] = useState(0)

  
  const selectProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentScreen('detail')
  }

  const startPurchase = () => {
    setCurrentScreen('purchase')
    setPurchaseProgress(0)
  }

  const handleRating = async (value: number) => {
    setRating(value)
    // Here you would typically call your blockchain function
    // For this example, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCurrentScreen('confirmation')
  }


  useEffect(() => {
    if (currentScreen === 'purchase') {
      const timer = setInterval(() => {
        setPurchaseProgress((oldProgress) => {
          const newProgress = oldProgress + 10
          if (newProgress === 100) {
            clearInterval(timer)
            setTimeout(() => setCurrentScreen('rating'), 500)
          }
          return newProgress
        })
      }, 500)

      return () => clearInterval(timer)
    }
  }, [currentScreen])

  return (
    <div className="container mx-auto p-4">
      {currentScreen === 'products' && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
                  <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => selectProduct(product)}>View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      {currentScreen === 'detail' && selectedProduct && (
        <div>
          <Button onClick={() => setCurrentScreen('products')} className="mb-4">Back to Products</Button>
          <Card>
            <CardHeader>
              <CardTitle>{selectedProduct.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover mb-4" />
              <p className="text-xl font-semibold mb-2">${selectedProduct.price.toFixed(2)}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={startPurchase}>Buy Now</Button>
            </CardFooter>
          </Card>
        </div>
      )}
            {currentScreen === 'purchase' && selectedProduct && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">Processing Your Purchase</h2>
          <Progress value={purchaseProgress} className="w-64 mb-4" />
          <p>{purchaseProgress === 100 ? 'Purchase Complete!' : 'Please wait...'}</p>
        </div>
      )}
        {currentScreen === 'rating' && selectedProduct && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">Rate Your Purchase</h2>
          <Card>
            <CardHeader>
              <CardTitle>{selectedProduct.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-48 object-cover mb-4" />
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-8 h-8 cursor-pointer ${value <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    onClick={() => handleRating(value)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentScreen === 'confirmation' && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">Thank You for Your Rating!</h2>
          <p className="mb-4">Your rating has been recorded.</p>
          <Button onClick={() => setCurrentScreen('products')}>Back to Products</Button>
        </div>
      )}
    </div>
  )
}