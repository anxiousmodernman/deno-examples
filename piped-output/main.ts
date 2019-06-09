

async function main(): Promise<void> {

    let p1 = Deno.run({
        args: ["./print-stuff.sh"],
        stdout: "piped",
    });

    let p2 = Deno.run({
        args: ["awk", "-f", "parse-stuff.awk"],
        stdin: "piped",
    });

    let streamed = Deno.copy(p2.stdin, p1.stdout);
    let n = await streamed;
    console.log("bytes copied:", n);

    // hangs
    // await Promise.all([p1.status(), p2.status()]);
 
    // works
    // await Promise.all([p1.status()]);

    // hangs
    // await Promise.all([p2.status()]);

    // Can only await p1
    let code1 = await p1.status();
    // p1.stdout.close();
    // let code = await p2.status();

}

main();
