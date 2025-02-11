import React, { useEffect, useState } from "react";
import NewsList from "../../components/ui/newslist";
import EventList from "../../components/ui/eventlist";
// page news and event
const NewsEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"news" | "event">("news");
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/news-events.json")
      .then((response) => response.json())
      .then((data) => {
        setNews(data.news);
        setEvents(data.events.filter((event: any) => event.status === "selling"));
      })
      .catch((error) => console.error("Error fetching news & events:", error));
  }, []);

  const handleViewDetails = (id: number, type: "news" | "event") => {
    console.log(`View details for ${type} with ID: ${id}`);
  
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      {/* Tab */}
      <div className="flex justify-center mb-5">
        <button
          className={`px-6 py-2 mx-2 rounded-lg text-lg ${activeTab === "news" ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("news")}
        >
          News
        </button>
        <button
          className={`px-6 py-2 mx-2 rounded-lg text-lg ${activeTab === "event" ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("event")}
        >
          Events
        </button>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {activeTab === "news" ? (
          <NewsList news={news} onViewDetails={handleViewDetails} />
        ) : (
          <EventList events={events} onViewDetails={handleViewDetails} />
        )}
      </div>
    </div>
  );
};

export default NewsEvents;
