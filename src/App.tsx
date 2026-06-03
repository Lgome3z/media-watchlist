import { useState } from 'react'; 

export interface MediaItem {
  id: number;
  title: string;
  category: "film" | "soundtrack" | "audiobook";
  status: "want to watch" | "watched";
}



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
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white">
        Media Watchlist!
      </h1>
      <div className="mt-8 flex flex-col gap-4">
        {mockWatchlist.map((item) => (
          <div key={item.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white">{item.title}</h2>
            <p className="text-slate-400 capitalize">{item.category} • {item.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}



function LightMode() {
  // first step is to identify the current item value thorugh useState
  const [mode, setMode]= useState("Dark")
  // second step is to create our javascript switcher function
  changeMode() {
    if (mode==="Dark")
      setMode("Light")
    else setMode("Dark")
  }
  //third step is to create the HTML output for the function
  return(
    <button onClick={changeMode} className="bg-white p-4 ml-5 fixed top-0 left-0">
      Light Mode!
    </button>
  )





}










