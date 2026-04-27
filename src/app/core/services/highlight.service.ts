import { Injectable } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import yaml from 'highlight.js/lib/languages/yaml';
import bash from 'highlight.js/lib/languages/bash';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import java from 'highlight.js/lib/languages/java';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import properties from 'highlight.js/lib/languages/properties';
import nginx from 'highlight.js/lib/languages/nginx';

@Injectable({ providedIn: 'root' })
export class HighlightService {
  private initialized = false;

  init(): void {
    if (this.initialized) return;
    hljs.registerLanguage('yaml', yaml);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('shell', bash);
    hljs.registerLanguage('dockerfile', dockerfile);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('html', xml);
    hljs.registerLanguage('properties', properties);
    hljs.registerLanguage('nginx', nginx);
    this.initialized = true;
  }

  highlightAll(container: HTMLElement): void {
    this.init();
    container.querySelectorAll('pre code[class*="language-"]').forEach(block => {
      hljs.highlightElement(block as HTMLElement);
    });
  }

  addCopyButtons(container: HTMLElement): void {
    container.querySelectorAll('.code-block').forEach(block => {
      if (block.querySelector('.copy-btn')) return;
      const header = block.querySelector('.code-header');
      if (!header) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copier';
      btn.addEventListener('click', () => {
        const code = block.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent || '').then(() => {
            btn.textContent = '✓ Copié';
            setTimeout(() => btn.textContent = 'Copier', 2000);
          });
        }
      });
      header.appendChild(btn);
    });
  }
}
