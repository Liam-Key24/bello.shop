export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DAE7DA] via-[#E8F0E8] to-[#F0F7F0] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}