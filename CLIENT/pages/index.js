import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import ProductsList from "@/components/ProductsList";
import { useLogin } from "@/lib/hooks";
export default function Home() {
  const [userData] = useLogin()
  return (
    <Container>
      <Navbar userData={userData}/>

      <ProductsList userData={userData}/>
    </Container>
  )
};
