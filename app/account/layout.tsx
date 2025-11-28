export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}