const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; {new Date().getFullYear()} MicroCred. Todos os direitos reservados.</p>
          </div>
          <div className="footer-right">
            <ul className="footer-links">
              <li><a href="#">Suporte</a></li>
              <li><a href="#">Central de Ajuda</a></li>
              <li><a href="#">Privacidade</a></li>
              <li><a href="#">Termos</a></li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          padding: 1rem 2rem;
          background-color: white;
          border-top: 1px solid #eee;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .footer-left p {
          color: #6c757d;
          font-size: 0.875rem;
          margin: 0;
        }
        
        .footer-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .footer-links li {
          margin-left: 1.5rem;
        }
        
        .footer-links a {
          color: #6c757d;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        
        .footer-links a:hover {
          color: #2e3a59;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-right {
            margin-top: 1rem;
          }
          
          .footer-links {
            justify-content: center;
          }
          
          .footer-links li {
            margin: 0 0.75rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;