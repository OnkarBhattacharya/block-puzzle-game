import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BackHandler } from 'react-native';

/**
 * Error Boundary component to catch and handle React component errors
 * Prevents app crashes from crashing the entire application
 * 
 * Usage: Wrap your app or routes with <ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Error caught by ErrorBoundary:', error);
    console.error('Error Info:', errorInfo);

    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Log to error reporting service (Firebase, Sentry, etc.)
    // Example:
    // logErrorToService({
    //   error: error.toString(),
    //   errorInfo: errorInfo.componentStack,
    //   timestamp: new Date().toISOString(),
    // });
  }

  handleRestart = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleExit = () => {
    BackHandler.exitApp();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.errorTitle}>⚠️ Something Went Wrong</Text>
            
            <Text style={styles.errorMessage}>
              We encountered an unexpected error. Please try again or restart the app.
            </Text>

            {__DEV__ && this.state.error && (
              <View style={styles.debugInfo}>
                <Text style={styles.debugTitle}>Debug Info (Development Only):</Text>
                <Text style={styles.debugText}>{this.state.error.toString()}</Text>
                {this.state.errorInfo && (
                  <Text style={styles.debugStack}>{this.state.errorInfo.componentStack}</Text>
                )}
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.restartButton]}
                onPress={this.handleRestart}
              >
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.exitButton]}
                onPress={this.handleExit}
              >
                <Text style={styles.buttonText}>Exit App</Text>
              </TouchableOpacity>
            </View>

            {this.state.errorCount > 2 && (
              <Text style={styles.warningText}>
                Multiple errors detected. Consider restarting your device.
              </Text>
            )}
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 15,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  debugInfo: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  debugTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#424242',
    fontFamily: 'Courier New',
    marginBottom: 8,
  },
  debugStack: {
    fontSize: 11,
    color: '#666',
    fontFamily: 'Courier New',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  restartButton: {
    backgroundColor: '#1976d2',
  },
  exitButton: {
    backgroundColor: '#d32f2f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  warningText: {
    fontSize: 12,
    color: '#d32f2f',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ErrorBoundary;
