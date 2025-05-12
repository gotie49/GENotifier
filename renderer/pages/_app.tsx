import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
    const isProd = process.env.NODE_ENV === 'production';
    const scriptSrc = isProd ? '/color.js' : 'http://localhost:8888/color.js';
    return (
        <>
            <Script src={scriptSrc} strategy='afterInteractive' />
            <ChakraProvider value={defaultSystem}>
                <ThemeProvider attribute='class' disableTransitionOnChange>
                    <Component {...pageProps} />
                </ThemeProvider>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
