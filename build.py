import os
import re
import sys
import json
import argparse
import textwrap
from typing import Any

version = "0.1"


class Extension:
    def __init__(self, browser: str) -> None:
        self.browser = browser

    @staticmethod
    def _remove_comments(s: str, /) -> str:
        return re.sub(r"\s*/\*\*(.|\n)*?\*/", '', s, flags=re.M)

    @property
    def handlers(self):
        for name in os.listdir("src/handlers"):
            path = "src/handlers/" + name
            with open(path) as file:
                data = file.read()
                data = self._remove_comments(data)
                yield name, data

    @property
    def _content(self) -> str:
        content = "(function(){"
        content += "\n    console.log(\"content.js\");"
        with open("src/functions.js") as file:
            data = file.read()
            data = self._remove_comments(data)
            content += '\n' + textwrap.indent(data, ' ' * 4)
        content += "\n    let handlers = ["
        for _, handler in self.handlers:
            content += '\n' + textwrap.indent(handler.strip(), ' ' * 8) + ','
        content += "\n    ];"
        content += "\n    for (const handler of handlers)"
        content += "\n        handler(window);"
        content += "\n})();\n"
        return content

    @property
    def manifest(self) -> dict[str, Any]:
        manifest = {
            "manifest_version": 3,
            "name": "BetterPages",
            "version": version,
            "host_permissions": ["<all_urls>"],
            "permissions": ["activeTab"],
            "content_scripts": [
                {
                    "run_at": "document_start",
                    "matches": ["<all_urls>"],
                    "world": "MAIN",
                    "js": ["content.js"]
                },
            ],
            "web_accessible_resources": [
                {"resources": ["*.js"], "matches": ["<all_urls>"]},
            ],
        }
        return manifest

    def build(self):
        if not os.path.exists("extension"):
            os.mkdir("extension")
        with open("extension/manifest.json", 'w') as file:
            json.dump(self.manifest, file, separators=(", ", ": "), indent=2)
            file.write('\n')
        with open("extension/content.js", 'w') as file:
            file.write(self._content)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--browser", choices=("Chrome",), default="Chrome")

    args = parser.parse_args(sys.argv[1:])

    extension = Extension(args.browser)
    extension.build()
