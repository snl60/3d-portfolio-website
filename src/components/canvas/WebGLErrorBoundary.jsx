import { Component } from 'react';
import { herofallback } from '../../assets';

/**
 * Error boundary that catches WebGL/Three.js rendering failures
 * and displays a fallback image instead.
 */
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL rendering failed, showing fallback:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={herofallback}
            alt="3D Computer Setup"
            className="object-contain max-w-full max-h-full"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
