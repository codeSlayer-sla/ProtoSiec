"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StatisticCardProps {
  title: string
  value: string
  description: string
  trend: string
  trendUp: boolean
}

export default function StatisticCard({ title, value, description, trend, trendUp }: StatisticCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardContent className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold tracking-tight">{value}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>

          <div
            className={`mt-4 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              trendUp ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {trendUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {trend}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
