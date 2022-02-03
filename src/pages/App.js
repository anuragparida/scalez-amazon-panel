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
  Select,
  Box,
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { server, config } from "../env";
import { useState, useRef } from "react";
import Cookies from "js-cookie";
import { PieChart } from "react-minimal-pie-chart";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
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

  const handleOpen = (type, i) => {
    if (type === "p") {
      if (data["Positive"].keywords[i]) onOpen();
    } else if (type === "x") {
      if (data["Neutral"].keywords[i]) onOpen();
    } else if (type === "n") {
      if (data["Negative"].keywords[i]) onOpen();
    }
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Flex py={20}>
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
              <GridItem colSpan={1}>
                <Select
                  placeholder="Select option"
                  variant="filled"
                  required
                  name="stars"
                >
                  <option value="all">All Reviews</option>
                  <option value="five_star">5 Star</option>
                  <option value="four_star">4 Star</option>
                  <option value="three_star">3 Star</option>
                  <option value="two_star">2 Star</option>
                  <option value="one_star">1 Star</option>
                </Select>
              </GridItem>
              <GridItem colSpan={1}>
                <Button
                  type="submit"
                  w="full"
                  colorScheme="teal"
                  isLoading={loading}
                  ref={btnRef}
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
          bg={"gray.900"}
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
                        fill: "#fff",
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
                <VStack alignItems="flex-start" h="full" spacing={5}>
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
                              <Td
                                onClick={() => handleOpen("p", i)}
                                style={{ cursor: "pointer" }}
                              >
                                {data["Positive"].keywords[i]
                                  ? `${data["Positive"].keywords[i][0]} (${data["Positive"].keywords[i][1]})`
                                  : ""}
                              </Td>
                              <Td
                                onClick={() => handleOpen("x", i)}
                                style={{ cursor: "pointer" }}
                              >
                                {data["Neutral"].keywords[i]
                                  ? `${data["Neutral"].keywords[i][0]} (${data["Neutral"].keywords[i][1]})`
                                  : ""}
                              </Td>
                              <Td
                                onClick={() => handleOpen("n", i)}
                                style={{ cursor: "pointer" }}
                              >
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
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Keyword: water (73)</DrawerHeader>

          <DrawerBody>
            <Box
              w="full"
              borderWidth="2px"
              borderRadius="lg"
              overflow="hidden"
              p={5}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Name (Rating)
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Name (Rating)
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default App;
