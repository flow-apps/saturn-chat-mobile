import _ from "lodash";

class ArrayUtils {
  async compact(array: any[]) {
    return await _.compact(array);
  }

  async union(oldArray: any[], newArray: any[]) {
    const compactedArrays = [
      ...(await this.compact(oldArray)),
      ...(await this.compact(newArray)),
    ];

    const unionArray = await _.union(compactedArrays);

    return unionArray;
  }
}

export { ArrayUtils };
