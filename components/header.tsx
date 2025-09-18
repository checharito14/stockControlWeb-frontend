import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

export function Header() {
  const tabs = ["", "", ""]

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab, index) => (
              <Button key={index} variant={index === 0 ? "secondary" : "ghost"} size="sm" className="rounded-full">
                {tab} hola
              </Button>
            ))}
          </div>

          {/* Badge */}
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-3 py-1"></Badge>
        </div>

        <div className="flex items-center space-x-4">
          {/* Year Selector */}
          <Button variant="ghost" size="sm">
            <ChevronDown className="w-4 h-4" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-green-500 text-white text-xs"></AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium"></div>
              <div className="text-gray-500 text-xs"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
