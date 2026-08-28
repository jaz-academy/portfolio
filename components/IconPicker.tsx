'use client'

import React, { useState, useRef, useEffect } from 'react'
import * as HeroIcons from '@heroicons/react/24/outline'

const iconNames = Object.keys(HeroIcons).filter(name => name.endsWith('Icon'))

export default function IconPicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredIcons = iconNames.filter(name => name.toLowerCase().includes(search.toLowerCase())).slice(0, 50) // Limit to 50 to prevent freezing
  
  const SelectedIcon = (HeroIcons as Record<string, React.ElementType>)[value] || HeroIcons.CheckCircleIcon

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-md bg-white/5 px-3 py-1.5 text-sm text-white ring-1 ring-inset ring-white/10 hover:bg-white/10 focus:ring-2 focus:ring-indigo-500"
      >
        <div className="flex items-center gap-2 truncate">
          <SelectedIcon className="h-5 w-5 shrink-0" />
          <span className="truncate">{value || 'Select Icon'}</span>
        </div>
        <HeroIcons.ChevronUpDownIcon className="h-4 w-4 text-gray-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 rounded-md bg-gray-800 p-2 shadow-lg ring-1 ring-white/10">
          <input 
            type="text" 
            placeholder="Search icon..."
            className="w-full mb-2 rounded-md border-0 bg-gray-900 py-1.5 px-3 text-sm text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
            {filteredIcons.map(name => {
              const Icon = (HeroIcons as Record<string, React.ElementType>)[name]
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => {
                    onChange(name)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className={`p-1.5 flex items-center justify-center rounded hover:bg-white/10 ${value === name ? 'bg-indigo-500/50 text-white' : 'text-gray-300'}`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              )
            })}
          </div>
          {filteredIcons.length === 0 && <p className="text-xs text-gray-400 text-center py-2">No icons found</p>}
        </div>
      )}
    </div>
  )
}
