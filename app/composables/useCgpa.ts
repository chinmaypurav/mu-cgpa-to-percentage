import { computed, reactive, ref } from 'vue'

/**
 * University of Mumbai — CGPA → Percentage
 *
 * Circular No. 1883 of 2017 (Choice Based Credit System, 10-point scale):
 *   Percentage of Marks = 7.1 × CGPA + 11
 *
 * Enter a CGPA (SGPA) per semester — 6 or 8 semesters — and read the
 * equivalent percentage for each, plus an overall figure. The conversion is
 * linear, so the overall percentage equals the conversion of the mean CGPA.
 */

export const MIN_CGPA = 0
export const MAX_CGPA = 10

/** The statutory conversion. */
export function toPercentage(cgpa: number): number {
  return 7.1 * cgpa + 11
}

/** Clamp arbitrary input to a valid CGPA, or null when unusable. */
export function clampCgpa(value: unknown): number | null {
  if (value === '' || value === null || value === undefined) return null
  const n = Number(value)
  if (Number.isNaN(n)) return null
  return Math.min(MAX_CGPA, Math.max(MIN_CGPA, n))
}

export interface Semester {
  id: number
  label: string
  /** Raw CGPA entry for this semester (clamped on derivation/blur). */
  cgpa: number | null
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

let uid = 0
const nextId = () => ++uid

function makeSemester(index: number): Semester {
  return { id: nextId(), label: `Semester ${ROMAN[index] ?? index + 1}`, cgpa: null }
}

export function useCgpa() {
  const semesterCount = ref<6 | 8>(6)

  const semesters = reactive<Semester[]>(
    Array.from({ length: 8 }, (_, i) => makeSemester(i)),
  )

  const activeSemesters = computed(() => semesters.slice(0, semesterCount.value))

  function setSemesterCount(count: 6 | 8) {
    semesterCount.value = count
  }

  /** Reconcile a semester's field to a clamped value (used on blur). */
  function normalizeSemester(sem: Semester) {
    sem.cgpa = clampCgpa(sem.cgpa)
  }

  function reset() {
    semesters.forEach((s) => {
      s.cgpa = null
    })
  }

  /** Per-semester clamped CGPA and its percentage. */
  const semesterResults = computed(() =>
    activeSemesters.value.map((sem) => {
      const value = clampCgpa(sem.cgpa)
      return {
        id: sem.id,
        cgpa: value,
        percent: value === null ? null : toPercentage(value),
      }
    }),
  )

  const enteredCgpas = computed(() =>
    semesterResults.value
      .map((r) => r.cgpa)
      .filter((c): c is number => c !== null),
  )

  const countedSemesters = computed(() => enteredCgpas.value.length)

  /** Overall CGPA — mean of the entered semester CGPAs. */
  const cgpa = computed<number | null>(() => {
    const xs = enteredCgpas.value
    if (xs.length === 0) return null
    return xs.reduce((sum, c) => sum + c, 0) / xs.length
  })

  /** Overall equivalent percentage — Circular 1883/2017. */
  const percentage = computed<number | null>(() =>
    cgpa.value === null ? null : toPercentage(cgpa.value),
  )

  const hasData = computed(() => cgpa.value !== null)

  return {
    // state
    semesters,
    semesterCount,
    activeSemesters,
    // actions
    setSemesterCount,
    normalizeSemester,
    reset,
    // derived
    semesterResults,
    countedSemesters,
    cgpa,
    percentage,
    hasData,
  }
}
