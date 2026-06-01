import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: '#B8922A', marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#6B6560', marginBottom: '2rem' }}>
            Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '0.75rem 2rem', background: '#B8922A', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.1em' }}
          >
            Refresh Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
