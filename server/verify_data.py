#!/usr/bin/env python3
"""Quick verification that all 19 cities have tips and phrases exist."""

import sys
sys.path.insert(0, '/Users/ayahsaleh/Desktop/seniorProject/MyTranslationBuddy/server')

from app.data.cities import (
    berlin_city, munich_city, vienna_city, hamburg_city,
    bonn_city, aachen_city, ebs_city, mannheim_city,
    zurich_city, salzburg_city, wurzburg_city, leipzig_city,
    detmold_city, stuttgart_city, eltville_city, osnabruck_city,
    vallendar_city, jena_city, lemgo_city
)
from app.data.tips import (
    berlin_tips, munich_tips, vienna_tips, hamburg_tips,
    bonn_tips, aachen_tips, ebs_tips,
    salzburg_tips, wurzburg_tips, wu_vienna_tips,
    detmold_tips, stuttgart_tips, eltville_tips, osnabruck_tips,
    vallendar_tips, jena_tips, lemgo_tips,
    zurich_tips, mannheim_tips, leipzig_tips
)
from app.data.phrases import all_phrases

print("\n" + "="*70)
print("DATABASE PRODUCTION READINESS CHECK")
print("="*70)

# Check cities
cities = [
    berlin_city, munich_city, vienna_city, hamburg_city,
    bonn_city, aachen_city, ebs_city, mannheim_city,
    zurich_city, salzburg_city, wurzburg_city, leipzig_city,
    detmold_city, stuttgart_city, eltville_city, osnabruck_city,
    vallendar_city, jena_city, lemgo_city
]

print(f"\n✓ Total cities defined: {len(cities)}")

# Check tips
tips_by_city = {
    "berlin": berlin_tips,
    "munich": munich_tips,
    "vienna": vienna_tips,
    "hamburg": hamburg_tips,
    "bonn": bonn_tips,
    "aachen": aachen_tips,
    "ebs": ebs_tips,
    "salzburg": salzburg_tips,
    "wurzburg": wurzburg_tips,
    "wu_vienna": wu_vienna_tips,
    "detmold": detmold_tips,
    "stuttgart": stuttgart_tips,
    "eltville": eltville_tips,
    "osnabruck": osnabruck_tips,
    "vallendar": vallendar_tips,
    "jena": jena_tips,
    "lemgo": lemgo_tips,
    "zurich": zurich_tips,
    "mannheim": mannheim_tips,
    "leipzig": leipzig_tips,
}

all_tips = []
for tips in tips_by_city.values():
    all_tips.extend(tips)

print(f"✓ Total cities with tips: {len(tips_by_city)}")
print(f"✓ Total tips defined: {len(all_tips)}")

for city_slug, tips in sorted(tips_by_city.items()):
    status = "✓" if len(tips) > 0 else "✗"
    print(f"  {status} {city_slug}: {len(tips)} tips")

# Check for missing cities
all_city_slugs = {city.slug for city in cities}
cities_with_tips = set(tips_by_city.keys())

missing_tips = all_city_slugs - cities_with_tips
if missing_tips:
    print(f"\n✗ Cities WITHOUT tips ({len(missing_tips)}):")
    for slug in sorted(missing_tips):
        print(f"  - {slug}")
else:
    print(f"\n✓ All {len(cities)} cities have tips!")

# Check phrases
print(f"\n✓ Total phrases defined: {len(all_phrases)}")

if len(all_phrases) >= 100:
    print(f"✓ Phrase library is comprehensive ({len(all_phrases)} phrases)")
else:
    print(f"✗ Phrase library is small ({len(all_phrases)} phrases)")

# Check phrase categories
from collections import defaultdict
categories = defaultdict(int)
registers = defaultdict(int)
difficulty = defaultdict(int)

for phrase in all_phrases:
    categories[phrase.category] += 1
    registers[phrase.register] += 1
    difficulty[phrase.difficulty_level] += 1

print(f"\n✓ Phrase categories: {len(categories)}")
for cat in sorted(categories.keys()):
    print(f"  - {cat}: {categories[cat]}")

print(f"\n✓ Difficulty levels: {len(difficulty)}")
for level in sorted(difficulty.keys()):
    print(f"  - Level {level}: {difficulty[level]}")

# Check phrase city coverage
phrases_per_city = defaultdict(int)
for phrase in all_phrases:
    for slug in phrase.city_slugs:
        phrases_per_city[slug] += 1

print(f"\n✓ Cities with phrases: {len(phrases_per_city)}/{len(all_city_slugs)}")
coverage_pct = (len(phrases_per_city) / len(all_city_slugs)) * 100
print(f"✓ Coverage: {coverage_pct:.0f}%")

cities_no_phrases = all_city_slugs - set(phrases_per_city.keys())
if cities_no_phrases:
    print(f"\n⚠ Cities without phrases ({len(cities_no_phrases)}):")
    for slug in sorted(cities_no_phrases):
        print(f"  - {slug}")

# Final assessment
print("\n" + "="*70)
print("PRODUCTION READINESS SCORE")
print("="*70)

checks_passed = 0
total_checks = 5

checks = [
    ("All 19 cities defined", len(cities) == 19),
    ("All cities have tips", len(missing_tips) == 0),
    ("Phrase library ≥100", len(all_phrases) >= 100),
    ("Phrases cover ≥70% cities", coverage_pct >= 70),
    ("Multiple phrase categories", len(categories) >= 10),
]

for check_name, passed in checks:
    status = "✓" if passed else "✗"
    print(f"  {status} {check_name}")
    if passed:
        checks_passed += 1

score = (checks_passed / total_checks) * 100
print(f"\n[SCORE: {checks_passed}/{total_checks} ({score:.0f}%)]")

if score >= 80:
    print("\n🚀 DATABASE IS PRODUCTION-READY")
    sys.exit(0)
else:
    print("\n⚠️  DATABASE NEEDS IMPROVEMENTS")
    sys.exit(1)
