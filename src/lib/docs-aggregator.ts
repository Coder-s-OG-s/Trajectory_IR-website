import fs from 'fs';
import path from 'path';

interface DocFile {
  relativePath: string;
  url: string;
  title: string;
  description: string;
  content: string;
}

function parseFrontmatter(fileContent: string): { title: string; description: string; body: string } {
  let title = '';
  let description = '';
  let body = fileContent;

  if (fileContent.startsWith('---')) {
    const endFrontmatter = fileContent.indexOf('---', 3);
    if (endFrontmatter !== -1) {
      const frontmatter = fileContent.slice(3, endFrontmatter);
      body = fileContent.slice(endFrontmatter + 3).trim();

      const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
      }

      const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
      if (descMatch) {
        description = descMatch[1].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }

  // Clean MDX tags for plain markdown compatibility
  body = body
    .replace(/<Cards\b[^>]*>([\s\S]*?)<\/Cards>/gi, '$1')
    .replace(/<Card\s+title=["']([^"']+)["']\s+href=["']([^"']+)["'](?:\s+description=["']([^"']+)["'])?\s*\/?>/gi, '- **[$1]($2)**: $3')
    .replace(/<Card\s+href=["']([^"']+)["']\s+title=["']([^"']+)["'](?:\s+description=["']([^"']+)["'])?\s*\/?>/gi, '- **[$2]($1)**: $3');

  return { title, description, body };
}

function getAllDocFiles(dir: string, baseDir: string = dir): DocFile[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const docs: DocFile[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      docs.push(...getAllDocFiles(fullPath, baseDir));
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      const relativePath = path.relative(baseDir, fullPath);
      
      // Calculate doc URL
      let urlPath = relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');
      if (urlPath === 'index') {
        urlPath = '';
      } else if (urlPath.endsWith('/index')) {
        urlPath = urlPath.replace(/\/index$/, '');
      }
      const url = urlPath ? `/docs/${urlPath}` : '/docs';

      const rawContent = fs.readFileSync(fullPath, 'utf-8');
      const { title, description, body } = parseFrontmatter(rawContent);

      docs.push({
        relativePath,
        url,
        title: title || entry.name.replace(/\.mdx?$/, ''),
        description,
        content: body,
      });
    }
  }

  return docs;
}

// Preferred logical ordering for documentation reading
const PREFERRED_ORDER = [
  '/docs',
  '/docs/quickstart',
  '/docs/infrastructure',
  '/docs/lifecycle',
  '/docs/security',
  '/docs/api',
  '/docs/api/trajectory',
  '/docs/api/effect-class',
  '/docs/api/decorators',
  '/docs/api/tir-export',
  '/docs/changelog',
  '/docs/privacy',
  '/docs/terms',
];

export function getAggregatedDocs() {
  const docsDir = path.join(process.cwd(), 'content/docs');
  if (!fs.existsSync(docsDir)) {
    return {
      totalPages: 0,
      fullText: '',
      docs: [],
    };
  }

  const allFiles = getAllDocFiles(docsDir);

  // Sort files according to PREFERRED_ORDER, fallback alphabetically
  allFiles.sort((a, b) => {
    const indexA = PREFERRED_ORDER.indexOf(a.url);
    const indexB = PREFERRED_ORDER.indexOf(b.url);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.url.localeCompare(b.url);
  });

  const header = `# Trajectory IR — Full Documentation Context
> Total Pages: ${allFiles.length} | Generated for AI Agent Analysis & Prompting

This document aggregates the complete official documentation of Trajectory IR.
Trajectory IR is a next-generation durable execution system for AI agents that seals tool executions using RFC 8785 (JCS) & SHA256, guaranteeing 100% crash recovery and zero duplicate side-effects.

---
## Table of Contents
${allFiles.map((doc, i) => `${i + 1}. [${doc.title}](${doc.url}) — ${doc.description || 'Page documentation'}`).join('\n')}

`;

  const formattedPages = allFiles.map((doc) => {
    return `================================================================================
DOCUMENT: ${doc.title}
URL: ${doc.url}
${doc.description ? `DESCRIPTION: ${doc.description}\n` : ''}================================================================================

${doc.content}`;
  });

  const fullText = header + '\n\n' + formattedPages.join('\n\n\n');

  return {
    totalPages: allFiles.length,
    fullText,
    docs: allFiles,
  };
}
