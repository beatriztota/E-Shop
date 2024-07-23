import {
    FacebookLogo,
    InstagramLogo,
    TwitterLogo,
    YoutubeLogo
  } from 'phosphor-react';
  import './Footer.css'; 
  
  export function Footer() {
    return (
      <div className="footer-container">
        <img src={'/wave.svg'} alt="waves" className="footer-wave" />
        <div className="footer-wrapper">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-newsletter">
                <h1 className="footer-title">
                  <span className="title-highlight">E-</span>Shop
                </h1>
                <p className="footer-description">Fique por dentro das novidades!!</p>
                <input
                  className="footer-input"
                  type="email"
                  placeholder="Cadastre seu email"
                />
                <button className="footer-button">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="footer-right">
              <a
                href="https://www.youtube.com/"
                className="social-icon"
              >
                <YoutubeLogo size={32} weight="bold" />
              </a>
  
              <a
                href="https://www.facebook.com/"
                className="social-icon"
              >
                <FacebookLogo size={32} weight="bold" />
              </a>
  
              <a
                href="http://www.instagram.com/"
                className="social-icon"
              >
                <InstagramLogo size={32} weight="bold" />
              </a>
  
              <a
                href="https://wwww.twitter.com"
                className="social-icon"
              >
                <TwitterLogo size={32} weight="bold" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          Copyright © Feito com ❤ por Beatriz.
        </div>
      </div>
    );
  }
  