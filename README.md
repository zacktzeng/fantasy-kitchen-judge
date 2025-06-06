# Fantasy Kitchen Judge

A whimsical web app where players submit fantasy-themed dishes and receive a structured critique from an AI culinary judge. Scoring covers flavor synergy, technique, creativity, presentation, and bonus considerations.

## Features

- Interactive form to describe your fantasy dish
- Optional upload for judging settings to customize the criteria
- Real-time structured feedback with:
    - Score breakdown (out of 45)
    - Rank tier (S+, S, A, etc.)
    - Judge’s comment and stylized visual description

## How to Use

1. Describe Your Dish

    Enter your custom fantasy dish in natural language.

2. (Optional) Upload Settings File

    Customize the judging behavior by uploading a `.txt` file with judging guidelines.
Use the provided example below to get started.

3. Submit for Judgment

    Click "Judge My Dish" and await the council’s verdict.

## Example Settings File

Create a file named `fantasy-settings.txt` with the following content:

```txt
Use stricter standards for presentation:
- Deduct points if the visual imagery is confusing or contains modern elements.

Increase scrutiny on flavor synergy:
- Deduct up to 2 points if ingredient combinations are unconventional without justification.

Emphasize storytelling bonus:
- Only give 5/5 bonus if the dish ties into a local legend or cultural event.
```

## Example Dish Description
Paste this in the input field for testing:

```txt
I created a Moonlit Lavender Venison Roast, using tender cuts of venison marinated in juniper berry wine and slow-roasted over elderwood embers. The meat is plated atop a puree of moon tubers and garnished with caramelized ghost onions and crushed frostpetal blossoms. A drizzle of fermented dew honey reduction completes the dish. The recipe is inspired by a mythic winter hunt beneath a lunar eclipse.
```