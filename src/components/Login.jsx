import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLock, FiArrowRight, FiActivity, FiAlertCircle } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  // Dados de usuário mockados
  const users = [
    { username: '1764071', password: 'AF9FC7', birthDate: '05-10-1998' },
  ];

  // Efeito para limpar o estado ao desmontar
  useEffect(() => {
    return () => {
      setIsLoading(false);
      setIsSuccess(false);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simula uma requisição à API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setIsSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(user));
      navigate('/verify');
    } else {
      setError('Credenciais inválidas. Por favor, tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ '--primary': '#00A9E0', '--secondary': '#003D73', '--accent': '#D80027', '--success': '#4CAF50', '--light': '#B0BEC5' }}>
      <motion.div 
        className="login-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence>
          {isSuccess ? (
            <motion.div
              key="success"
              className="success-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                <div className="success-icon">
                  <FaCheck />
                </div>
              </motion.div>
              <h2>Autenticado com sucesso!</h2>
              <p>Redirecionando para sua conta...</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="login-box"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <motion.div 
                className="login-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="logo-container">
                  <FiActivity className="lab-icon" />
                  <div className="logo-badge">SC</div>
                </div>
                <h1>Laboratório Santa Crux</h1>
                <p>Sistema de Resultados Online</p>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <motion.div
                  className={`input-group ${focusedField === 'username' ? 'focused' : ''}`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Número de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <div className="input-border"></div>
                </motion.div>

                <motion.div
                  className={`input-group ${focusedField === 'password' ? 'focused' : ''}`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Senha de acesso"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <div className="input-border"></div>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="error-message"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiAlertCircle className="error-icon" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  className="login-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      <span>Acessar</span>
                      <FiArrowRight className="button-icon" />
                    </>
                  )}
                </motion.button>
              </form>

              <motion.div
                className="login-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p>Problemas com acesso? <a href="#">Contate o suporte</a></p>
                <div className="security-badge">
                  <div className="shield-icon">🛡️</div>
                  <span>Sistema seguro</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;