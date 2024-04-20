import Image, { type ImageProps } from 'next/image';

type GraphQLImageType = {
  url: string;
  width: number;
  height: number;
};

export function GraphQLImage({ src, ...restProps }: Omit<ImageProps, 'src'> & { src: GraphQLImageType }) {
  return <Image src={{ src: src.url, width: src.width, height: src.height }} {...restProps} />;
}
