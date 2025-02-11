import { Document } from 'mongoose';

export function serialize<T>(doc: any): T {
  if (!doc) return doc;

  const obj = doc.toJSON ? doc.toJSON() : JSON.parse(JSON.stringify(doc));

  if (Array.isArray(obj)) {
    return obj.map(item => ({
      ...item,
      id: item._id?.toString() || item.id,
      _id: undefined,
      __v: undefined,
      password: undefined
    })) as T;
  }

  return {
    ...obj,
    id: obj._id?.toString() || obj.id,
    _id: undefined,
    __v: undefined,
    password: undefined
  } as T;
}
