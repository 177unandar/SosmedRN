export const initial = (value: string) => {
  if (value.length) {
    let arr = value.split(' ');
    if (arr.length > 1) {
      return `${arr[0].substring(0, 1)}${arr[arr.length - 1].substring(
        0,
        1,
      )}`.toUpperCase();
    }
    return value.substring(0, 1);
  }
  return '';
};
