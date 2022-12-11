import { ExtendedRecordMap } from 'notion-types';
import { PageIconImpl } from 'react-notion-x';

export function getPageIcon(recordMap: ExtendedRecordMap, defaultIcon?: string) {
  let icon = defaultIcon;
  const pageBlock = recordMap.block[Object.keys(recordMap.block)[0]]?.value;

  if (pageBlock) {
    const elem = PageIconImpl({ block: pageBlock, defaultIcon });
    icon = encodeURIComponent(elem.props.children.props.src);
  }

  return icon;
}
