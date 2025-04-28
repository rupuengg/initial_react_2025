import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontIcon } from 'components/Icon';

export interface ITags {
  tags?: string[];
  onDelete?: (tags?: string[]) => void;
}

export const Tags: React.FC<ITags> = ({ tags, onDelete }) => {
  const handleRemoveTag = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, deleteTag: string) => {
      const tagIndex = tags?.findIndex(tag => tag === deleteTag);
      if (tags && tagIndex && tagIndex >= 0) {
        const newTags = [...tags.slice(0, tagIndex), ...tags.slice(tagIndex + 1)];

        if (onDelete) onDelete(newTags);
      }
    },
    [tags]
  );

  if (!tags) return null;

  return (
    <div className='tag-box'>
      {tags.map(tag => (
        <div key={tag} className='tag'>
          <span>{tag}</span>
          <Link to='' onClick={e => handleRemoveTag(e, tag)}>
            <FontIcon isDisabled={false} color='#ffffff' icon={faXmark} />
          </Link>
        </div>
      ))}
    </div>
  );
};
