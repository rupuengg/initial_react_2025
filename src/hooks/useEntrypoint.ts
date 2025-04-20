import { useEffect, useState } from 'react';
import { WorkspaceConstant } from 'constant';

export const useEntrypoint = () => {
  const [uriPath, setPath] = useState<string>('');
  const [uriEntrypoint, setEntrypoint] = useState<string>('');

  useEffect(() => {
    const cb = (path: string) => {
      if (path) {
        const str = path.replace(`#/${WorkspaceConstant.API_MAIN_ROUTE}`, '');
        if (str.length > 1) {
          const len = str.includes('?') ? str.indexOf('?') : str.length;
          const params = str.slice(1, len).split('/');

          // Set path
          setPath(params[0]);

          // Set Entrypoint
          setEntrypoint(params[1]);
        }
      }
    };

    if (window.location.hash) cb(window.location.hash);
    else cb('#/' + window.location.pathname);
  }, [window.location.hash, window.location.pathname]);

  return { uriPath, uriEntrypoint };
};
