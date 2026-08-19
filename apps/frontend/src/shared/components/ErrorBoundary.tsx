import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{ padding: '2rem', color: '#F2F3F5', textAlign: 'center' }}>
            <h2>Algo deu errado.</h2>
            <p style={{ color: '#8D93A0' }}>{this.state.error?.message}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
