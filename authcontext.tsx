/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, provider } from "./secrets/firebase";


type AuthContextType = {
    user: User | null
};
const AuthContext = createContext<AuthContextType>({
    user: null,
});


export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User | null>(null);

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
setUser(currentUser);

});

return unsubscribe;
}, []);

return (
<AuthContext.Provider value={{ user }}>
{children}
</AuthContext.Provider>
);


}
export function login() {
  signInWithPopup(auth, provider);
}

export async function logout() {
  await signOut(auth);
}

export function useAuth() {
   return useContext(AuthContext);
}
