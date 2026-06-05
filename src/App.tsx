import { useState } from 'react'; 

export interface MediaItem {
  id: string | number; 
  title: string;
  category: string;    
  status: string;    
}

// Brought back the local list so the app works anywhere without a backend server
const mockWatchlist: MediaItem[] = [
  { id: 1, title: "Inception", category: "Movie", status: "Watched" },
  { id: 2, title: "Interstellar", category: "Movie", status: "Want to Watch" },
  { id: 3, title: "Edward Tulane", category: "Audiobook", status: "Want to Watch" },
  { id: 4, title: "Project Hail Mary", category: "Soundtrack", status: "Watched" }
];

export default function App() {
  const [mode, setMode] = useState("Dark");
  const [activeCategory, selectActiveCategory] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [watchlist, setWatchlist] = useState<MediaItem[]>(mockWatchlist); // Initialized with mock data
  const [newCategory, setNewCategory] = useState("Movie");
  const [newStatus, setNewStatus] = useState("Want to Watch");

  function changeMode() {
    if (mode === "Dark") {
      setMode("Light");
    } else {
      setMode("Dark");
    }
  }

  function changeCategory() {
    if (activeCategory === "All") {
      selectActiveCategory("Movie");
    } else if (activeCategory === "Movie") {
      selectActiveCategory("Soundtrack");
    } else if (activeCategory === "Soundtrack") {
      selectActiveCategory("Audiobook");
    } else if (activeCategory === "Audiobook") {
      selectActiveCategory("All");
    }
  }

  function addItem() {
    if (newTitle.trim() === "") return;

    const newItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      status: newStatus
    };

    // Updates state strictly locally
    setWatchlist([...watchlist, newItem]);
    setNewTitle("");
  }

  function removeItem(id: string | number) {
    // Updates state strictly locally
    setWatchlist(watchlist.filter(item => item.id !== id));
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-24 px-4 pb-8 transition-colors duration-500 ${
      mode === "Light" ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-white"
    }`}>
      
      <h1 className="text-4xl font-bold mb-8 text-center">Media Watchlist!</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full max-w-md justify-center px-2">
        <input
          type="text"
          placeholder="Add new media..."
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors w-full" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors bg-slate-800 w-full"}
        />

        <div className="flex gap-2 w-full">
          <select 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors bg-white w-1/2" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors bg-slate-800 w-1/2"}
          >
            <option value="Movie">Movie</option>
            <option value="Soundtrack">Soundtrack</option>
            <option value="Audiobook">Audiobook</option>
          </select>

          <select 
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors bg-white w-1/2" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors bg-slate-800 w-1/2"}
          >
            <option value="Want to Watch">Want to Watch</option>
            <option value="Watched">Watched</option>
          </select>
        </div>
        
        <button 
          onClick={addItem}
          className="bg-emerald-600 text-white font-bold p-3 sm:px-5 rounded-lg shadow-md hover:bg-emerald-500 active:scale-95 transition-all w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      <div className="flex gap-4 mb-4 w-full max-w-md justify-center px-2">
        <button 
          onClick={changeCategory} 
          className="bg-sky-600 text-white font-bold py-3 px-5 rounded-lg shadow-xl hover:bg-sky-500 active:scale-95 transition-all w-full"
        >
          Filter: {activeCategory}
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md px-2">
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
              <div className={`flex justify-between items-center capitalize mt-1 ${mode === "Light" ? "text-slate-500" : "text-slate-400"}`}>
                <span>{item.category} • {item.status}</span>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <button 
        onClick={changeMode} 
        className="fixed top-4 left-4 bg-sky-600 text-white font-bold py-3 px-5 rounded-lg shadow-xl hover:bg-sky-500 active:scale-95 transition-all z-50"
      >
        Switch to {mode === "Dark" ? "Light Mode" : "Dark Mode"}
      </button>

    </div>
  );
}