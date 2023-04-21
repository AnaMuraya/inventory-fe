import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';
import { notification } from 'antd';
import auth0 from 'auth0-js';

import { checkMarineMaxAccount } from 'src/utils/auth';
import config from '../config';

export interface LoginPayload {
  username: string;
  password?: string;
}

interface IAuthContext {
  accessToken: string | null;
  refreshToken: string | null;
  user: Auth0UserProfile | null;
  isLoading: boolean;
  login: (loginPayload: LoginPayload, callback?: VoidFunction) => void;
  logout: VoidFunction
}

interface AuthCallbackPayload {
  user: Auth0UserProfile;
  authResult: Auth0DecodedHash;
}

const authContextInitialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {}
}

export const AUTH_CONFIG = {
  domain: config.auth.domain || '',
  redirectUri: `${window.location.origin}/login`,
  clientID: config.auth.clientId || '',
};

const redirect_uri = `${window.location.origin}/login`;

const notifyAuthError = (errorMessage?: string) => {
  notification['error']({
    message: 'Authorization failed',
    description: errorMessage || 'Something went wrong.',
  });
}

const AuthContext = createContext<IAuthContext>(
  authContextInitialState
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const webAuth = useMemo(() => {
    return new auth0.WebAuth(AUTH_CONFIG);
  }, [])

  const localStorageAuthData = window.localStorage.getItem(config.auth.lsKey);
  let parsedAuthData;
  if (localStorageAuthData) {
    try {
      parsedAuthData = JSON.parse(localStorageAuthData);
    } catch(error) {
      console.error('Error parsing auth data');
    }
  }
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(parsedAuthData?.accessToken || null);
  const [refreshToken, setRefreshToken] = useState<string | null>(parsedAuthData?.refreshToken || null);
  const [user, setUser] = useState<Auth0UserProfile | null>(parsedAuthData?.user || null);

  const parseCallbackHash = useCallback((hash: string): Promise<AuthCallbackPayload> => {
    return new Promise((resolve, reject) => {
      webAuth.parseHash({ hash }, (err, authResult) => {
        if (err) {
          setIsLoading(false);
          notifyAuthError(err.description);
          return reject(err);
        }
        window.location.hash = '';
        if (authResult) {
          webAuth.client.userInfo(authResult?.accessToken || '', (err, user) => {
            if (err) {
              setIsLoading(false);
              notifyAuthError(err.description);
              return reject(err);
            }
            return resolve({
              user,
              authResult
            });
          });
        }
      });
    })
  }, [webAuth]);

  const login = useCallback(async (payload: LoginPayload) => {
    const loginConfig = {
      responseType: 'token id_token',
      credential_type: 'http://auth0.com/oauth/grant-type/password-realm',
      realm: 'Username-Password-Authentication',
      redirect_uri,
    };

    const ssoMarineMaxConfig = {
      connection: 'MarineMaxInventory',
      login_hint: payload.username,
      scope: 'openid profile email',
      redirect_uri: `${redirect_uri}/callback`,
      responseType: 'token id_token',
    };

    return new Promise((resolve, reject) => {
      setIsLoading(true);
      if (checkMarineMaxAccount(payload.username)) {
        webAuth.authorize(ssoMarineMaxConfig);
      } else {
        webAuth.login(
          {
            email: payload.username,
            password: payload.password || '',
            ...loginConfig,
          },
          (err, res) => {
            if (err) {
              setIsLoading(false);
              notifyAuthError(err.description);
              reject(err.description);
            }
            if (res) resolve(res);
          }
        );
      }
    });
  }, [webAuth]);

  const logout = useCallback(() => {
    window.localStorage.removeItem(config.auth.lsKey);
    webAuth.logout({
      returnTo: `${window.location.origin}/login`,
      clientID: AUTH_CONFIG.clientID,
    });
  }, [webAuth]);

  useEffect(() => {
    if (window.location.hash) {
      const hash = `${window.location.hash}`;
      window.location.hash = '';
      setIsLoading(true);
      parseCallbackHash(hash)
        .then(data => {
          const authData = {
            accessToken: data?.authResult?.accessToken || null,
            refreshToken: data?.authResult?.idToken || null,
            user: data?.user || null
          };
          setUser(authData.user);
          setAccessToken(authData.accessToken || '');
          setRefreshToken(authData.refreshToken || '');
          localStorage.setItem(config.auth.lsKey, JSON.stringify(authData));
          setIsLoading(false);
        })
    }
  }, [parseCallbackHash]);


  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      user,
      isLoading,
      login,
      logout
    }),
    [
      accessToken,
      refreshToken,
      user,
      isLoading,
      login,
      logout
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
