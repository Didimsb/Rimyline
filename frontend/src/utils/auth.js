// Utilitaires d'authentification
export const authUtils = {
  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    const authData = localStorage.getItem("adminAuth");
    if (!authData) return false;

    try {
      const parsedAuth = JSON.parse(authData);
      
      // Vérifier si la session est valide (expiration après 24h)
      const sessionTimeout = 24 * 60 * 60 * 1000; // 24 heures
      if (Date.now() - parsedAuth.timestamp > sessionTimeout) {
        localStorage.removeItem("adminAuth");
        return false;
      }

      return parsedAuth.isLogged && parsedAuth.username === "Vetia";
    } catch (error) {
      localStorage.removeItem("adminAuth");
      return false;
    }
  },

  // Obtenir les données d'authentification
  getAuthData: () => {
    const authData = localStorage.getItem("adminAuth");
    if (!authData) return null;

    try {
      return JSON.parse(authData);
    } catch (error) {
      localStorage.removeItem("adminAuth");
      return null;
    }
  },

  // Se déconnecter
  logout: () => {
    localStorage.removeItem("adminAuth");
  },

  // Se connecter
  login: (username, password) => {
    const USER = "Vetia";
    const PASS_HASH = btoa("Vetia_27350505");

    if (username === USER && btoa(password) === PASS_HASH) {
      const loginData = {
        isLogged: true,
        username: USER,
        timestamp: Date.now()
      };
      localStorage.setItem("adminAuth", JSON.stringify(loginData));
      return true;
    }
    return false;
  }
};