export function filterAndSortArray(
  arrayInput: CatalogItem[],
  searchValue: string,
  sortValue: string,
  sortOrder: boolean
) {
  const filteredArray = [
    ...arrayInput.filter((item: CatalogItem) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    }),
  ];

  let sortedArray = [];

  const val = sortValue;
  const order = sortOrder;
  if (val === "default") {
    sortedArray = [...filteredArray];
  } else {
    if (order === true) {
      sortedArray = [
        ...filteredArray.sort((a: CatalogItem, b: CatalogItem) => {
          if (a[val as keyof CatalogItem] === "") return +1;
          if (b[val as keyof CatalogItem] === "") return -1;
          else
            return a[val as keyof CatalogItem].localeCompare(
              b[val as keyof CatalogItem]
            );
        }),
      ];
    } else {
      sortedArray = [
        ...filteredArray.sort((a: CatalogItem, b: CatalogItem) => {
          if (a[val as keyof CatalogItem] === "") return +1;
          if (b[val as keyof CatalogItem] === "") return -1;
          else
            return b[val as keyof CatalogItem].localeCompare(
              a[val as keyof CatalogItem]
            );
        }),
      ];
    }
  }

  return sortedArray;
}
