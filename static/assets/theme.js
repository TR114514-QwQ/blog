document.addEventListener('DOMContentLoaded', function() {
    
    const CONFIG = {
        backgroundUrlPC: 'https://g-bg-api.traveler.dpdns.org/h',
        backgroundUrlMobile: 'https://g-bg-api.traveler.dpdns.org/v',
        enableBackground: true
    };

    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = currentPath.split('/').pop();
    
    const shouldApplyStyles = () => {
        if (currentPath.includes('/post')) {
            return true;
        }
        
        if (currentPage.startsWith('page') && currentPage.endsWith('.html')) {
            return true;
        }
        
        const allowedPages = ['about.html', 'link.html', 'tag.html'];
        if (allowedPages.includes(currentPage)) {
            return true;
        }
        
        if (currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/')) {
            return true;
        }
        
        return false;
    };
    
    if (!shouldApplyStyles()) {
        return;
    }

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
            }
            
            .SideNav.border {
                border-radius: 10px;
                overflow: hidden; 
            }
            
            .markdown-body img {
                border-radius: 10px;
                border: 2px solid #a3e0e4;
            }

            .markdown-alert {
                border-radius: 10px;
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
