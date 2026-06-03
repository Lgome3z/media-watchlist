import { useState } from 'react'; 
//INTERFACE
export interface MediaItem {
  id: number;
  title: string;
  category: "film" | "soundtrack" | "audiobook";
  status: "want to watch" | "watched";
}


//TEMPORARY LIST
const mockWatchlist: MediaItem[] = [
  {
    id: 1,
    title: "Project Hail Mary",
    category: "film",
    status: "watched"
  },
  {
    id: 2,
    title: "Edward Tulane",
    category: "audiobook",
    status: "want to watch"
  },
  {
    id: 3,
    title: "Interstellar Original Motion Picture Soundtrack",
    category: "soundtrack",
    status: "watched"
  }
];



export default function App() {
  //LIGHTMODE STARTING STATE AND SWITCH FUNCTION
  const [mode, setMode] = useState("Dark");
  function changeMode() {
    if (mode === "Dark") {
      setMode("Light");
    } else {
      setMode("Dark");
    }
  }
//FILTER STARTING STATE AND SWITCH FUNCTION
  const [activeCategory, selectActiveCategory]=useState("All")
  function changeCategory() {
    if (activeCategory==="All")
      selectActiveCategory("Film");
    else if (activeCategory === "Film")
      selectActiveCategory("Soundtrack");
    else if (activeCategory === "Soundtrack")
      selectActiveCategory("All");
  }

//HTML RETURN
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500 ${
      mode === "Light" ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-white"
    }`}>
      <h1 className="text-4xl font-bold mb-8">Media Watchlist!</h1>



      <div className="flex gap-4 mb-4">
        <button onClick={changeCategory} 
        className="bg-sky-600 text-white font-bold py-3 px-5 rounded-lg shadow-xl hover:bg-sky-500 active:scale-95 transition-all">
          {activeCategory}
        </button>
      </div>


      <div className="flex flex-col gap-4 w-full max-w-md">
        {mockWatchlist.map((item) => {
        if (activeCategory!== "All" && item.category.toLocaleLowerCase() !== activeCategory.toLocaleLowerCase()) {
          return null;}
        return (
          <div 
            key={item.id} 
            className={`p-4 rounded-lg border transition-colors duration-500 shadow-md ${
              mode === "Light" 
                ? "bg-white border-slate-200" 
                : "bg-slate-800 border-slate-700"
            }`}
          >
            <h2 className={`text-xl font-bold ${mode === "Light" ? "text-slate-900" : "text-white"}`}>
              {item.title}
            </h2>
            <p className={`capitalize ${mode === "Light" ? "text-slate-500" : "text-slate-400"}`}>
              {item.category} • {item.status}
            </p>
          </div>
        );
        })}
      </div>



      <button 
        onClick={changeMode} 
        className="fixed top-4 left-4 bg-sky-600 text-white font-bold py-3 px-5 rounded-lg shadow-xl hover:bg-sky-500 active:scale-95 transition-all"
      >
        Switch to {mode === "Dark" ? "Light Mode" : "Dark Mode"}
      </button>

    </div>
  );
}









