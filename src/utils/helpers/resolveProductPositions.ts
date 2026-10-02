import { TSponsoredProductConfig } from 'types/config';

type TPageConfig = TSponsoredProductConfig[keyof Omit<
  TSponsoredProductConfig,
  'tagLabel' | 'isLoaderVisible' | 'isListViewEnabled' | 'execution'
>];

type TResolvedPositions = {
  hasDedicatedPositions: boolean;
  positions: number[];
};

const toPosition = (value: unknown) => {
  const parsedValue = Number(String(value).trim());

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null;
};

const toItemPositionNumbersList = (itemPositionNumbers: unknown) => {
  if (Array.isArray(itemPositionNumbers)) return itemPositionNumbers;

  if (typeof itemPositionNumbers === 'string')
    return itemPositionNumbers.split(',');

  return [];
};

const resolveProductPositions = (
  configPage: TPageConfig,
): TResolvedPositions => {
  const productsCount = toPosition(configPage.productsCount) ?? 0;

  const uniquePositions = new Set<number>();

  for (const itemPositionNumber of toItemPositionNumbersList(
    configPage.itemPositionNumbers,
  )) {
    const position = toPosition(itemPositionNumber);

    if (position) uniquePositions.add(position);
  }

  const positions = Array.from(uniquePositions).slice(0, productsCount);

  if (!positions.length) {
    return {
      hasDedicatedPositions: false,
      positions: Array.from({ length: productsCount }, (_, index) => index + 1),
    };
  }

  return {
    hasDedicatedPositions: true,
    positions,
  };
};

export default resolveProductPositions;
