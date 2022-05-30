import Container from '../container';
import { PageProps } from '../../types/components';

function Page({ children }: PageProps) {
  return (
    <Container
      fullWidth
      fullHeight
      overflow="scroll"
      paddingTop="33px"
      paddingBottom="33px"
      paddingLeft="33px"
      paddingRight="33px"
      backgroundColor="white"
    >
      {children}
    </Container>
  );
}

export default Page;
