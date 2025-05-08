import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    render() {
        return (
            <Html suppressHydrationWarning>
                <link rel='stylesheet' href='http://localhost:8888/Tee.css' />
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
