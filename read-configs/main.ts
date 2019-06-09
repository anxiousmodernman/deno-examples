// @ts-ignore
import { readJsonSync } from "https://deno.land/std/fs/mod.ts";

function readConfig(path: string): unknown {
    // @ts-ignore
    const file = readJsonSync(path);
    return file
}

async function main() {
    console.log(readConfig('./conf.json'))
}

main();
