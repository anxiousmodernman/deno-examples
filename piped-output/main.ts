

async function main(): Promise<void> {

    let p1 = Deno.run({
        args: ["./print-stuff.sh"],
        stdout: "piped",
    });

    let p2 = Deno.run({
        args: ["awk", "-f", "parse-stuff.awk"],
        stdin: "piped",
    });

    console.log("one");
    let promises = await Promise.all([p1.status(), p2.status()]);
    console.log("two");
    Deno.copy(p2.stdin, p1.stdout);
    console.log("three");

    return;

}

main();
