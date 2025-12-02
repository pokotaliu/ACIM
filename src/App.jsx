import { useEffect, Component } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import StudyPage from './pages/StudyPage';

console.log('[DEBUG APP] App.jsx module loaded');

// Error Boundary to catch render errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[DEBUG APP] ❌ ErrorBoundary caught error:', error);
    console.error('[DEBUG APP] Error info:', errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          backgroundColor: '#fff3f3',
          border: '2px solid #ff6b6b',
          borderRadius: '8px',
          margin: '20px',
          fontFamily: 'monospace'
        }}>
          <h2 style={{ color: '#d63031' }}>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error Details</summary>
            <pre style={{ color: '#e74c3c' }}>
              {this.state.error && this.state.error.toString()}
            </pre>
            <pre style={{ color: '#666', fontSize: '12px' }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  console.log('[DEBUG APP] App component rendering...');

  // Signal that React app is ready
  useEffect(() => {
    console.log('[DEBUG APP] App useEffect running - dispatching react-ready');
    window.dispatchEvent(new CustomEvent('react-ready'));
    console.log('[DEBUG APP] ✅ react-ready event dispatched');
  }, []);

  console.log('[DEBUG APP] App returning JSX');

  return (
    <ErrorBoundary>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/study/:lessonId" element={<StudyPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
