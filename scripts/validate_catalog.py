from pathlib import Path
import re

BASE_DIR = Path(__file__).resolve().parent.parent

def parse_poles(file_path):
    text = file_path.read_text(encoding='utf-8')
    pole_pattern = re.compile(r"slug:\s*'([^']+)'[\s\S]*?domains:\s*\[([\s\S]*?)\]", re.MULTILINE)
    domain_pattern = re.compile(r"slug:\s*'([^']+)'", re.MULTILINE)
    poles = {}
    for pole_match in pole_pattern.finditer(text):
        pole_slug = pole_match.group(1)
        domains_text = pole_match.group(2)
        domains = domain_pattern.findall(domains_text)
        poles[pole_slug] = set(domains)
    return poles


def parse_items(file_path):
    text = file_path.read_text(encoding='utf-8')
    item_pattern = re.compile(r"slug:\s*'([^']+)'[\s\S]*?pole:\s*'([^']+)'[\s\S]*?domain:\s*'([^']+)'", re.MULTILINE)
    return [{'slug': m.group(1), 'pole': m.group(2), 'domain': m.group(3)} for m in item_pattern.finditer(text)]


def main():
    poles = parse_poles(BASE_DIR / 'data' / 'poles.ts')
    products = parse_items(BASE_DIR / 'data' / 'products.ts')
    services = parse_items(BASE_DIR / 'data' / 'services.ts')

    errors = []
    for item in products + services:
        if item['pole'] not in poles:
            errors.append(f"Missing pole '{item['pole']}' for item '{item['slug']}'")
            continue
        if item['domain'] not in poles[item['pole']]:
            errors.append(f"Missing domain '{item['domain']}' in pole '{item['pole']}' for item '{item['slug']}'")

    print(f"poles={len(poles)} products={len(products)} services={len(services)}")
    if errors:
        print('VALIDATION FAILED')
        for err in errors:
            print(err)
        raise SystemExit(1)
    print('VALIDATION OK')

    temp_files = [BASE_DIR / 'data' / 'poles_new.ts', BASE_DIR / 'data' / 'products_new.ts']
    for temp in temp_files:
        if temp.exists():
            temp.unlink()
            print(f'Removed temp file: {temp.name}')

    apply_script = BASE_DIR / 'scripts' / 'apply_new_catalog.py'
    if apply_script.exists():
        apply_script.unlink()
        print('Removed temporary script: apply_new_catalog.py')

if __name__ == '__main__':
    main()
