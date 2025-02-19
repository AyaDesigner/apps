import React, { ReactElement } from 'react';
import { FilterItem } from './common';
import { Source } from '../../graphql/sources';
import { getTooltipProps } from '../../lib/tooltip';
import { LazyImage } from '../LazyImage';
import { Button } from '../buttons/Button';
import BlockIcon from '../../../icons/block.svg';

export default function SourceItemRow({
  source,
  onSourceClick,
  blocked,
}: {
  source: Source;
  onSourceClick?: (source: Source) => unknown;
  blocked?: boolean;
}): ReactElement {
  return (
    <FilterItem className="relative">
      <a className="flex flex-1 items-center py-2 pr-14 pl-6 h-12 rounded-md cursor-default">
        <LazyImage
          imgSrc={source.image}
          imgAlt={`${source.name} logo`}
          className="w-8 h-8 rounded-md"
        />
        <span className="flex-1 ml-3 text-left truncate typo-callout text-theme-label-tertiary">
          {source.name}
        </span>
      </a>
      <Button
        className="right-4 my-auto btn-tertiary"
        style={{ position: 'absolute' }}
        onClick={() => onSourceClick?.(source)}
        icon={<BlockIcon />}
        {...getTooltipProps(blocked ? 'Unblock source' : 'Block source', {
          position: 'left',
        })}
      />
    </FilterItem>
  );
}
