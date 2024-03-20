import React, { ReactNode } from 'react';

interface State {
  hasError: boolean;
  error: Error | null; 
}

interface Props {
  fallback: (error?: Error | null) => React.ReactElement;
  children: ReactNode;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error);
    }

    return this.props.children; 
  }
}




export default ErrorBoundary;
