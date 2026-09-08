import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { test } from "node:test"
import { setTimeout } from "node:timers/promises"

const docker = (...args) =>
	execFileSync("docker", args, { encoding: "utf8", timeout: 600_000 }).trim()

test("Node 24 generates a static portfolio served by Nginx", {
	timeout: 900_000,
}, async () => {
	const devImage = `portfolio-3d:test-dev-${process.pid}`
	const prodImage = `portfolio-3d:test-prod-${process.pid}`
	let container
	try {
		docker("build", "--target", "dev", "--tag", devImage, ".")
		docker(
			"run",
			"--rm",
			devImage,
			"node",
			"--input-type=module",
			"-e",
			`
			import assert from 'node:assert/strict';
			import { existsSync } from 'node:fs';
			assert.equal(process.versions.node.split('.')[0], '24');
			assert.notEqual(process.getuid(), 0);
			for (const path of ['.env', '.git', '.codex', '.agents']) {
				assert.equal(existsSync('/app/' + path), false, path + ' leaked into image');
			}
		`,
		)
		docker("build", "--target", "prod", "--tag", prodImage, ".")
		docker(
			"run",
			"--rm",
			prodImage,
			"sh",
			"-ec",
			`
			test -f /usr/share/nginx/html/index.html
			test ! -d /app/node_modules
			test ! -d /app/.output/server
			! command -v node
		`,
		)
		container = docker(
			"run",
			"--detach",
			"--rm",
			"--publish",
			"127.0.0.1::80",
			prodImage,
		)
		const address = docker("port", container, "80/tcp")
		const url = `http://${address}`
		let response
		for (let attempt = 0; attempt < 30; attempt++) {
			try {
				response = await fetch(url, { signal: AbortSignal.timeout(2_000) })
				break
			} catch {
				await setTimeout(500)
			}
		}
		assert.ok(response, "Container did not start listening")
		assert.equal(response.status, 200)
		const html = await response.text()
		assert.match(html, /Nabil Labrazi/)
		assert.match(html, /id="projects"/)
		const asset = html.match(/src="([^"]+\.js)"/)
		assert.ok(asset, "Generated page must reference its client JavaScript")
		const assetResponse = await fetch(new URL(asset[1], url), {
			signal: AbortSignal.timeout(5_000),
		})
		assert.equal(assetResponse.status, 200)
		assert.match(assetResponse.headers.get("content-type"), /javascript/)
	} finally {
		if (container) docker("stop", container)
		for (const image of [devImage, prodImage]) {
			try {
				docker("image", "rm", image)
			} catch {
				/* Build may have failed before creating the tag. */
			}
		}
	}
})
