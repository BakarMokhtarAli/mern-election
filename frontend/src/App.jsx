import { useEffect, useState } from "react";
import { AllRoutes } from "./routes/AllRoutes";
import { OfflinePage } from "./utils";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <OfflinePage />;
  }
  return (
    <div>
      <AllRoutes />
    </div>
  );
}

export default App;
