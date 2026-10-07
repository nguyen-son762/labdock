#!/usr/bin/env bash

set -u

failures=0

run_check() {
  local label="$1"
  shift

  printf '\n[%s]\n' "$label"
  if "$@"; then
    printf '[PASS] %s\n' "$label"
  else
    printf '[FAIL] %s\n' "$label"
    failures=$((failures + 1))
  fi
}

run_check "TypeScript" npm run typecheck
run_check "ESLint" npm run lint
run_check "Vitest" npm test -- --run

if npm run | grep -qE '^  test:e2e'; then
  run_check "Playwright E2E" npm run test:e2e
else
  printf '\n[SKIP] Playwright E2E: no test:e2e script configured\n'
fi

if [ "$failures" -gt 0 ]; then
  printf '\nQA baseline finished with %s failing check(s).\n' "$failures"
  exit 1
fi

printf '\nQA baseline passed.\n'
