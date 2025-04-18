import { useEffect, useState } from 'react';
import { WorkspaceConstant } from 'constant';
import { decryption } from 'utils';

export const useEntrypoint = () => {
  const [uriPath, setPath] = useState<string>('');
  const [uriEntrypoint, setEntrypoint] = useState<string>('');
  const [uriSectionId, setSectionId] = useState<string | null | undefined>(null);
  const [uriIsMainMenu, setUriIsMainMenu] = useState<boolean>(false);
  const [uriDefaultPageInformation, setUriDefaultPageInformation] = useState<string | null>(null);

  useEffect(() => {
    const cb = (path: string) => {
      console.log(path);
      if (path) {
        const str = path.replace(`#/${WorkspaceConstant.API_MAIN_ROUTE}`, '');
        if (str.length > 1) {
          const len = str.includes('?') ? str.indexOf('?') : str.length;
          const params = str.slice(1, len).split('/');

          const ar: string[] = decryption(params[1]).toString().split(' ');

          // Set Path
          setPath(ar[0]);

          // Set Entrypoint
          setEntrypoint(params[0]);

          // Set Default Page Information
          setUriDefaultPageInformation(ar[2] === 'null' ? null : ar[2]);

          // Set Section Id
          setSectionId(ar[3] === 'null' ? null : ar[3] === 'undefined' ? undefined : ar[3]);

          // Set Is Main Menu
          setUriIsMainMenu(ar[4] === 'null' ? false : Boolean(ar[4]));
        }
      }
    };

    console.log('Hello', window.location);
    if (window.location.hash) cb(window.location.hash);
    else cb('#/' + window.location.pathname);
  }, []);

  return { uriPath, uriEntrypoint, uriSectionId, uriDefaultPageInformation, uriIsMainMenu };
};
