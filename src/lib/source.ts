import { loader } from 'fumadocs-core/source';
import { docs, meta } from '../../.source/server';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const source = loader({
  baseUrl: '/docs',
  source: toFumadocsSource(docs, meta),
});
