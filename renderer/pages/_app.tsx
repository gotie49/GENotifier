import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script
                src='http://localhost:8888/color.js'
                strategy='afterInteractive'
            />
            <ChakraProvider value={defaultSystem}>
                <ThemeProvider attribute='class' disableTransitionOnChange>
                    <Component {...pageProps} />
                </ThemeProvider>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
