import { useEffect, useState } from "react";
import { getCookie, getRefresh } from "../api/cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthenticatedSSE = (userId) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (userId !== null) {
      let eventSource;

      try {
        eventSource = new EventSource(`${BASE_URL}/alarms/subscribe/${userId}`);

        eventSource.addEventListener("alarm", (event) => {
          const eventData = JSON.parse(event.data);
          setEvents((prev) => [...prev, eventData]);
          console.log(JSON.parse(event.data));
          setEvent(JSON.parse(event.data));
        });

        eventSource.onerror = (err) => {
          console.error("SSE Error:", err);
          setError("Error receiving SSE data");
          eventSource.close();
        };
      } catch (err) {
        console.error("SSE initialization error:", err);
        setError("Failed to initialize SSE");
      }

      return () => {
        if (eventSource) {
          eventSource.close();
        }
      };
    }
  }, [userId]);

  return { events, error, message: event };
};

export default useAuthenticatedSSE;
