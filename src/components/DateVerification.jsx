import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaCheck, FaLock, FaShieldAlt } from 'react-icons/fa';
import { FiAlertCircle, FiChevronRight } from 'react-icons/fi';
import './DateVerification.css';

const DateVerification = () => {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  // Data de nascimento esperada (formato DD-MM-YYYY)
  const expectedBirthDate = '05-10-1998';

  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simula processamento
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Converte a data para o formato DD-MM-YYYY para comparação
    const formattedDate = birthDate.split('-').reverse().join('-');
    
    if (formattedDate === expectedBirthDate) {
      setIsSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      navigate('/result');
    } else {
      setError('A data de nascimento não corresponde aos nossos registros');
      setIsLoading(false);
    }
  };

  return (
    <div className="date-verification-page">
      <motion.div 
        className="verification-container"
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
              <h2>Verificação concluída com sucesso!</h2>
              <p>Seus resultados estão sendo carregados...</p>
              <div className="progress-bar">
                <motion.div
                  className="progress"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="verification-box"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="security-banner">
                <FaShieldAlt className="shield-icon" />
                <span>Verificação de Segurança</span>
              </div>

              <motion.div 
                className="verification-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2>Confirme sua identidade</h2>
                <p>Por medidas de segurança, informe sua data de nascimento cadastrada</p>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <motion.div
                  className={`input-group ${focused ? 'focused' : ''}`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="birthDate">Data de Nascimento</label>
                  <div className="input-wrapper">
                    <FaCalendarAlt className="input-icon" />
                    <input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      required
                    />
                    <div className="input-border"></div>
                  </div>
                  
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
                  className="verify-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  disabled={isLoading || !birthDate}
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      Continuar <FiChevronRight className="button-icon" />
                    </>
                  )}
                </motion.button>
              </form>

              <motion.div
                className="security-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="lock-icon">
                  <FaLock />
                </div>
                <p>Esta informação é usada apenas para verificação de identidade e não será armazenada.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DateVerification;