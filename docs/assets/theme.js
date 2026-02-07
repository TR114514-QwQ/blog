document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 閰嶇疆鍖哄煙 ====================
    const CONFIG = {
        // 鑳屾櫙璁剧疆
        backgroundUrlPC: 'https://g-bg-api.traveler.dpdns.org/h', // PC绔儗鏅�
        backgroundUrlMobile: 'https://g-bg-api.traveler.dpdns.org/v', // 绉诲姩绔儗鏅�
        enableBackground: true
    };
    // ==================== 閰嶇疆缁撴潫 ====================

    // 鑾峰彇褰撳墠椤甸潰璺緞
    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = currentPath.split('/').pop();
    
    // 妫€鏌ュ綋鍓嶉〉闈㈡槸鍚﹀湪鎸囧畾鐨勯〉闈㈠垪琛ㄤ腑
    const shouldApplyStyles = () => {
        // 鏂囩珷椤碉紙鍖呭惈/post璺緞锛�
        if (currentPath.includes('/post')) {
            return true;
        }
        
        // 鍒嗛〉椤甸潰锛坧age*.html锛�
        if (currentPage.startsWith('page') && currentPage.endsWith('.html')) {
            return true;
        }
        
        // 鐗瑰畾椤甸潰 - 娣诲姞 tag.html
        const allowedPages = ['about.html', 'link.html', 'tag.html'];
        if (allowedPages.includes(currentPage)) {
            return true;
        }
        
        // 棣栭〉锛坕ndex.html鎴栨牴鐩綍锛�
        if (currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/')) {
            return true;
        }
        
        return false;
    };
    
    // 濡傛灉褰撳墠椤甸潰涓嶅湪鎸囧畾鍒楄〃涓紝涓嶆墽琛屽悗缁唬鐮�
    if (!shouldApplyStyles()) {
        return;
    }

    // 璁惧妫€娴嬪嚱鏁�
    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // 鑾峰彇瀵瑰簲鐨勮儗鏅疷RL
    const getBackgroundUrl = () => {
        return isMobileDevice() ? CONFIG.backgroundUrlMobile : CONFIG.backgroundUrlPC;
    };

    // 鍒涘缓鏍峰紡鍏冪礌
    let style = document.createElement("style");
    
    // 鑳屾櫙璁剧疆 - 鏍规嵁璁惧绫诲瀷浣跨敤涓嶅悓鐨勮儗鏅�
    if (CONFIG.enableBackground) {
        const backgroundUrl = getBackgroundUrl();
        style.innerHTML += `
            html {
                background: url('${backgroundUrl}') no-repeat center center fixed;
                background-size: cover;
                min-height: 100vh;
                background-attachment: fixed;
            }
            
            /* 缁檅ody娣诲姞鍦嗚骞跺眳涓� */
            body {
                border-radius: 15px;
                margin: 10px auto; /* 娣诲姞澶栬竟璺濊鍦嗚鍙锛宎uto瀹炵幇姘村钩灞呬腑 */
                min-height: calc(100vh - 20px); /* 鍑忓幓涓婁笅澶栬竟璺� */
                max-width: 1200px; /* 璁剧疆鏈€澶у搴� */
                width: calc(100% - 20px); /* 璁剧疆瀹藉害锛屽噺鍘诲乏鍙冲杈硅窛 */
            }
            
            /* 缁橲ideNav border娣诲姞鍦嗚 */
            .SideNav.border {
                border-radius: 10px;
                overflow: hidden; /* 纭繚鍐呴儴鍐呭涔熼€傚簲鍦嗚 */
            }
            
            /* markdown鍐呭鏍峰紡 */
            .markdown-body img {
                border-radius: 10px;
                border: 2px solid #a3e0e4;
            }

            .markdown-alert {
                border-radius: 10px;
            }
            
            /* 绉诲姩绔皟鏁� */
            @media (max-width: 768px) {
                body {
                    border-radius: 10px;
                    margin: 8px auto;
                    min-height: calc(100vh - 16px);
                    max-width: calc(100% - 16px); /* 绉诲姩绔娇鐢ㄧ櫨鍒嗘瘮瀹藉害 */
                    width: auto; /* 绉诲姩绔仮澶嶈嚜鍔ㄥ搴� */
                }
                
                /* 绉诲姩绔皟鏁碨ideNav border鐨勫渾瑙� */
                .SideNav.border {
                    border-radius: 8px;
                }
                
                .markdown-body img {
                    border-radius: 8px;
                }
            }
            
            /* 澶у睆骞曞眳涓晥鏋滀紭鍖� */
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
