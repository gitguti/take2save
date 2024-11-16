'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Menu, ShoppingCart, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function NavBar() {
  const [cartItemCount, setCartItemCount] = useState(3) // Example state, replace with your actual cart state

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full justify-center flex h-16 items-center px-32">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/products" className="text-lg font-medium hover:text-primary">
                Products
              </Link>
              <Link href="/about" className="text-lg font-medium hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-lg font-medium hover:text-primary">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="hidden lg:flex items-center space-x-6 mr-auto">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary">
            Products
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="take2save logo"
              width={120}
              height={50}
              className="h-auto w-auto"
              priority
            />
          </Link>
        </div>
        <nav className="hidden lg:flex items-center space-x-6 ml-auto">
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4 ml-auto">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Shopping cart</span>
            {cartItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-1 text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/orders">Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}