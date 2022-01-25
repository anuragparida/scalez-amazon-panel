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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import axios from "axios";
import { server, config } from "../env";
import { useState } from "react";
import Cookies from "js-cookie";
import { PieChart } from "react-minimal-pie-chart";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const scrape = async (e) => {
    e.preventDefault();

    var params = Array.from(e.target.elements)
      .filter((el) => el.name)
      .reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

    var new_params = { ...params, jwt_new: Cookies.get("jwt_new") };

    // console.log(new_params);

    setLoading(true);

    axios
      .post(server + "/scrape", new_params, { withCredentials: true })
      .then((rsp) => {
        console.log(rsp.data);
        setData(rsp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
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
                <Button
                  type="submit"
                  size="lg"
                  w="full"
                  colorScheme="teal"
                  isLoading={loading}
                >
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
                <VStack alignItems="flex-start" spacing={5}>
                  <Heading size="xl">Overall Sentiment</Heading>
                  {/* <Text>Total Reviews: {data.length}</Text> */}
                  {Object.keys(data).length !== 0 ? (
                    <PieChart
                      data={[
                        {
                          title: "Negative",
                          value: Math.round(data.tally[0] * 100) / 100,
                          color: "#D2222D",
                        },
                        {
                          title: "Neutral",
                          value: Math.round(data.tally[1] * 100) / 100,
                          color: "#FFBF00",
                        },
                        {
                          title: "Positive",
                          value: Math.round(data.tally[2] * 100) / 100,
                          color: "#238823",
                        },
                      ]}
                      style={{ height: "300px" }}
                      label={({ dataEntry }) =>
                        `${dataEntry.title}: ${dataEntry.value}%`
                      }
                      labelStyle={(index) => ({
                        // fill: ["#D2222D", "#FFBF00", "#238823"][index],
                        fill: "#000",
                        fontSize: "5px",
                        fontFamily: "sans-serif",
                      })}
                      radius={42}
                      labelPosition={112}
                    />
                  ) : loading ? (
                    <Text>Calculating, please wait...</Text>
                  ) : (
                    <Text>Enter a product link to analyse.</Text>
                  )}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack alignItems="flex-start" spacing={5}>
                  <Heading size="xl">Essence and Keywords</Heading>
                  {/* <Text>Total Reviews: {data.length}</Text> */}
                  {Object.keys(data).length !== 0 ? (
                    <Table variant="simple">
                      <TableCaption>Keyword Analysis</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Positive</Th>
                          <Th>Neutral</Th>
                          <Th>Negative</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Array(
                          Math.max(
                            data["Positive"].keywords.length,
                            data["Neutral"].keywords.length,
                            data["Negative"].keywords.length
                          )
                        )
                          .fill()
                          .map((e, i) => (
                            <Tr>
                              <Td>
                                {data["Positive"].keywords[i]
                                  ? `${data["Positive"].keywords[i][0]} (${data["Positive"].keywords[i][1]})`
                                  : ""}
                              </Td>
                              <Td>
                                {data["Neutral"].keywords[i]
                                  ? `${data["Neutral"].keywords[i][0]} (${data["Neutral"].keywords[i][1]})`
                                  : ""}
                              </Td>
                              <Td>
                                {data["Negative"].keywords[i]
                                  ? `${data["Negative"].keywords[i][0]} (${data["Negative"].keywords[i][1]})`
                                  : ""}
                              </Td>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  ) : loading ? (
                    <Text>Calculating, please wait...</Text>
                  ) : (
                    <Text>Enter a product link to analyse.</Text>
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </Container>
  );
}

export default App;
