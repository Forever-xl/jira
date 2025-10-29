import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

// 使用更安全的动态导入方式
const AuthenticatedApp = React.lazy(() =>
  import("authenticated-app").catch((error) => {
    console.error("Failed to load AuthenticatedApp:", error);
    return { default: () => <div>Authenticated content loading failed</div> };
  }),
);

const UnauthenticatedApp = React.lazy(() =>
  import("unauthenticated-app").catch((error) => {
    console.error("Failed to load UnauthenticatedApp:", error);
    return { default: () => <div>Login content loading failed</div> };
  }),
);

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
