import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          console.warn('Trying to sign in');
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.warn('This', e);
          }
        },
        register: async (email, password) => {
          console.warn('Trying to sign up');
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.warn('This', e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
