import { useState, useEffect } from 'react'; 
import { useAuth, login, logout } from "../authcontext"
import { createDbItem, fetchItems, deleteDbItem } from "../listAPI"; 

export type MediaItem = {
  id: string | number; 
  title: string;
  category: string;    
  status: string;    
}

export default function App() {
  const { user } = useAuth();
  const [mode, setMode] = useState("Dark");
  const [activeCategory, selectActiveCategory] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [watchlist, setWatchlist] = useState<MediaItem[]>([]);
  const [newCategory, setNewCategory] = useState("Movie");
  const [newStatus, setNewStatus] = useState("Want to Watch");
  const [needLoad, setNeedLoad] = useState(true);

  // API Loading: Securely handles the async database pull once user auth resolves
  useEffect(() => {
    async function loadItems() {
      if (!user || !user.uid) return; // TypeScript safety guard
      try {
        const data = await fetchItems(user.uid);
        setWatchlist(data);
      } catch (error) {
        console.error("Error fetching watchlist from Firebase:", error);
      }
    }
    if (user && needLoad) {
      loadItems(); 
      setNeedLoad(false);
    }
  }, [user, needLoad]);

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

  async function addItem() {
    if (newTitle.trim() === "" || !user || !user.uid) return;

    try {
      // 1. Write the new item to your live Firestore cloud instance
      const newItem = await createDbItem(user.uid, newTitle, newCategory, newStatus);
      
      // 2. FIX: Combine the new item with your current array to trigger an instant UI re-render
      setWatchlist([...watchlist, newItem]);
      setNewTitle(""); 
    } catch (error) {
      console.error("Error adding item to Firestore:", error);
    }
  }

  async function removeItem(id: string | number) {
    if (!user || !user.uid) return;

    try {
      // 1. FIX: Migrate from localhost to your public deleteDbItem cloud API function
      await deleteDbItem(user.uid, id.toString());
      
      // 2. Filter out the targeted item locally to snap the layout into place instantly
      setWatchlist(watchlist.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing item from Firestore:", error);
    }
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-24 px-4 pb-8 transition-colors duration-500 ${
      mode === "Light" ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-white"
    }`}>
      
      <h1 className="text-4xl font-bold mb-8 text-center">Media Watchlist!</h1>
      
      <div className="mb-6">
        {user ? (
          <button onClick={logout} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all">
            Sign out with Google
          </button>
        ) : (
          <button onClick={login} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all">
            Sign in with Google
          </button>
        )}
      </div>

      {/* MOBILE RESPONSIVE CONTROL PANEL */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full max-w-md justify-center px-2">
        <input
          type="text"
          placeholder="Add new media..."
          value={newTitle} 
          disabled={!user}
          onChange={(e) => setNewTitle(e.target.value)} 
          className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors w-full disabled:opacity-50" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors bg-slate-800 w-full disabled:opacity-50"}
        />

        <div className="flex gap-2 w-full">
          <select 
            value={newCategory}
            disabled={!user}
            onChange={(e) => setNewCategory(e.target.value)}
            className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors bg-white w-1/2 disabled:opacity-50" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors bg-slate-800 w-1/2 disabled:opacity-50"}
          >
            <option value="Movie">Movie</option>
            <option value="Soundtrack">Soundtrack</option>
            <option value="Audiobook">Audiobook</option>
          </select>

          <select 
            value={newStatus}
            disabled={!user}
            onChange={(e) => setNewStatus(e.target.value)}
            className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors bg-white w-1/2 disabled:opacity-50" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors bg-slate-800 w-1/2 disabled:opacity-50"}
          >
            <option value="Want to Watch">Want to Watch</option>
            <option value="Watched">Watched</option>
          </select>
        </div>
        
        <button 
          onClick={addItem}
          disabled={!user}
          className="bg-emerald-600 text-white font-bold p-3 sm:px-5 rounded-lg shadow-md hover:bg-emerald-500 active:scale-95 transition-all w-full sm:w-auto disabled:opacity-50"
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

      {/* DYNAMIC CARD RENDER LAYOUT */}
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