import React, {
  createContext,
  useEffect,
  useState,
  useRef,
} from 'react';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

interface AuthContextType {
  user: any;
  loading: boolean;

  sendOtp: (phone: string) => Promise<void>;

  verifyOtp: (code: string) => Promise<void>;

  logout: () => Promise<void>;

  saveRole: (role: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,

  sendOtp: async () => {},

  verifyOtp: async () => {},

  logout: async () => {},

   saveRole: async () => {},
});

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

 const confirmationRef = useRef<any>(null);

  // 🔥 Persist Login
  useEffect(() => {
    const unsubscribe =
      auth().onAuthStateChanged(currentUser => {
        setUser(currentUser);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  // 📲 Send OTP
  const sendOtp = async (phone: string) => {
    try {
      const confirmationResult =
        await auth().signInWithPhoneNumber(phone);

     confirmationRef.current =
      confirmationResult;
    } catch (error) {
      throw error;
    }
  };

  // 🔐 Verify OTP
const verifyOtp = async (code: string) => {
  try {
    if (!confirmationRef.current) {
      throw new Error('OTP session expired');
    }

    const result =
      await confirmationRef.current.confirm(
        code,
      );

    return result;
  } catch (error) {
    throw error;
  }
};

  // 🚪 Logout
  const logout = async () => {
    await auth().signOut();
  };


 // SaveRole
  const saveRole = async (role: string) => {
  try {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    await firestore()
      .collection('users')
      .doc(currentUser.uid)
      .set({
        uid: currentUser.uid,
        phone: currentUser.phoneNumber,
        role: role,
        createdAt:
          firestore.FieldValue.serverTimestamp(),
      });

  } catch (error) {
    throw error;
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        sendOtp,
        verifyOtp,
        logout,
        saveRole,
      }}>
      {children}
    </AuthContext.Provider>
  );
};