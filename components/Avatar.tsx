import styles from '@/components/Avatar.module.css';
import { GraphQLImage } from '@/components/GraphQLImage';
import type { Avatar_user$key } from '@/components/__generated__/Avatar_user.graphql';
import { graphql, readInlineData } from 'relay-runtime';

export function Avatar({
  user,
  alt,
  hideName = false,
}: {
  user: Avatar_user$key;
  alt: string;
  hideName?: boolean;
}) {
  const { name, avatar } = readInlineData(
    graphql`
    fragment Avatar_user on User @inline {
      name
      avatar {
        ...GraphQLImage_image
      }
    }
  `,
    user,
  );
  return (
    <span className={styles.container}>
      <GraphQLImage className={styles.avatar} src={avatar} width={32} height={32} alt={alt} />
      {!hideName && <span>{name}</span>}
    </span>
  );
}
