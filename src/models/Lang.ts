import { types as t, Instance } from "mobx-state-tree"

export const Lang = t.enumeration("Lang", ["ru", "en", "de"])
export type Lang = Instance<typeof Lang>
