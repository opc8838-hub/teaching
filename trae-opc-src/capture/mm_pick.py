# 从 D:\mutedmen 每个编号作品里挑定稿，出缩略图到课件 img/mm
import json, os, re, glob
from PIL import Image, ImageOps

SRC = "D:/mutedmen"
OUT = "E:/碳基/_deploy/teaching/trae-opc/img/mm"
os.makedirs(OUT, exist_ok=True)
items = []
for d in sorted(os.listdir(SRC)):
    m = re.match(r"#(\d{3})(.*)", d)
    if not m:
        continue
    folder = os.path.join(SRC, d)
    imgs = [f for f in glob.glob(folder + "/*") if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
    if not imgs:
        continue
    pref = [f for f in imgs if os.path.basename(f).split(".")[0] in ("定稿", "最终", "终稿")]
    pick = pref[0] if pref else max(imgs, key=os.path.getmtime)
    try:
        im = ImageOps.exif_transpose(Image.open(pick)).convert("RGB")
    except Exception as e:
        print("skip", d, e); continue
    no = m.group(1)
    name = m.group(2).replace("系列系列", "系列")
    key = f"{no}_{len(items):03d}"
    big = im.copy(); big.thumbnail((1400, 1400)); big.save(f"{OUT}/{key}.jpg", quality=84)
    sm = im.copy(); sm.thumbnail((420, 420)); sm.save(f"{OUT}/{key}_s.jpg", quality=80)
    items.append({"no": no, "name": name, "key": key, "w": im.width, "h": im.height})
    print(no, name, im.size)
json.dump(items, open(OUT + "/index.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
print(len(items))
