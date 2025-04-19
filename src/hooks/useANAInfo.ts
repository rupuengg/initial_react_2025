import { OAuthContext } from 'context';
// import { KJUR } from 'jsrsasign';
import { useContext, useEffect, useState } from 'react';
import { AllHphPermission } from 'constant/Ana';
import { tokenReference } from 'store/services/axios';

// const ADDITIONAL_EXPIRE_TIME_ADDED_IN_SECONDS = 30;

// function setCookie(name: string, value: string, seconds: number) {
//   let expires = '';
//   const expiredInSecond = seconds + ADDITIONAL_EXPIRE_TIME_ADDED_IN_SECONDS;
//   if (expiredInSecond) {
//     const date = new Date();
//     date.setTime(date.getTime() + expiredInSecond * 1000);
//     expires = '; expires=' + date.toUTCString();
//   }
//   document.cookie = name + '=' + (value || '') + expires + '; path=/';
// }

export const useANAInfo = () => {
  const anaKeycloak = useContext(OAuthContext);
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string | undefined>('');
  const [currentBu, setCurrentBu] = useState<string>('');
  const [availableBuList, setAvailableBuList] = useState<string[]>([]);
  const [allHphPermission, setAllHphPermission] = useState<AllHphPermission | undefined>();

  useEffect(() => {
    if (anaKeycloak) {
      setToken(anaKeycloak.token);
      (window as any).keycloak_token = anaKeycloak.token;
      if (anaKeycloak.tokenParsed !== undefined) {
        tokenReference.token = anaKeycloak.token ?? '';
        // const expirationTime = anaKeycloak.tokenParsed.exp;
        // const currentTime = Math.floor(Date.now() / 1000);
        // const remainingTime = expirationTime ? expirationTime - currentTime : 0;
        // const k = 'qcweinqwfelausandui';
        // const key = k.substring(0, 63);
        // const header = { alg: 'HS256', typ: 'JWT' };
        // const payload = { otk: anaKeycloak.tokenParsed.otk, hph_permissions: {} };
        // const cookieResult = KJUR.jws.JWS.sign('HS256', header, payload, key);
        // setCookie('X-HPH-GW-AUTH', cookieResult, remainingTime);

        setCurrentBu((anaKeycloak.tokenParsed as any).bu);
        setAvailableBuList((anaKeycloak.tokenParsed as any).bu_list);
        setAllHphPermission((anaKeycloak.tokenParsed as any).hph_permissions);
        setUserName((anaKeycloak.tokenParsed as any).name);
        setEmail((anaKeycloak.tokenParsed as any).email);
      }
    }
  }, [anaKeycloak]);

  return { anaKeycloak, email, userName, token, currentBu, availableBuList, allHphPermission };
};
