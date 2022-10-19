/* eslint-disable no-unused-vars */
export enum ICON_POSITION {
  LEFT = "left",
  RIGHT = "right"
}

export enum TABLE_SIZE {
  SHORT = "short",
  DEFAULT = "",
  TALL = "tall"
}

export enum TABLE_SORT_DIRECTION {
  NONE = "none",
  ASCENDING = "ascending",
  DESCENDING = "descending"
}

export enum TABLE_SORT_CYCLE {
  BI_STATES_FROM_ASCENDING = "bi-states-from-ascending",
  BI_STATES_FROM_DESCENDING = "bi-states-from-descending",
  TRI_STATES_FROM_ASCENDING = "tri-states-from-ascending",
  TRI_STATES_FROM_DESCENDING = "tri-states-from-descending"
}

/**
 * Mapping of table sort cycles to table sort states.
 */
export const TABLE_SORT_CYCLES = {
  [TABLE_SORT_CYCLE.BI_STATES_FROM_ASCENDING]: [
    TABLE_SORT_DIRECTION.ASCENDING,
    TABLE_SORT_DIRECTION.DESCENDING
  ],
  [TABLE_SORT_CYCLE.BI_STATES_FROM_DESCENDING]: [
    TABLE_SORT_DIRECTION.DESCENDING,
    TABLE_SORT_DIRECTION.ASCENDING
  ],
  [TABLE_SORT_CYCLE.TRI_STATES_FROM_ASCENDING]: [
    TABLE_SORT_DIRECTION.NONE,
    TABLE_SORT_DIRECTION.ASCENDING,
    TABLE_SORT_DIRECTION.DESCENDING
  ],
  [TABLE_SORT_CYCLE.TRI_STATES_FROM_DESCENDING]: [
    TABLE_SORT_DIRECTION.NONE,
    TABLE_SORT_DIRECTION.DESCENDING,
    TABLE_SORT_DIRECTION.ASCENDING
  ]
};
