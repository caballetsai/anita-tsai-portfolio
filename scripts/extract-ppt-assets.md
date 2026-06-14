# Extract PPT Assets

Source PPT: `/Users/caballe/Downloads/蔡靚萱介紹.pptx`

The first extraction pass was run from the parent Codex workspace with:

```bash
/Users/caballe/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/extract_sources.py \
  --pptx /Users/caballe/Downloads/蔡靚萱介紹.pptx \
  --pdf "/Users/caballe/Downloads/Profile (1).pdf" \
  --doc "/Users/caballe/Library/CloudStorage/OneDrive-個人/文件/辦公室舊資料2/公事資料夾/AnitaBio.doc" \
  --profile-photo "/Users/caballe/Library/CloudStorage/OneDrive-個人/文件/個人與學習/我的證件保單稅單與各種證明/我的profile照/涵羚幫我拍的沙龍照，版權是商周/靚萱profile照小檔20230517.JPG" \
  --out work/sources
```

Result:

- 7 PPT slides parsed
- 35 WebP cover/image candidates generated
- Profile photo converted to WebP

Only selected cover candidates were copied into `public/assets/covers/`. Logos and non-work decorative images should stay out of public work galleries unless Anita explicitly wants them.
