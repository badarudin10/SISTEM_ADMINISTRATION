from pathlib import Path
from PIL import Image

source = Path("/home/ubuntu/work_lpt/source-page.png")
target = Path("/home/ubuntu/webdev-static-assets/kop-lpt-uptd-farmasi.png")

image = Image.open(source).convert("RGB")
width, height = image.size

# Halaman A4 sumber dirender 300 DPI. Area ini mencakup logo, nama instansi,
# alamat, dan dua garis bawah kop; konten BAST pertama sengaja tidak disertakan.
letterhead = image.crop((0, 0, width, int(height * 0.16)))
target.parent.mkdir(parents=True, exist_ok=True)
letterhead.save(target, "PNG", optimize=True)
print(f"{target} {letterhead.size[0]}x{letterhead.size[1]}")
