import * as userMutation from './User';
import * as todoMutation from './Todo';

export const Mutation = {
 ...userMutation,
 ...todoMutation
}