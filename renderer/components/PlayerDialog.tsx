import {
    Portal,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogContent,
    DialogBackdrop,
    DialogPositioner,
    DialogCloseTrigger,
    DataList,
    Badge,
    CloseButton,
    Button,
    Image,
} from '@chakra-ui/react';
import { getStatusColor } from './PlayerCard';

export default function PlayerDialog({ player }: any) {
    return (
        <Portal>
            <DialogBackdrop />
            <DialogPositioner>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{player.name}</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb='8'>
                        <DataList.Root orientation='horizontal'>
                            <DataList.Item>
                                <DataList.ItemLabel>Status</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    <Badge
                                        colorPalette={getStatusColor(
                                            player.status
                                        )}
                                    >
                                        {player.status}
                                    </Badge>
                                </DataList.ItemValue>
                            </DataList.Item>
                            {player.status === 'online' && (
                                <>
                                    <DataList.Item>
                                        <DataList.ItemLabel>
                                            Clan
                                        </DataList.ItemLabel>
                                        <DataList.ItemValue>
                                            {player.clan}
                                        </DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>
                                            Country
                                        </DataList.ItemLabel>
                                        <DataList.ItemValue>
                                            {player.country.iconUrl ? (
                                                <Image
                                                    height='20px'
                                                    src={player.country.iconUrl}
                                                    alt='Country flag'
                                                />
                                            ) : (
                                                'N/A'
                                            )}
                                        </DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>
                                            Server
                                        </DataList.ItemLabel>
                                        <DataList.ItemValue>
                                            {player.server.name}
                                        </DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>
                                            IP
                                        </DataList.ItemLabel>
                                        <DataList.ItemValue>
                                            {player.server.ip}:
                                            {player.server.port}
                                        </DataList.ItemValue>
                                    </DataList.Item>
                                </>
                            )}
                        </DataList.Root>
                    </DialogBody>
                    <DialogCloseTrigger asChild>
                        <CloseButton size='sm' />
                    </DialogCloseTrigger>
                    {player.status === 'online' && (
                        <DialogFooter>
                            <Button
                                colorPalette='gray'
                                variant='subtle'
                                onClick={() => {
                                    window.open(
                                        `ddnet://${player.server.ip}:${player.server.port}`
                                    );
                                }}
                            >
                                Join
                            </Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </DialogPositioner>
        </Portal>
    );
}
