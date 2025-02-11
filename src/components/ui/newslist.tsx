import React from "react";
interface News {
  title: string;
  content: string;
  date: string;
  image: string;
}
//newslist
interface Props {
  news: News[];
  onViewDetails: (id: number, type: "news") => void;
}

const NewsList: React.FC<Props> = ({ news }) => {
  
  return (
    <div className="space-y-5">
      {news.map((item, index) => (
        <div key={index} className="flex bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:translate-y-1">
          <img src={item.image} alt={item.title} className="w-40 object-cover" />
          <div className="p-4 w-3/5">
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.date}</p>
            <p className="text-gray-700 mt-2 line-clamp-3">{item.content}</p>
            <button
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Xem thêm
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
