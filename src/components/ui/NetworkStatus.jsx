import { useEffect, useState } from "react";

export default function NetworkStatus() {
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

  return (
    <div
      className={`px-4 py-2 rounded-lg font-bold    ${
        isOnline ? "bg-green-600 text-white " : "bg-red-500 text-red-500  "
      }`}
    >
      {isOnline ? "Connected" : "Offline"}
    </div>
  );
}
