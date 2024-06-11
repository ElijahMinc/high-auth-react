import GithubIcon from '@shared/assets/github.svg';
import { Button } from '@shared/index';
import { IGithubProps } from './github-auth.types';
import { useEffect } from 'react';
import { githubOAuthURL } from './constants/github-auth.constants';

export const GithubAuth = ({ handleSubmit }: IGithubProps) => {
  const login = () => window.location.assign(githubOAuthURL);

  const handleGitHubCallback = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
      handleSubmit(code);
    }
  };

  useEffect(() => {
    handleGitHubCallback();
  }, []);

  return (
    <Button type="button" onClick={login}>
      <img src={GithubIcon} alt="google auth" />
      Github
    </Button>
  );
};
