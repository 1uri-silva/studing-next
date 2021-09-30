import { NextPage } from 'next';
import Link from 'next/link';
import { Container } from '../../styles/pages/Home';
import useRequest from '../../hooks/useRequest';

type ResponseProps = {
  id: string;
  professional: string;
};

const Home: NextPage = () => {
  const { response } = useRequest<ResponseProps[]>('/personal', {
    method: 'GET'
  });

  return (
    <Container>
      {response?.map(response => (
        <div key={response.id}>
          <Link href={{ pathname: `/personal/${response.id}` }}>
            <a>{response.professional}</a>
          </Link>

          <p>Oá</p>
        </div>
      ))}
    </Container>
  );
};

export default Home;
