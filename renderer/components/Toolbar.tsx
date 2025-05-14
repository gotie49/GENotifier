import { Button, Flex, Heading, Menu, Portal } from '@chakra-ui/react';
import { Toaster } from './ui/toaster';

export default function Toolbar({ onRefresh }) {
    return (
        <Flex
            as='nav'
            bg='blackAlpha'
            color='white'
            p={4}
            align='center'
            justify='space-between'
        >
            <Heading size='md' css={{ '-webkit-app-region': 'drag' }}>
                GENotifier
            </Heading>
            <Flex justify='space-between' gap={5}>
                <Button
                    colorPalette='gray'
                    variant='subtle'
                    onClick={onRefresh}
                >
                    Refresh
                </Button>
                <Toaster />
                <Menu.Root>
                    <Menu.Trigger asChild>
                        <Button colorPalette='gray' variant='subtle'>
                            Menu
                        </Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Item
                                    value='edit-player-config'
                                    onClick={() =>
                                        window.ipc.send('edit-config', null)
                                    }
                                >
                                    Edit Player Configuration
                                </Menu.Item>
                                <Menu.Item
                                    value='minimize'
                                    onClick={() =>
                                        window.ipc.send('minimize-app', null)
                                    }
                                >
                                    Minimize
                                </Menu.Item>
                                <Menu.Item
                                    value='quit'
                                    onClick={() =>
                                        window.ipc.send('quit-app', null)
                                    }
                                >
                                    Quit
                                </Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </Flex>
        </Flex>
    );
}
