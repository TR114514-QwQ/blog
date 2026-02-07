// 自己URL
const FONT_URL = 'https://blog.traveler.dpdns.org/font/HarmonyOS_Sans_SC_Medium.ttf';

const fontStyle = document.createElement('style');
fontStyle.textContent = `
  @font-face {
    font-family: 'Font113332';
    src: url('${FONT_URL}') format('truetype');
  }
  
  * {
    font-family: 'Font113332', sans-serif !important;
  }
`;

document.head.appendChild(fontStyle);
