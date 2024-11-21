import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async ({ params }) => {
    const { lang, length } = params;
    const filePath = path.resolve(`./src/assets/game/${lang}/${length}.txt`);

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const words = data.split('\n').map(word => word.trim()).filter(word => word !== '');

        return new Response(JSON.stringify(words), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return new Response(JSON.stringify({ error: 'File not found or invalid parameters' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};

export function getStaticPaths() {
    return [
        { params: { lang: 'en', length: '4' } },
        { params: { lang: 'en', length: '5' } },
        { params: { lang: 'en', length: '6' } },
        { params: { lang: 'en', length: '7' } },
        { params: { lang: 'en', length: '8' } },
        { params: { lang: 'en', length: '9' } },
        { params: { lang: 'en', length: '10' } },
        { params: { lang: 'es', length: '4' } },
        { params: { lang: 'es', length: '5' } }, 
        { params: { lang: 'es', length: '6' } },
        { params: { lang: 'es', length: '7' } },
        { params: { lang: 'es', length: '8' } },
        { params: { lang: 'es', length: '9' } },
        { params: { lang: 'es', length: '10' } },
        
    ];
}
