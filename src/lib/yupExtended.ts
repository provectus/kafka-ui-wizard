import * as yup from 'yup';
import { get } from 'svelte/store';
import clustersStore from '../stores/clustersStore';
import type { AnyObject, Maybe } from 'yup/lib/types';

yup.addMethod<yup.StringSchema>(yup.string, 'uniqClusterName', function () {
  return this.test('isUniq', 'A cluster with the same name already exists', function (value) {
    const dublicate = get(clustersStore).find(({ clusterName }) => clusterName === value);
    if (dublicate && dublicate.id !== this.parent.id) {
      return this.createError();
    }
    return true;
  });
});

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    uniqClusterName(): StringSchema<TType, TContext>;
  }
}

export default yup;
