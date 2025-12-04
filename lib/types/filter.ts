export type Category = {
  id: string
  label: string
  checked?: boolean
}

export type SectionKey = "category" | "price" | "ratings" | "brand"

export const DEFAULT_RATINGS = [1, 2, 3, 4, 5] as const

