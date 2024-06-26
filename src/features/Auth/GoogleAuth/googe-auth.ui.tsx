import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@shared/assets/google.svg';
import { Button } from '@shared/index';
import { IGoogleProps } from './googe-auth.types';
import { getGoogleCredentialsByAccessToken } from '@entities/Auth/api/auth.queries';

export const GoogleAuth = ({ handleSubmit }: IGoogleProps) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await getGoogleCredentialsByAccessToken(
        tokenResponse.access_token
      );
      const email = userInfo.email;

      handleSubmit({ email });
    },
  });

  return (
    <Button type="button" onClick={() => login()}>
      <img src={GoogleIcon} alt="google auth" />
      Google
    </Button>
  );
};
