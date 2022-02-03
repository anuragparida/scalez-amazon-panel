import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
  Flex,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { server } from "../env";
import Cookies from "js-cookie";

function Login() {
  const login = async (e) => {
    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

      // withCredentials: true


      // const response = await fetch(server + "/login", {
      //       method: 'POST',
      //       headers: {'Content-Type': 'application/json'},
      //       credentials: 'include',
      //       body: JSON.stringify(params)
      //   });

      //   const rsp = await response.json();
      //   console.log(rsp)
      //   Cookies.set("jwt_new", rsp.jwt_new);
      //   window.location.href = "/analysis";


      axios.defaults.withCredentials = true
    axios
      .post(server + "/login", params, {withCredentials: true})
      .then((rsp) => {
        console.log(rsp)
        Cookies.set("jwt_new", rsp.data.jwt_new);
        // const cookie = Cookies.get();
        // console.log(cookie);
        
        // Cookies.set("jwt", cookie.jwt);
        Cookies.set("tokenDate", new Date());
        // console.log("response",rsp)
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Flex h="100vh" py={20}>
        <VStack w="50%" h="full" p={10} spacing={10} alignItems="flex-start">
          <VStack spacing={3} alignItems="flex-start">
            <Heading size="2xl">Login</Heading>
            <Text>Amazon Analysis</Text>
          </VStack>

          <form onSubmit={login} style={{ width: "100%" }}>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Enter Email"
                    required
                    type="email"
                    name="email"
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Enter Password"
                    required
                    type="password"
                    name="password"
                  />
                </FormControl>
              </GridItem>
              {/* <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input placeholder="San Francisco" />
              </FormControl>
            </GridItem> */}
              {/* <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select>
                  <option value="usa">United States of America</option>
                  <option value="uae">United Arab Emirates</option>
                  <option value="nmk">North Macedonia</option>
                  <option value="de">Germany</option>
                </Select>
              </FormControl>
            </GridItem> */}
              <GridItem colSpan={2}>
                <Button type="submit" size="lg" w="full" colorScheme="teal">
                  Login
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>
        </VStack>
      </Flex>
    </Container>
  );
}

export default Login;
