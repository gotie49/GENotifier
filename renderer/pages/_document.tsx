import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    render() {
        const isProd = process.env.NODE_ENV === 'production';
        const styleSrc = isProd ? '/Tee.css' : 'http://localhost:8888/Tee.css';
        return (
            <Html suppressHydrationWarning>
                <link rel='stylesheet' href={styleSrc} />
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
