import { useEffect, useState } from 'react'
import { api } from '../services/api'

// Module-level cache — persists across re-mounts, cleared on page reload
let _cache = null
let _promise = null

export function useCategories() {
  const [categories, setCategories] = useState(_cache || [])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(_cache === null)

  useEffect(() => {
    if (_cache !== null) {
      setCategories(_cache)
      setLoading(false)
      return
    }

    // Deduplicate in-flight requests
    if (!_promise) {
      _promise = api('/categories').then(data => {
        _cache = data
        return data
      }).catch(err => {
        _promise = null
        throw err
      })
    }

    let alive = true
    _promise
      .then(data => { if (alive) { setCategories(data); setLoading(false) } })
      .catch(err => { if (alive) { setError(err.message || 'Unable to load categories'); setLoading(false) } })

    return () => { alive = false }
  }, [])

  return { categories, error, loading }
}
