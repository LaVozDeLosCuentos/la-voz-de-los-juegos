import { readdir, writeFile } from 'fs/promises';
import { join, basename, extname } from 'path';

const charactersDir = join(process.cwd(), 'public', 'assets', 'characters');
const outputFilePath = join(process.cwd(), 'src', 'data', 'characters.json');

async function generateCharacters() {
    try {
        const files = await readdir(charactersDir);
        const characters = files
            .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file))
            .map((file, index) => ({
                id: index + 1,
                name: basename(file, extname(file)),
                img: `/assets/characters/${file}`
            }));

        await writeFile(outputFilePath, JSON.stringify(characters, null, 2));
        console.log('characters.json has been generated successfully.');
    } catch (err) {
        console.error('Error:', err);
    }
}

generateCharacters();
