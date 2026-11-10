// export function isValidBatchDesc(data: unknown): data is BatchDescItem[] {
//   if (!Array.isArray(data)) return false;
//   return data.every(
//     (item) =>
//       item &&
//       typeof item.description === "string" &&
//       Array.isArray(item.sellingPoints) &&
//       item.sellingPoints.every((s: unknown) => typeof s === "string") &&
//       Array.isArray(item.tags) &&
//       item.tags.every((t: unknown) => typeof t === "string"),
//   );
// }
