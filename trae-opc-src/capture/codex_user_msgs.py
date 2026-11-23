# 列出某天 Codex 会话里用户发的消息：python codex_user_msgs.py 2026/10/07 [关键词]
import io, json, sys, glob, os
import zstandard as zstd

day = sys.argv[1]
kw = sys.argv[2] if len(sys.argv) > 2 else ""
root = os.path.expanduser(f"~/.codex/sessions/{day}")
for f in sorted(glob.glob(root + "/*.jsonl*")):
    raw = open(f, "rb").read()
    if f.endswith(".zst"):
        raw = zstd.ZstdDecompressor().stream_reader(io.BytesIO(raw)).read()
    print("=====", os.path.basename(f))
    for line in raw.decode("utf-8", "replace").splitlines():
        try:
            o = json.loads(line)
        except Exception:
            continue
        p = o.get("payload", {})
        if o.get("type") == "response_item" and p.get("role") == "user":
            for c in p.get("content", []):
                t = c.get("text", "")
                if t and not t.startswith("<") and (kw in t):
                    print("[%s] %s" % (o.get("timestamp", "")[:19], t[:1500]))
                    print("---")
