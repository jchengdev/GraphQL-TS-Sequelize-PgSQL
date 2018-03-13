import { GraphQLFieldResolver } from 'graphql';

import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../../interfaces/ResolverContextInterface';

export const dummyResolver: ComposableResolver<any, ResolverContext> =
  (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {
    return (parent, args, context, info) => {
      return resolver(parent, args, context, info);
    };
    //JUST FOR TEST CASE COVERAGE
  };