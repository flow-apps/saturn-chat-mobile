import compact from "lodash/compact";
import union from "lodash/union";

type TFinder<P> = (value: P, index: number) => boolean;
type TIterator<P> = (item: P, index: number) => Promise<any> | any;

class ArrayUtils {
  compact(array: any[]) {
    return compact(array);
  }

  union(oldArray: any[], newArray: any[]) {
    const compactedArrays = [
      ...this.compact(oldArray),
      ...this.compact(newArray),
    ];

    const unionArray = union(compactedArrays);

    return unionArray;
  }

  has<T>(array: T[], finder: TFinder<T>) {
    if (!array || !finder) return false;

    let hasItem = false;

    for (let i = 0; i < array.length; i++) {
      if (finder(array[i], i)) {
        hasItem = true;
        break;
      }
    }

    return hasItem;
  }

  findFirst<T>(array: T[], finder: TFinder<T>) {
    if (!array || !finder) return undefined;

    let findItem: T;

    for (let i = 0; i < array.length; i++) {
      if (finder(array[i], i)) {
        findItem = array[i];
        break;
      }
    }

    return findItem;
  }

  removeOne<T>(array: T[], finder: TFinder<T>) {
    if (!array || !finder) return undefined;

    const arrayWithoutItem: T[] = [];

    for (let i = 0; i < array.length; i++) {
      if (!finder(array[i], i)) {
        arrayWithoutItem.push(array[i])
      }
    }

    return arrayWithoutItem;
  }

  iterator<T>(array: T[], callback: TIterator<T>) {
    if (!array || !callback) return undefined;

    let iteratedArray: T[] = [];

    for (let i = 0; i<array.length;i++) {
      iteratedArray[i] = callback(array[i], i)
    }

    return iteratedArray;
  }
}

export { ArrayUtils };
