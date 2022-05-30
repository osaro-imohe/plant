import { useNavigate } from 'react-router-dom';
import Container from '../container';
import Text from '../text';
import Button from '../button';

function Header() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  return (
    <Container inline fullWidth justifyContent="space-between">
      <Text bold text="Claypot 🪴" variant="primary" />
      <Button
        text={path === '/' ? 'View charts' : 'Dashboard'}
        onClick={() => (path === '/' ? navigate('/charts') : navigate('/'))}
      />
    </Container>
  );
}

export default Header;
