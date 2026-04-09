import { Component } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("Application error:", error, info);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="grid min-h-screen place-items-center bg-[#f5f7f6] p-6">
        <Card className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            The app hit an unexpected state. Refresh the page and try again.
          </p>
          <Button className="mt-6" onClick={() => window.location.reload()}>
            Reload App
          </Button>
        </Card>
      </div>
    );
  }
}
