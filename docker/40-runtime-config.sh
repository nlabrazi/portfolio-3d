#!/bin/sh
set -eu

ESCAPED_KEY=$(printf '%s' "${NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY:-}" | sed 's/\\/\\\\/g; s/"/\\"/g')
printf 'window.__PORTFOLIO_RUNTIME_CONFIG__ = { web3formsAccessKey: "%s" };\n' "$ESCAPED_KEY" > /usr/share/nginx/html/runtime-config.js
