import { visit } from 'unist-util-visit';

/**
 * Remark plugin that transforms ```mermaid code blocks into
 * <Mermaid chart="..." /> JSX elements before Fumadocs'
 * rehype-code syntax highlighter processes them.
 */
export function remarkMermaid() {
  return (tree: any) => {
    visit(tree, 'code', (node: any, index: number | undefined, parent: any) => {
      if (node.lang !== 'mermaid' || index === undefined || !parent) return;

      // Replace the code node with an mdxJsxFlowElement
      // that renders the <Mermaid> React component
      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'Mermaid',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'chart',
            value: node.value,
          },
        ],
        children: [],
        data: { _mdxExplicitJsx: true },
      };
    });
  };
}
