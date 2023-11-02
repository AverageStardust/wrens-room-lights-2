import * as path from "https://deno.land/std@0.205.0/path/mod.ts";

import meta from "./meta.json" assert { type: "json" };

const siteURL = "https://wrens-room-lights-2.web.app";

async function main() {
	// check versions
	const successorMetaURL = path.join(siteURL, "./devicePayload/meta.json");
	const successorMetaResponse = await fetch(successorMetaURL);
	const successorMeta = await successorMetaResponse.json() as typeof meta;

	if (meta.version >= successorMeta.version) {
		console.log(`Payload v${meta.version} is up to date`);

		// open main
		const succeed = new Deno.Command("bash", {
			args: ["./startMain.sh"]
		});
		await succeed.output();
	} else {
		console.log(`Updating payload v${meta.version} to v${successorMeta.version}`);

		// download payload
		const successorURL = path.join(siteURL, "./devicePayload.zip");
		const successorResponse = await fetch(successorURL);
		const successorArray = new Uint8Array(await successorResponse.arrayBuffer());
		Deno.writeFile("../devicePayload.zip", successorArray, { create: true });

		// replace self and start new
		const succeed = new Deno.Command("bash", {
			args: ["./succeed.sh", path.basename(Deno.cwd())]
		});
		await succeed.output();
	}
}

main();