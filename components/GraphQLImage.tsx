import type { GraphQLImage_image$key } from '@/components/__generated__/GraphQLImage_image.graphql';
import Image, { type ImageProps } from 'next/image';
import { graphql, readInlineData } from 'relay-runtime';

/** Wrapper to allow to easily pass GraphQL's `Image` types to `<Image>` */
export function GraphQLImage({ src, ...restProps }: Omit<ImageProps, 'src'> & { src: GraphQLImage_image$key }) {
  const { url, width, height } = readInlineData(
    graphql`
    fragment GraphQLImage_image on Image @inline {
      url
      width
      height
    }
  `,
    src,
  );
  return <Image src={{ src: url, width: width, height: height }} {...restProps} />;
}
