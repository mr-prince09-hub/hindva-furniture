import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, clearToken, getToken, uploadToImageKit } from '../services/api'
import Notice from '../components/Notice'

export default function AdminCategories() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState('')
  const [files, setFiles] = useState([])
  const [notice, setNotice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const notify = (message, type = 'success') => {
    setNotice({ message, type })
    clearTimeout(notify._t)
    notify._t = setTimeout(() => setNotice(null), 3500)
  }

  useEffect(() => {
    if (!getToken()) { navigate('/admin/login', { replace: true }); return }

    api('/categories')
      .then(data => {
        setCategories(data)
        setSelected(data[0]?.slug || '')
      })
      .catch(() => { clearToken(); navigate('/admin/login', { replace: true }) })
      .finally(() => setLoading(false))
  }, [navigate])

  const upload = async e => {
    e.preventDefault()
    if (!files.length || !selected || uploading) return

    setUploading(true)
    notify(`Uploading ${files.length} image${files.length > 1 ? 's' : ''}...`, 'info')
    try {
      let updatedCategory = null
      for (const file of files) {
        const uploaded = await uploadToImageKit(file, selected)
        updatedCategory = await api(`/admin/categories/${selected}/images`, {
          method: 'POST',
          body: JSON.stringify({ url: uploaded.url, fileId: uploaded.fileId, name: uploaded.name }),
        })
      }
      if (updatedCategory) {
        setCategories(cats => cats.map(c => c.slug === selected ? updatedCategory : c))
      }
      setFiles([])
      e.target.reset()
      notify(`${files.length} image${files.length > 1 ? 's' : ''} uploaded.`)
    } catch (err) {
      notify(err.message, 'error')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = async (slug, index) => {
    if (!window.confirm('Remove this image permanently?')) return
    notify('Removing...', 'info')
    try {
      const updated = await api(`/admin/categories/${slug}/images/${index}`, { method: 'DELETE' })
      setCategories(cats => cats.map(c => c.slug === slug ? updated : c))
      notify('Image removed.')
    } catch (err) {
      notify(err.message, 'error')
    }
  }

  const setHeroImage = async image => {
    if (!current || current.image === image) return
    notify('Updating hero image...', 'info')
    try {
      const updated = await api(`/admin/categories/${current.slug}/hero-image`, {
        method: 'POST',
        body: JSON.stringify({ image }),
      })
      setCategories(cats => cats.map(c => c.slug === current.slug ? updated : c))
      notify('Hero image updated.')
    } catch (err) {
      notify(err.message, 'error')
    }
  }

  if (loading) return <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Loading categories...</div>

  const current = categories.find(c => c.slug === selected)

  return (
    <>
      {notice && <Notice notice={notice} />}

      <section className="card">
        <p className="label mb-4">Category Gallery</p>
        <form onSubmit={upload} className="grid md:grid-cols-[1fr_1.2fr_auto] gap-3 items-end mb-8">
          <div>
            <label className="block label mb-2" htmlFor="cat-select">Category</label>
            <select
              id="cat-select"
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="w-full rounded-lg px-4 py-3"
              style={{ border: '1px solid var(--border-light)', background: 'var(--card)', color: 'var(--text)' }}
            >
              {categories.map(cat => <option key={cat.slug} value={cat.slug}>{cat.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block label mb-2" htmlFor="cat-images">Images</label>
            <input id="cat-images" type="file" accept="image/*" multiple onChange={e => setFiles(Array.from(e.target.files || []))} />
            {files.length > 0 && <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>{files.length} selected</p>}
          </div>
          <button className="btn btn-gold" type="submit" disabled={uploading || !files.length}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {current && (
          <div>
            <h2 className="text-3xl mb-4">{current.title}</h2>
            {current.images.length === 0 && (
              <p style={{ color: 'var(--text-muted)' }}>No images yet. Upload some above.</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {current.images.map((img, index) => (
                <div
                  key={`${img}-${index}`}
                  className="rounded-lg overflow-hidden"
                  style={{ border: current.image === img ? '1.5px solid var(--gold)' : '1px solid var(--border-light)', background: 'var(--card-warm)' }}
                >
                  <button
                    type="button"
                    onClick={() => setHeroImage(img)}
                    className="relative block w-full"
                    style={{ cursor: current.image === img ? 'default' : 'pointer' }}
                    title={current.image === img ? 'Current hero image' : 'Set as hero image'}
                  >
                    <img src={img} alt={`${current.title} ${index + 1}`} className="w-full h-40 object-cover" loading="lazy" />
                    {current.image === img && (
                      <span className="absolute top-2 left-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase" style={{ background: 'var(--gold)', color: '#fff' }}>
                        Hero
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(current.slug, index)}
                    className="w-full py-2 text-xs font-semibold uppercase"
                    style={{ color: '#9f1d1d' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
