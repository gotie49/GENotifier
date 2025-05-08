import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Status } from "@chakra-ui/react";

export function getStatusColor(status: string) {
  switch (status) {
    case "online":
      return "green";
    case "offline":
      return "red";
    default:
      return "gray";
  }
}
export function getBgColor(status: string) {
  switch (status) {
    case "online":
      return "gray.900";
    case "offline":
      return "gray.1000";
    default:
      return "gray.1000";
  }
}

const PlayerCard = React.forwardRef(({ player, ...props }: any, ref) => {
  const [enableMouseTracking, setEnableMouseTracking] = useState(false);
  return (
    <Box
      onMouseEnter={() => setEnableMouseTracking(true)}
      onMouseLeave={() => setEnableMouseTracking(false)}
      ref={ref}
      bg={getBgColor(player.status)}
      p={10}
      shadow="xl"
      borderWidth="1px"
      borderRadius="md"
      cursor="pointer"
      _hover={{ bg: "gray.800" }}
      position="relative"
      {...props}
    >
      <Box position="absolute" top={3} left={3} zIndex={1}>
        <Status.Root colorPalette={getStatusColor(player.status)}>
          <Status.Indicator />
        </Status.Root>
      </Box>
      <Flex align="center" justify="space-between" height="100%">
        <Box flex="1">
          <Text fontSize="md" fontWeight="normal">
            {player.status === "online"
              ? `${player.name} is playing on ${player.server.name}`
              : `${player.name} is currently offline`}
          </Text>
        </Box>
        <Box ml={4}></Box>
      </Flex>
    </Box>
  );
});

export default PlayerCard;
