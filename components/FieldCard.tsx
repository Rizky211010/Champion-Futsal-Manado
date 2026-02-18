'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Users, Clock, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field } from '@/data/mock-data'
import { formatCurrency } from '@/lib/utils'

interface FieldCardProps {
  field: Field
  variant?: 'default' | 'compact'
}

export function FieldCard({ field, variant = 'default' }: FieldCardProps) {
  const minPrice = Math.min(
    field.pricing.weekday.morning,
    field.pricing.weekday.night,
    field.pricing.weekend.morning,
    field.pricing.weekend.night
  )

  if (variant === 'compact') {
    return (
      <Card className="group cursor-pointer transition-all hover:shadow-lg card-hover border-slate-200">
        <Link href={`/fields/${field.id}`}>
          <div className="flex gap-4 p-4">
            <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
              <Image
                src={field.images[0]}
                alt={field.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1 text-slate-900">{field.name}</h3>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Users className="h-4 w-4" />
                  <span>Kapasitas {field.specifications.capacity} orang</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={field.type === 'indoor' ? 'default' : 'secondary'} className="text-xs">
                    {field.type === 'indoor' ? '🏠 Indoor' : '🌤️ Outdoor'}
                  </Badge>
                  <span className="text-sm font-medium text-slate-700">{field.size}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Mulai dari</p>
                  <p className="font-bold text-emerald-600">{formatCurrency(minPrice)}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    )
  }
  return (
    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl card-hover h-full border-slate-200">
      <Link href={`/fields/${field.id}`}>
        <div className="relative h-52 overflow-hidden bg-slate-200">
          <Image
            src={field.images[0]}
            alt={field.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant={field.type === 'indoor' ? 'default' : 'secondary'} className="font-semibold">
              {field.type === 'indoor' ? '🏠 Indoor' : '🌤️ Outdoor'}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-white/95 backdrop-blur">
              📏 {field.size}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors text-slate-900">{field.name}</h3>
            <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
              <Users className="h-4 w-4" />
              <span>Kapasitas {field.specifications.capacity} orang</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {field.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                {feature}
              </Badge>
            ))}
            {field.features.length > 3 && (
              <Badge variant="outline" className="text-xs border-slate-300 text-slate-700">
                +{field.features.length - 3} lainnya
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div>
              <p className="text-xs text-slate-600 font-medium">Mulai dari</p>
              <p className="font-bold text-emerald-600 text-lg">{formatCurrency(minPrice)}</p>
              <p className="text-xs text-slate-500">/ jam</p>
            </div>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 font-semibold transition-all hover:scale-105">
              <Clock className="h-4 w-4 mr-1" />
              Booking
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
