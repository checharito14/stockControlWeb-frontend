"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, CreditCard, ArrowUpDown, Package, Users, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

export function Sidebar() {
  const [inventoryOpen, setInventoryOpen] = useState(true)

  const menuItems = [
    { icon: LayoutDashboard, label: "", active: true },
    { icon: CreditCard, label: "", active: false },
    { icon: ArrowUpDown, label: "", active: false },
  ]

  const inventoryItems = ["", "", "", "", "", "", "", "", ""]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded"></div>
          <div>
            <div className="font-bold text-sm"></div>
            <div className="text-xs text-gray-500"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Button key={index} variant={item.active ? "secondary" : "ghost"} className="w-full justify-start">
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}

        {/* Inventory Section */}
        <div className="pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500"
            onClick={() => setInventoryOpen(!inventoryOpen)}
          >
            <Package className="w-4 h-4 mr-3" />
            <span className="flex-1 text-left"></span>
            {inventoryOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>

          {inventoryOpen && (
            <div className="ml-6 mt-2 space-y-1">
              {inventoryItems.map((item, index) => (
                <Button key={index} variant="ghost" size="sm" className="w-full justify-start text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mr-3"></div>
                  {item}
                </Button>
              ))}
            </div>
          )}
        </div>

        <Button variant="ghost" className="w-full justify-start">
          <Users className="w-4 h-4 mr-3" />
        </Button>
      </nav>
    </div>
  )
}
