'use client'

import { useState, useRef } from 'react'
import { CaretDown } from "@phosphor-icons/react"

type FilterBarProps = {
  title?: string
  children?: React.ReactNode
  variant?: 'main' | 'section'
  isOpen?: boolean
  onToggle?: () => void
}

export default function FilterBar({ 
  title = "Filters",
  children,
  variant = 'main',
  isOpen: externalIsOpen,
  onToggle: externalOnToggle
}: FilterBarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const handleToggle = externalOnToggle || (() => setInternalIsOpen(!internalIsOpen))

  const buttonClass = variant === 'main'
    ? "w-full flex items-center justify-between p-4 glass backdrop-blur-xl rounded-full"
    : "filter-section-header glass"
  
  const titleClass = variant === 'main'
    ? "text-base font-medium"
    : "filter-section-title"

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleToggle} 
        className={buttonClass}
        aria-label={`Toggle ${title}`}
        aria-expanded={isOpen}
      >
        {variant === 'main' ? (
          <span className={titleClass}>{title}</span>
        ) : (
          <h3 className={titleClass}>{title}</h3>
        )}
        <CaretDown
          size={18}
          weight="regular"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } ${variant === 'section' ? "filter-chevron" : ""}`}
        />
      </button>
      
      {variant === 'main' && isOpen && children && (
        <div className="absolute top-full left-0 right-0 mt-2 glass backdrop-blur-3xl rounded-4xl p-4 max-h-[80vh] overflow-y-auto z-50">
          {children}
        </div>
      )}
    </div>
  )
}