import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    isOffline: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            isOffline: !navigator.onLine,
        };
    }

    componentDidMount() {
        window.addEventListener('online', this.handleOnline);
        window.addEventListener('offline', this.handleOffline);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleOnline);
        window.removeEventListener('offline', this.handleOffline);
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo,
        });
    }

    handleOnline = () => {
        this.setState({ isOffline: false });
    };

    handleOffline = () => {
        this.setState({ isOffline: true });
    };

    render() {
        const { hasError, error, errorInfo, isOffline } = this.state;

        if (hasError) {
            return (
                <div>
                    <h2>Something went wrong</h2>
                    <p>{error && error.toString()}</p>
                    <p>Component Stack Error Details: {errorInfo && errorInfo.componentStack}</p>
                </div>
            );
        }

        if (isOffline) {
            return <div>Internet connection is offline</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
