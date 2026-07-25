document.addEventListener('DOMContentLoaded', function() {
    
    const CONFIG = {
        backgroundUrlPC: 'https://g-bg-api.traveler.dpdns.org/h',
        backgroundUrlMobile: 'https://g-bg-api.traveler.dpdns.org/v',
        enableBackground: true
    };

    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = currentPath.split('/').pop();
    
    const shouldApplyStyles = () => {
        if (currentPath.includes('/post')) return true;
        if (currentPage.startsWith('page') && currentPage.endsWith('.html')) return true;
        const allowedPages = ['about.html', 'link.html', 'tag.html'];
        if (allowedPages.includes(currentPage)) return true;
        if (currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/')) return true;
        return false;
    };
    
    if (!shouldApplyStyles()) return;

    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const getBackgroundUrl = () => {
        return isMobileDevice() ? CONFIG.backgroundUrlMobile : CONFIG.backgroundUrlPC;
    };

    let style = document.createElement("style");
    
    if (CONFIG.enableBackground) {
        const backgroundUrl = getBackgroundUrl();
        style.innerHTML += `
            :root {
                --glass-body: rgba(255, 255, 255, 0.55);
                --glass-card: rgba(255, 255, 255, 0.40);
                --glass-content: rgba(255, 255, 255, 0.30);
                --glass-alert: rgba(255, 255, 255, 0.20);
                --glass-border: rgba(163, 224, 228, 0.60);
            }
            html[data-color-mode="dark"] {
                --glass-body: rgba(20, 20, 30, 0.70);
                --glass-card: rgba(20, 20, 30, 0.55);
                --glass-content: rgba(20, 20, 30, 0.45);
                --glass-alert: rgba(20, 20, 30, 0.35);
                --glass-border: rgba(100, 180, 200, 0.60);
            }

            html {
                background: url('${backgroundUrl}') no-repeat center center fixed;
                background-size: cover;
                min-height: 100vh;
                background-attachment: fixed;
            }
            
            body {
                border-radius: 15px;
                margin: 10px auto;
                min-height: calc(100vh - 20px);
                max-width: 1200px;
                width: calc(100% - 20px);
                background: var(--glass-body);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }
            
            .SideNav.border {
                border-radius: 10px;
                overflow: hidden;
                background: var(--glass-card);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
            }
            
            .markdown-body {
                background: var(--glass-content);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                padding: 20px;
                border-radius: 10px;
            }

            .markdown-body img {
                border-radius: 10px;
                border: 2px solid var(--glass-border);
            }

            .markdown-alert {
                border-radius: 10px;
                background: var(--glass-alert);
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
            }
            
            @media (max-width: 768px) {
                body {
                    border-radius: 10px;
                    margin: 8px auto;
                    min-height: calc(100vh - 16px);
                    max-width: calc(100% - 16px);
                    width: auto;
                }
                .SideNav.border {
                    border-radius: 8px;
                }
                .markdown-body img {
                    border-radius: 8px;
                }
            }
            
            @media (min-width: 1200px) {
                body {
                    margin-left: auto;
                    margin-right: auto;
                }
            }
        `;
    }

    document.head.appendChild(style);
});
