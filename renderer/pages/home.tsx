'use client';

import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import { ExtendedPlayer } from '../lib/types';
import Toolbar from '../components/Toolbar';
import PlayerGrid from '../components/PlayerGrid';
import { toaster } from '../components/ui/toaster';

export default function HomePage() {
    const [players, setPlayers] = useState<ExtendedPlayer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribePlayerData = window.ipc.on(
            'players-data',
            (playersData) => {
                setPlayers(playersData as ExtendedPlayer[]);
                setIsLoading(false);
                setError(null);
                toaster.create({
                    description: 'Player Data loaded',
                    type: 'info',
                });
            }
        );

        const unsubscribePlayerError = window.ipc.on(
            'players-error',
            (errorData) => {
                const typedError = errorData as { message: string };
                setError(typedError.message);
                setIsLoading(false);
            }
        );

        setInterval(() => {
            window.ipc.send('fetch-players', null);
        }, 60000);

        window.ipc.send('fetch-players', null);

        return () => {
            unsubscribePlayerData();
            unsubscribePlayerError();
        };
    }, []);

    return (
        <Flex direction='column' minH='100vh'>
            <Toolbar onRefresh={refreshPlayers} />
            <Box as='main' flex='1' p={6}>
                <PlayerGrid players={players} />
                {isLoading && (
                    <Box pos='absolute' inset='0' bg='bg/80'>
                        <Center h='full'>
                            <Spinner color='white' />
                        </Center>
                    </Box>
                )}
            </Box>
        </Flex>
    );
}

function refreshPlayers() {
    window.ipc.send('fetch-players', null);
}
