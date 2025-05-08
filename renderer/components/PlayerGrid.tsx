import { SimpleGrid, Dialog } from "@chakra-ui/react";
import PlayerCard from "./PlayerCard";
import PlayerDialog from "./PlayerDialog";
import React from "react";

const PlayerGrid = React.forwardRef(({ players, ...props }: any, ref) => {
  const sortedPlayers = players.sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "online" ? -1 : 1;
  });
  return (
    <SimpleGrid ref={ref} columns={[1, 2, 3]} gap={6} p={6} {...props}>
      {sortedPlayers.map((player) => (
        <Dialog.Root key={player.name}>
          <Dialog.Trigger asChild>
            <PlayerCard player={player} />
          </Dialog.Trigger>
          <PlayerDialog player={player} />
        </Dialog.Root>
      ))}
    </SimpleGrid>
  );
});

export default PlayerGrid;
