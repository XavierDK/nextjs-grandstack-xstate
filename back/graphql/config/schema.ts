import { makeAugmentedSchema } from '@neo4j/graphql';
import { typeDefs } from './typeDefs';
import config from '../../../web/constants/config';

export const augmentedSchema = makeAugmentedSchema({
  typeDefs,
  debug: config.isDebugEnabled
});
