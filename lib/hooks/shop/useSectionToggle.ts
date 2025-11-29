import { useState } from "react"
import type { SectionKey } from "@/lib/types/filter"

type OpenSections = {
  category: boolean
  price: boolean
  ratings: boolean
  brand: boolean
}

export function useSectionToggle() {
  const [openSections, setOpenSections] = useState<OpenSections>({
    category: false,
    price: false,
    ratings: false,
    brand: false,
  })

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return {
    openSections,
    toggleSection,
  }
}

