import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Search, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '../ui/Button'

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (value: any, row: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onView?: (row: T) => void
  actions?: boolean
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = 'Rechercher...',
  onEdit,
  onDelete,
  onView,
  actions = true,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<keyof T | string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = useMemo(() => {
    let filtered = data

    if (search) {
      filtered = data.filter((row) =>
        columns.some((col) => {
          const value = col.key === 'id' ? row[col.key as keyof T] : row[col.key as keyof T]
          return String(value).toLowerCase().includes(search.toLowerCase())
        })
      )
    }

    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey as keyof T]
        const bVal = b[sortKey as keyof T]
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return sortDirection === 'asc' ? comparison : -comparison
      })
    }

    return filtered
  }, [data, search, sortKey, sortDirection, columns])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredData.slice(start, start + itemsPerPage)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleSort = (key: keyof T | string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  return (
    <div className="rounded-xl border border-white/5 bg-zinc-800/50">
      {searchable && (
        <div className="border-b border-white/5 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-10 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 border-b border-white/5 bg-zinc-800/80 backdrop-blur-sm">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-6 py-4 text-left text-sm font-semibold text-zinc-300 ${
                    col.sortable !== false ? 'cursor-pointer hover:text-white' : ''
                  }`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable !== false && sortKey === col.key && (
                      <span className="text-orange-500">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-300">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-zinc-400">
                  Aucune donnée trouvée
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 transition hover:bg-zinc-800/50"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-4 text-sm text-zinc-300">
                      {col.render
                        ? col.render(row[col.key as keyof T], row)
                        : String(row[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                            aria-label="Voir"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-700 hover:text-orange-500"
                            aria-label="Modifier"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-700 hover:text-red-500"
                            aria-label="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
          <div className="text-sm text-zinc-400">
            Affichage de {(currentPage - 1) * itemsPerPage + 1} à{' '}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} sur {filteredData.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-zinc-300">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

