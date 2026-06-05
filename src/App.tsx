import { useState, useEffect } from 'react'; 

export interface MediaItem {
  id: string | number; 
  title: string;
  category: string;    
  status: string;    
}


export default function App() {
  const [mode, setMode] = useState("Dark");
  const [activeCategory, selectActiveCategory] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [watchlist, setWatchlist] = useState<MediaItem[]>([]);
  const [newCategory, setNewCategory] = useState("Movie");
  const [newStatus, setNewStatus] = useState("Want to Watch");

  // Fetch data automatically from backend port 5001
  useEffect(() => {
    fetch('http://localhost:5001/api/watchlist')
      .then(response => response.json())
      .then(data => {
        setWatchlist(data);
      })
      .catch(error => console.error("Error fetching watchlist from backend:", error));
  }, []);

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

  // 1. Assemble the fresh item object structure
  const newItem = {
    id: Date.now().toString(), // Generates a unique timestamp string barcode
    title: newTitle,
    category: newCategory,
    status: newStatus
  };

  // 2. Shoot a POST network request to hand this data to our Express server
  fetch('http://localhost:5001/api/watchlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem), // Convert our JavaScript object into a text stream string
  })
    .then(response => response.json())
    .then(updatedList => {
      // 3. Pour the server's freshly updated list directly into our React state
      setWatchlist(updatedList); 
      setNewTitle(""); // Clear out the input bar for the next entry
    })
    .catch(error => console.error("Error adding item to backend:", error));
}

 function removeItem(id: string | number) { // GO OVER THIS
  // 1. Send a DELETE request to the server with the item's unique ID barcode
  fetch(`http://localhost:5001/api/watchlist/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(updatedList => {
      // 2. The server sends back the fresh list without that item. Update the screen!
      setWatchlist(updatedList);
    })
    .catch(error => console.error("Error removing item from backend:", error));
}

  // HTML RETURN
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
          className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors"}
        />

        <select 
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors"}
        >
          <option value="Movie">Movie</option>
          <option value="Soundtrack">Soundtrack</option>
          <option value="Audiobook">Audiobook</option>
        </select>

        <select 
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className={mode === "Light" ? "p-3 border rounded-lg text-black flex-grow shadow-sm transition-colors" : "p-3 border rounded-lg text-white flex-grow shadow-sm transition-colors"}
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
        className="fixed top-4 left-4 bg-sky-600 text-white font-bold py-3 px-5 rounded-lg shadow-xl hover:bg-sky-500 active:scale-95 transition-all"
      >
        Switch to {mode === "Dark" ? "Light Mode" : "Dark Mode"}
      </button>

    </div>
  );
}