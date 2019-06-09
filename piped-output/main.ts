

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

    await Promise.all([p1.status(), p2.status()]);

    let n = await streamed;

    console.log("bytes copied:", n);

    return;

}

main();
