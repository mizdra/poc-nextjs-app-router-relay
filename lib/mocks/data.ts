import { CommentFactory } from '@/lib/mocks/factory';

export const comments = await CommentFactory.buildList(20);
