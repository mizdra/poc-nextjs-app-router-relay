import styles from '@/components/Avatar.module.css';
import { GraphQLImage } from '@/components/GraphQLImage';

export function Avatar({
  user,
  alt,
  hideName = false,
}: {
  user: { name: string; avatar: { url: string; width: number; height: number } };
  alt: string;
  hideName?: boolean;
}) {
  return (
    <span className={styles.container}>
      <GraphQLImage className={styles.avatar} src={user.avatar} width={32} height={32} alt={alt} />
      {!hideName && <span>{user.name}</span>}
    </span>
  );
}
