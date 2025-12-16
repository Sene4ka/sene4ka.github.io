import React, { useEffect, useState } from 'react';

interface IconProps {
    name: string;
    className?: string;
}

export default function Icon({ name, className = '' }: IconProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const updateTheme = () => {
            setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const basePath = import.meta.env.BASE_URL;
    const iconPath = `${basePath}img/icons/${theme}/${name}.png`;

    console.log('Icon debug:', {
        name,
        theme,
        basePath,
        fullPath: iconPath,
        publicUrl: window.location.origin + iconPath
    });

    if (failed) {
        console.warn(`Icon not found: ${iconPath}`);
        return <div className={`${className} bg-gray-400 rounded`} />;
    }

    return (
        <img
            src={iconPath}
            alt={name}
            className={className}
            onError={() => setFailed(true)}
            loading="lazy"
        />
    );
}