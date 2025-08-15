import { useState } from 'react';
import { 
  FaFilePdf, 
  FaEye, 
  FaDownload, 
  FaTimes, 
  FaPrint,
  FaUser,
  FaFlask,
  FaFileMedical,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';
import profileImage from './6A54F099674598230DAD6592DEF87F4D.pdf.png';
import resumePDF from './6A54F099674598230DAD6592DEF87F4D.pdf (1).pdf';
import './ExamResult.css';

const ExamResult = () => {
  const [showPdf, setShowPdf] = useState(false);

  // Dados do exame
  const examData = {
    patientName: "THAYNARA DE LIMA JAVORSKI",
    examType: "BETA HCG – QUALITATIVO",
    examDate: "13/08/2025",
    result: "Superir a 25 mUI/mL",
    status: "Positivo",
    doctor: "DRA. IZABELA COSTA DE SOUZA",
    lab: "Laboratório Santa Crux",
    thumbnail: profileImage,
    pdfUrl: resumePDF,
    referenceValues: {
      negative: "Inferior a 25 mUI/mL",
      positive: "Superior a 25 mUI/mL"
    }
  };

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = examData.pdfUrl;
    link.download = `resultado_exame_${examData.patientName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printPdf = () => {
    const pdfWindow = window.open(examData.pdfUrl, '_blank');
    pdfWindow?.addEventListener('load', () => {
      setTimeout(() => {
        pdfWindow.print();
      }, 500);
    });
  };

  return (
    <div className="exam-result-container">
      <header className="exam-header">
        <div className="header-content">
          <h1>
            <FaFileMedical className="header-icon" /> 
            Resultado de Exame
          </h1>
          <div className="lab-info">
            <span className="lab-name">
              <FaFlask /> {examData.lab}
            </span>
            <span className="exam-date">{examData.examDate}</span>
          </div>
        </div>
      </header>

      <div className="patient-details">
        <div className="detail-card">
          <FaUser className="detail-icon" />
          <div>
            <h3>Paciente</h3>
            <p>{examData.patientName}</p>
          </div>
        </div>

        <div className="detail-card">
          <FaFlask className="detail-icon" />
          <div>
            <h3>Exame</h3>
            <p>{examData.examType}</p>
          </div>
        </div>

        <div className={`result-card ${examData.status === 'Negativo' ? 'negative' : 'positive'}`}>
          <FaCheckCircle className="result-icon" />
          <div>
            <h3>Resultado</h3>
            <p>{examData.result}</p>
            <span className="result-status">{examData.status}</span>
          </div>
        </div>
      </div>

      <div className="exam-preview-section">
        <div className="preview-container">
          <div 
            className="exam-thumbnail"
            onClick={() => setShowPdf(true)}
            aria-label="Visualizar exame completo"
          >
            <img 
              src={examData.thumbnail} 
              alt="Visualização do exame" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-exam.jpg';
              }}
            />
            <div className="thumbnail-overlay">
              <FaEye className="view-icon" />
              <span>Visualizar Exame Completo</span>
            </div>
          </div>

          <div className="reference-values">
            <h4>
              <FaInfoCircle className="info-icon" /> 
              Valores de Referência
            </h4>
            <ul>
              <li>
                <span className="value">{examData.referenceValues.negative}</span>
                <span className="interpretation">Negativo</span>
              </li>
              <li>
                <span className="value">{examData.referenceValues.positive}</span>
                <span className="interpretation">Indicação de gravidez</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => setShowPdf(true)} className="btn view-btn">
            <FaEye /> Visualizar PDF
          </button>
          <button onClick={downloadPdf} className="btn download-btn">
            <FaDownload /> Baixar Resultado
          </button>
          <button onClick={printPdf} className="btn print-btn">
            <FaPrint /> Imprimir
          </button>
        </div>
      </div>

      {showPdf && (
        <div className="pdf-modal">
          <div className="modal-overlay" onClick={() => setShowPdf(false)} />
          
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <FaFileMedical /> {examData.examType}
              </h3>
              <button 
                onClick={() => setShowPdf(false)} 
                className="close-btn"
                aria-label="Fechar visualização"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="pdf-viewer-container">
              <iframe 
                src={examData.pdfUrl} 
                title={`Resultado do exame - ${examData.patientName}`}
                className="pdf-viewer"
                loading="lazy"
              />
            </div>
            
            <div className="modal-footer">
              <p>Documento com assinatura digital válida</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamResult;