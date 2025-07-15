import { AlertCircle } from 'lucide-react'

export default function Error(children :  {children: React.ReactNode}) {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-red-50/50 p-2 mt-1 text-base text-red-700 border border-red-700/50">
      <AlertCircle className="h-4 w-4 text-red-700" />
      <p>{children.children}</p>
    </div>
  )
}
