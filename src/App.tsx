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
  const [mode, setMode] = useState("Dark");
  const [activeCategory, selectActiveCategory] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [watchlist, setWatchlist] = useState(mockWatchlist);
  const [newcateogry, setNewCategory] = useState("film")
  const [newstatus, setNewSatus] = useState("want to watch")

  function changeMode() {
    if (mode === "Dark") {
      setMode("Light");
    } else {
      setMode("Dark");
    }
  }

  function changeCategory() {
    if (activeCategory === "All") {
      selectActiveCategory("Film");
    } else if (activeCategory === "Film") {
      selectActiveCategory("Soundtrack");
    } else if (activeCategory === "Soundtrack") {
      selectActiveCategory("Audiobook");}
      else if (activeCategory=== "Audiobook") {
      selectActiveCategory("All");}
    }

  function addItem() {
    if (newTitle.trim() === "") return;

    const newItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newcateogry,
      status: newstatus
    };

    setWatchlist([...watchlist, newItem]);
    setNewTitle("");
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-16 px-8 pb-8 transition-colors duration-500 ${
      mode === "Light" ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-white"
    }`}>
      
      <h1 className="text-4xl font-bold mb-8">Media Watchlist!</h1>

      <div className="flex gap-2 mb-6 w-full max-w-md justify-center">
        <input 
          type="text"
          placeholder="Add new media..." 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          className={mode==="Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors": "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors"}
        />


<select //DROP DOWN MENU
  value={newcateogry}
  onChange={(e) => setNewCategory(e.target.value)}
  className={mode==="Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors": "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors"}
>
  <option value="Film">film</option>
  <option value="Soundtrack">soundtrack</option>
  <option value="Audiobook">audiobook</option>
</select>

<select 
  value={newstatus}
  onChange={(e) => setNewSatus(e.target.value)}
  className= {mode==="Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors": "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors"}
>
  <option value="Want to Watch">Want to Watch</option>
  <option value="Watched">Watched</option>
</select>

        

        
        <button 
          onClick={addItem}
          className="bg-emerald-600 text-white font-bold px-5 rounded-lg shadow-md hover:bg-emerald-500 active:scale-95 transition-all"
        >
          Add
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <button 
          onClick={changeCategory} 
          className="bg-sky-600 text-white font-bold py-3 px-5 rounded-lg shadow-xl hover:bg-sky-500 active:scale-95 transition-all"
        >
          Filter: {activeCategory}
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {watchlist.map((item) => {
          if (activeCategory !== "All" && item.category.toLowerCase() !== activeCategory.toLowerCase()) {
            return null; 
          }
        
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
  );}