import * as path from "https://deno.land/std@0.205.0/path/mod.ts";

import meta from "./meta.json" assert { type: "json" };

const siteURL = "https://wrens-room-lights-2.web.app";

async function main() {
	// check versions
	const successorMetaURL = path.join(siteURL, "./devicePayload/meta.json");
	const successorMetaResponse = await resilientFetch(successorMetaURL);
	const successorMeta = await successorMetaResponse.json() as typeof meta;

	if (meta.version >= successorMeta.version) {
		startMain();
	} else {
		updatePayload(successorMeta);
	}
}

async function startMain() {
	console.log(`Payload v${meta.version} is up to date`);

	// open main
	const succeed = new Deno.Command("bash", {
		args: ["./startMain.sh"]
	});
	await succeed.output();
}

async function updatePayload(successorMeta: typeof meta) {
	console.log(`Updating payload v${meta.version} to v${successorMeta.version}`);

	// download payload
	const successorURL = path.join(siteURL, "./devicePayload.zip");
	const successorResponse = await resilientFetch(successorURL);
	const successorArray = new Uint8Array(await successorResponse.arrayBuffer());
	Deno.writeFile("../devicePayload.zip", successorArray, { create: true });

	// replace self and start new
	const succeed = new Deno.Command("bash", {
		args: ["./succeed.sh", path.basename(Deno.cwd())]
	});
	await succeed.output();
}

async function resilientFetch(input: string | URL | Request, init?: RequestInit, tries = 5) {
	let msDelay = 500;
	let lastError;

	while (tries > 0) {
		try {
			return await fetch(input, init);
		} catch (error) {
			lastError = error;
		}
		tries--;
		delay(msDelay);
		msDelay *= 2;
	}

	throw lastError;
}

function delay(msDelay: number) {
	return new Promise((resolve) => setTimeout(resolve, msDelay));
}

main();