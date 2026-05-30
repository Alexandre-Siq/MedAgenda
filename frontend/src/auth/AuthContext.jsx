import { createContext, useContext, useMemo, useState } from 'react';
import { apiRequest, isDemoMode } from '../api/client.js';

const STORAGE_KEY = 'medagenda.auth';
const AuthContext = createContext(null);

const demoAuth = {
  token: 'demo-offline-token',
  tokenType: 'Bearer',
  expiresIn: 7200,
  demoMode: true,
  usuario: {
    id: 1,
    nome: 'Dr. Ricardo Lima',
    email: 'dr.ricardo@medagenda.local',
    papel: 'PROFISSIONAL',
    criadoEm: new Date().toISOString(),
  },
};

function readStoredAuth() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;

    if (!parsed || Boolean(parsed.demoMode) !== isDemoMode) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);

  async function login(email, senha) {
    if (isDemoMode) {
      if (!email.trim() || !senha.trim()) {
        throw new Error('Informe e-mail e senha para entrar no modo demo.');
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoAuth));
      setAuth(demoAuth);
      return demoAuth;
    }

    const result = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });

    const nextAuth = {
      token: result.accessToken,
      tokenType: result.tokenType,
      expiresIn: result.expiresIn,
      demoMode: false,
      usuario: result.usuario,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
    setAuth(nextAuth);
    return nextAuth;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: Boolean(auth?.token),
      isDemoMode,
      login,
      logout,
      usuario: auth?.usuario ?? null,
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}
