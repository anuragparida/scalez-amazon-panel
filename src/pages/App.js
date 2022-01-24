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
  HStack,
  Image,
  AspectRatio,
  Divider,
  Stack,
  Flex,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import axios from "axios";
import { server, config } from "../env";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const scrape = async (e) => {
    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    console.log(params);

    axios
      .post(server + "/scrape", params, config)
      .then((rsp) => {
        console.log(rsp.data);
        setData(rsp.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Flex h="100vh" py={20}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <VStack spacing={3} alignItems="flex-start">
            <Heading size="2xl">Scalez Media</Heading>
            <Text>Amazon Review Scraper and Analyser</Text>
          </VStack>

          <form onSubmit={scrape} style={{ width: "100%" }}>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Amazon Link/Product ID</FormLabel>
                  <Input
                    placeholder="Enter Amazon Link/Product ID"
                    required
                    name="link"
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
                  Analyse
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>
        </VStack>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={6}
          align="flex-start"
          bg="gray.50"
        >
          <Tabs w="full" align="start">
            <TabList>
              <Tab>Sentiment</Tab>
              <Tab>Essence</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack alignItems="flex-start" spacing={3}>
                  <Heading size="2xl">Your cart</Heading>
                  <Text>
                    If the price is too hard on your eyes,{" "}
                    <Button variant="link" colorScheme="black">
                      try changing the theme.
                    </Button>
                  </Text>
                </VStack>
                <HStack spacing={6} alignItems="center" w="full">
                  <AspectRatio ratio={1} w={24}>
                    <Image src="/images/skateboard.jpg" alt="Skateboard" />
                  </AspectRatio>
                  <Stack
                    spacing={0}
                    w="full"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <VStack w="full" spacing={0} alignItems="flex-start">
                      <Heading size="md">Penny board</Heading>
                      <Text color="gray.600">PNYCOMP27541</Text>
                    </VStack>
                    <Heading size="sm" textAlign="end">
                      $119.00
                    </Heading>
                  </Stack>
                </HStack>
                <VStack spacing={4} alignItems="stretch" w="full">
                  <HStack justifyContent="space-between">
                    <Text color="gray.600">Taxes (estimated)</Text>
                    <Heading size="sm">$23.80</Heading>
                  </HStack>
                </VStack>
                <Divider />
                <HStack justifyContent="space-between" w="full">
                  <Text color="gray.600">Total</Text>
                  <Heading size="lg">$162.79</Heading>
                </HStack>
              </TabPanel>
              <TabPanel>
                <VStack alignItems="flex-start" spacing={3}>
                  <Heading size="2xl">Your cart</Heading>
                  <Text>
                    If the price is too hard on your eyes,{" "}
                    <Button variant="link" colorScheme="black">
                      try changing the theme.
                    </Button>
                  </Text>
                </VStack>
                <HStack spacing={6} alignItems="center" w="full">
                  <AspectRatio ratio={1} w={24}>
                    <Image src="/images/skateboard.jpg" alt="Skateboard" />
                  </AspectRatio>
                  <Stack
                    spacing={0}
                    w="full"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <VStack w="full" spacing={0} alignItems="flex-start">
                      <Heading size="md">Penny board</Heading>
                      <Text color="gray.600">PNYCOMP27541</Text>
                    </VStack>
                    <Heading size="sm" textAlign="end">
                      $119.00
                    </Heading>
                  </Stack>
                </HStack>
                <VStack spacing={4} alignItems="stretch" w="full">
                  <HStack justifyContent="space-between">
                    <Text color="gray.600">Taxes (estimated)</Text>
                    <Heading size="sm">$23.80</Heading>
                  </HStack>
                </VStack>
                <Divider />
                <HStack justifyContent="space-between" w="full">
                  <Text color="gray.600">Total</Text>
                  <Heading size="lg">$162.79</Heading>
                </HStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </Container>
  );
}

export default App;
