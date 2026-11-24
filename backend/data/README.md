# Data

Source data used to prepare the app's demo seeds. Data files are **never** stored in git; only this README and the
empty `.gitkeep` files are versioned. Files the running app needs live in `frontend/src/data/` (bundled) and
`frontend/public/data/` (fetched at runtime), not here.

```
raw/         extracts exactly as received. Never edit or overwrite.
interim/     cleaned / joined files
processed/   outputs (e.g. a regenerated demo seed before it is copied into frontend/)
```

## Sources

| Source | What | Licence | Owner |
|---|---|---|---|
| NASA FIRMS (https://firms.modaps.eosdis.nasa.gov/) | VIIRS NRT active fire detections (SNPP, NOAA-20, NOAA-21), clipped to Indonesia | NASA open data | TODO(owner) |

## Extraction log

Add a row every time a file lands in `raw/`. Hash: `sha256sum <file>` (Git Bash / Linux / macOS) or
`certutil -hashfile <file> SHA256` (Windows).

| File | Source | Extracted (UTC) | By | Rows | sha256 |
|---|---|---|---|---|---|
| `raw/firms/firms_viirs_snpp_nrt_2026-08-28_to_2026-09-04_clipped_indonesia.geojson` | FIRMS VIIRS SNPP NRT | TODO | TODO | TODO | `6b3b3572…2667` |
| `raw/firms/firms_viirs_snpp_nrt_2026-08-28_to_2026-09-04_clipped_indonesia_with_timeslot.geojson` | same + time slot | TODO | TODO | TODO | `7bdcbb48…626d` |
| `raw/firms/firms_viirs_noaa20_nrt_2026-08-28_to_2026-09-04_clipped_indonesia_with_timeslot.geojson` | FIRMS VIIRS NOAA-20 NRT + time slot | TODO | TODO | TODO | `38b46465…faab` |
| `raw/firms/firms_viirs_noaa21_nrt_2026-08-28_to_2026-09-04_clipped_indonesia_with_timeslot.geojson` | FIRMS VIIRS NOAA-21 NRT + time slot | TODO | TODO | TODO | `481a1ca9…e450` |

Strictly, the `_clipped_` / `_with_timeslot` files are already processed (clipped, time slot added); move them to
`interim/` once the original FIRMS downloads are stored in `raw/`. (The old 53 MB `indonesia-seed.json` built from these files was
removed on 2026-11-16; the "Indonesia" AOI now uses live FIRMS data.)

## Personal data

None.
