import Prism from 'prismjs';
import 'prismjs/plugins/autoloader/prism-autoloader';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.min.css';
import { useEffect } from 'react';

const PRISM_JS_PATH = 'https://npm.elemecdn.com/prismjs@1.29.0/components/';

/**
 * @url https://github.com/tangly1024/NotionNext/blob/main/components/PrismMac.js
 */
export const PrismMac = () => {
  useEffect(() => {
    renderPrismMac();
    renderMermaid();

    const observer = new MutationObserver((mutationsList: any) => {
      for (const m of mutationsList) {
        if (m.target.nodeName === 'DETAILS') {
          const preCodes = m.target.querySelectorAll('pre.notion-code');
          for (const preCode of preCodes) {
            Prism.plugins.lineNumbers.resize(preCode);
          }
        }
      }
    });
    observer.observe(document.querySelector('#container'), { attributes: true, subtree: true });
  }, []);
  return <></>;
};

const renderMermaid = async () => {
  const mermaidPres: any = document.querySelectorAll('pre.notion-code.language-mermaid');
  if (mermaidPres) {
    for (const e of mermaidPres) {
      const chart = e.querySelector('code').textContent;
      if (chart && !e.querySelector('.mermaid')) {
        const m = document.createElement('div');
        m.className = 'mermaid';
        m.innerHTML = chart;
        e.appendChild(m);
      }
    }
  }

  const mermaidsSvg: any = document.querySelectorAll('.mermaid');
  if (mermaidsSvg) {
    let needLoad = false;
    for (const e of mermaidsSvg) {
      if (e?.firstChild?.nodeName !== 'svg') {
        needLoad = true;
      }
    }
    if (needLoad) {
      const asyncMermaid = await import('mermaid');
      asyncMermaid.default.contentLoaded();
    }
  }
};

function renderPrismMac() {
  const container = document?.getElementById('container-inner');

  try {
    // setup autoloader
    Prism.plugins.autoloader.languages_path = PRISM_JS_PATH;
    Prism.highlightAll();
  } catch (err) {
    console.log('代码渲染', err);
  }

  const codeToolBars = container?.getElementsByClassName('code-toolbar');
  // Add pre-mac element for Mac Style UI
  if (codeToolBars) {
    Array.from(codeToolBars).forEach((item: any) => {
      const existPreMac = item.getElementsByClassName('pre-mac');
      if (existPreMac.length < codeToolBars.length) {
        const preMac = document.createElement('div');
        preMac.classList.add('pre-mac');
        preMac.innerHTML = '<span></span><span></span><span></span>';
        item?.appendChild(preMac, item);
      }
    });
  }
}
