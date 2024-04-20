import { GraphQLImage } from '@/components/GraphQLImage';
import styles from '@/components/User.module.css';
import type { User_user$key } from '@/components/__generated__/User_user.graphql';
import { graphql, readInlineData } from 'relay-runtime';

export function User({
  user,
}: {
  user: User_user$key;
  hideName?: boolean;
}) {
  const { name, avatar } = readInlineData(
    graphql`
    fragment User_user on User @inline {
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
      <GraphQLImage className={styles.avatar} src={avatar} width={32} height={32} alt="" />
      <span>{name}</span>
    </span>
  );
}
