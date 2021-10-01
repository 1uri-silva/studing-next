/* eslint-disable camelcase */
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { api } from '../../services/api';

import { Container } from '../../styles/pages/list-user';

type InfoProps = {
  id: string;
  like: string;
  user_id: string;
  data: {
    id: string;
    name: string;
    image: string;
  };
};

type Props = {
  data: InfoProps[];
};

const Filter: NextPage<Props> = ({ data }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      {data.map(data => (
        <h1 key={data.id}>{data.like}</h1>
      ))}
    </Container>
  );
};
export default Filter;

export const getServerSideProps: GetServerSideProps = async context => {
  const { user_id } = context.query;

  const { data } = await api.get<InfoProps[]>(`/info?user_id=${user_id}`);

  return {
    props: { data }
  };
};
