/* eslint-disable camelcase */
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { api } from '../../services/api';
import { useRouter } from 'next/router';

import { Container } from '../../styles/pages/list-user';

type InfoProps = {
  id: string;
  like: string;
};

type Props = {
  data: InfoProps;
};

const User: NextPage<Props> = ({ data }) => {
  const { isFallback } = useRouter();
  if (isFallback) return <p>loading....</p>;
  return (
    <Container>
      <h1>{data.like}</h1>
    </Container>
  );
};
export default User;

export const getStaticPaths: GetStaticPaths = async () => {
  // Carregando as páginas de usuários que existe na aplicação
  const { data } = await api.get<InfoProps[]>('/info');

  const paths = data?.map(info => {
    return { params: { id: info.id } };
  });

  return {
    paths,
    fallback: true // quando falso, só busaca os primeiros dados já disponíveis
  };
};

export const getStaticProps: GetStaticProps = async context => {
  // Quando se tem uma página dinâmica(recebe parâmetros) => getStaticPaths
  const { id } = context.params;

  const { data } = await api.get<InfoProps>(`/info/${id}`);

  if (!data) {
    return {
      notFound: true,
      redirect: {
        destination: '/'
      }
    };
  }

  return {
    props: { data } // will be passed to the page component as props
  };
};
