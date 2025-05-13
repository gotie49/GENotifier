import { useEffect, useRef, useState } from 'react';

export default function Tee({ player, enableMouseTracking = true }: any) {
    const teeRef = useRef<HTMLDivElement>(null);
    const teeInstanceRef = useRef<any>(null);
    const [isTeeAssemblerLoaded, setIsTeeAssemblerLoaded] = useState(false);

    useEffect(() => {
        if (window.TeeAssembler) {
            setIsTeeAssemblerLoaded(true);
            return;
        }

        const handleScriptLoad = () => {
            if (window.TeeAssembler) {
                setIsTeeAssemblerLoaded(true);
            }
        };

        const isProd = process.env.NODE_ENV === 'production';
        const scriptSrc = isProd
            ? '/TeeAssembler.js'
            : 'http://localhost:8888/TeeAssembler.js';

        let script = document.querySelector(
            `script[src="${scriptSrc}"]`
        ) as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            document.body.appendChild(script);
        }

        script.addEventListener('load', handleScriptLoad);

        return () => {
            script.removeEventListener('load', handleScriptLoad);
        };
    }, []);

    useEffect(() => {
        if (isTeeAssemblerLoaded && teeRef.current && !teeInstanceRef.current) {
            teeInstanceRef.current = new window.TeeAssembler.Tee({
                container: teeRef.current,
                imageLink: `https://ddnet.org/skins/skin/${player.skin}.png`,
                ...(player.color && {
                    bodyColor: player.color,
                    feetColor: player.foot_color,
                    colorFormat: 'code',
                }),
            });

            if (enableMouseTracking) {
                teeInstanceRef.current.api.functions.lookAtCursor();
                teeInstanceRef.current.api.functions.setEyeType('happy');
            }
        }

        return () => {
            if (teeInstanceRef.current) {
                if (enableMouseTracking) {
                    teeInstanceRef.current.api.functions.dontLookAtCursor();
                    teeInstanceRef.current.api.functions.setEyeType('default');
                }
                teeInstanceRef.current.api.functions.unbindContainer();
                teeInstanceRef.current = null;
            }
        };
    }, [isTeeAssemblerLoaded]);

    useEffect(() => {
        const api = teeInstanceRef.current?.api?.functions;
        if (!api) return;

        if (enableMouseTracking) {
            api.lookAtCursor();
            api.setEyeType('happy');
        } else {
            api.dontLookAtCursor();
            api.setEyeType('default');
        }
    }, [enableMouseTracking]);

    return <div className='teeassembler-tee' ref={teeRef} />;
}
