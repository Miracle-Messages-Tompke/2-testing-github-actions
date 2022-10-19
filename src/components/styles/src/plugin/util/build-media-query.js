/* eslint-disable no-shadow */
export default function buildMediaQuery(screens) {
  screens = Array.isArray(screens) ? screens : [screens];

  return screens
  .map((screen) =>
  screen.values.map((screen) => {
    if (screen.raw !== undefined) {
      return screen.raw;
    }

    return [
      screen.min && `(min-width: ${screen.min})`,
      screen.max && `(max-width: ${screen.max})`
    ]
    .filter(Boolean)
    .join(" and ");
  })
  )
  .join(", ");
}
