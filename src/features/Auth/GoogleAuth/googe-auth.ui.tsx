import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@shared/assets/google.svg';
import { Button } from '@shared/index';
import { IGoogleProps } from './googe-auth.types';
import { getGoogleCredentialsByAccessToken } from '@entities/Auth/api/auth.queries';

export const GoogleAuth = ({ handleSubmit }: IGoogleProps) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      const userInfo = await getGoogleCredentialsByAccessToken(
        tokenResponse.access_token
      );
      const email = userInfo.email;
      const password = userInfo.sub;

      handleSubmit({ email, password });
    },
  });

  return (
    <Button type="button" onClick={() => login()}>
      <img src={GoogleIcon} alt="google auth" />
      Google
    </Button>
  );
};
