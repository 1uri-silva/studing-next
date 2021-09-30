/* eslint-disable camelcase */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useRequest from '../../hooks/useRequest';

import { Container } from '../../styles/pages/list-user';

const User: NextPage = () => {
  const { isFallback, query } = useRouter();

  const { response } = useRequest(`/personal/${query.id}`, {
    method: 'GET'
  });
  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h1>{response?.professional}</h1>
    </Container>
  );
};
export default User;
