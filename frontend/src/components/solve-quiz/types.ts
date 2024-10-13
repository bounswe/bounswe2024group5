export const OPTION_LABELS = ["A", "B", "C", "D"] as const;

export type OptionLabel = keyof typeof OPTION_LABELS;