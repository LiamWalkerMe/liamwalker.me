# Photography Editing

Edit `photography.collections.json` to change the Photography page.

## Add A Collection

1. Add your images to `public/assets/Photography/YourFolder/`.
2. Copy one object inside the `collections` array.
3. Change `title`, `locations`, `note`, and `images`.
4. Set `enabled` to `true`.

## Image Paths

Use public paths that start after the `public` folder:

```json
"/assets/Photography/YourFolder/Image1.jpg"
```

## Layout

The `layout` list repeats across the images in order.

Use `single` for one tall image tile:

```json
"layout": ["single"]
```

Use `stack` for two images stacked in one tile:

```json
"layout": ["stack"]
```

Mix them for a rhythm:

```json
"layout": ["single", "stack", "single", "single"]
```

If a collection has 9 images and this layout, the page reads it left to right as:

```text
1 image, 2 images, 1 image, 1 image, then repeat
```

## Hide A Collection

Set `enabled` to `false` to hide a collection without deleting it.
