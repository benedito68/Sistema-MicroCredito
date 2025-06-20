import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaHandHoldingUsd } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
      remember: false
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to dashboard on successful login
        router.push("/");
      } else {
        setError(result.message || "Credenciais inválidas. Por favor, tente novamente.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sistema de Microcréditos - Login</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <div className="login-container">
        <div className="login-left">
          <div className="logo">
            <FaHandHoldingUsd size={40} />
            <h1>MicroCred</h1>
          </div>
          <h2>Gestão de Microcréditos</h2>
          <p>Solução completa para gerenciamento de pequenos empréstimos e financiamentos</p>
          <div className="illustration">
            <img src="../img/icons/descarregar-removebg-preview.png" alt="Finanças ilustração" />
          </div>
        </div>
        
        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Bem-vindo de volta</h2>
            <p>Por favor, insira suas credenciais para acessar o sistema</p>
            
            {error && (
              <div className="alert alert-danger" style={{ color: "red", marginBottom: "1rem" }}>
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <div className="input-with-icon">
                <FaUser className="icon" />
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Digite seu usuário" 
                  {...register("username", { required: "Usuário é obrigatório" })}
                />
              </div>
              {errors.username && <span className="error">{errors.username.message}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-with-icon">
                <FaLock className="icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="Digite sua senha" 
                  {...register("password", { required: "Senha é obrigatória" })}
                />
                <div className="toggle-password" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember" 
                  {...register("remember")}
                />
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <Link href="/recuperar-senha" className="forgot-password">
                Esqueceu a senha?
              </Link>
            </div>
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </button>
            
            <div className="register-link">
              <p>Não tem uma conta? <Link href="/registro">Criar conta</Link></p>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        /* Reset e Estilos Globais */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
        }

        /* Container Principal */
        .login-container {
          display: flex;
          min-height: 100vh;
        }

        /* Lado Esquerdo - Branding */
        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #4a6cf7 0%, #2541b2 100%);
          color: white;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .logo {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .logo h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-left: 1rem;
        }

        .login-left h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .login-left p {
          font-size: 1rem;
          opacity: 0.9;
          max-width: 400px;
          margin-bottom: 3rem;
        }

        .illustration img {
          max-width: 100%;
          height: auto;
          max-height: 300px;
        }

        /* Lado Direito - Formulário */
        .login-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .login-form {
          background: white;
          padding: 2.5rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 450px;
        }

        .login-form h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        .login-form p {
          color: #7f8c8d;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        /* Grupos de Formulário */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.95rem;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon .icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #7f8c8d;
          font-size: 1rem;
        }

        .input-with-icon input {
          width: 100%;
          padding: 12px 15px 12px 40px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.95rem;
          transition: border 0.3s;
        }

        .input-with-icon input:focus {
          border-color: #4a6cf7;
          outline: none;
          box-shadow: 0 0 0 3px rgba(74, 108, 247, 0.1);
        }

        .toggle-password {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #7f8c8d;
        }

        /* Opções do Formulário */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
        }

        .remember-me input {
          margin-right: 8px;
          cursor: pointer;
        }

        .remember-me label {
          font-size: 0.9rem;
          color: #7f8c8d;
          cursor: pointer;
        }

        .forgot-password {
          font-size: 0.9rem;
          color: #4a6cf7;
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        /* Botão de Login */
        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #4a6cf7;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 1.5rem;
        }

        .login-button:hover {
          background-color: #3a5bd9;
        }

        .login-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        /* Divisor */
        .divider {
          position: relative;
          margin: 1.5rem 0;
          text-align: center;
        }

        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background-color: #ddd;
          z-index: 1;
        }

        .divider span {
          position: relative;
          display: inline-block;
          padding: 0 10px;
          background-color: white;
          color: #7f8c8d;
          font-size: 0.85rem;
          z-index: 2;
        }

        /* Link de Registro */
        .register-link {
          text-align: center;
          font-size: 0.9rem;
          color: #7f8c8d;
        }

        .register-link a {
          color: #4a6cf7;
          text-decoration: none;
          font-weight: 500;
        }

        .register-link a:hover {
          text-decoration: underline;
        }

        .error {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          
          .login-left {
            padding: 2rem 1rem;
          }
          
          .login-right {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default LoginPage;