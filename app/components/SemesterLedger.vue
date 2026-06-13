<script setup lang="ts">
import { MAX_CGPA, MIN_CGPA } from '~/composables/useCgpa'
import type { Semester } from '~/composables/useCgpa'

interface RowResult {
  id: number
  cgpa: number | null
  percent: number | null
}

const props = defineProps<{
  semesters: Semester[]
  results: RowResult[]
}>()

const emit = defineEmits<{
  normalize: [sem: Semester]
}>()

function percentFor(id: number): number | null {
  return props.results.find((r) => r.id === id)?.percent ?? null
}
</script>

<template>
  <article class="print-plain paper-laid overflow-hidden rounded-sm ring-1 ring-ink-900/15 shadow-[0_2px_0_0_rgba(16,26,54,0.08),0_18px_40px_-28px_rgba(10,17,36,0.55)]">
    <!-- ledger header -->
    <header class="flex items-center justify-between gap-3 border-b border-ink-900/20 bg-ink-950 px-4 py-3 text-paper-50 sm:px-6">
      <div>
        <h2 class="font-serif text-lg font-semibold leading-tight">Semester-wise Conversion</h2>
        <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-brass-300/80">
          CGPA → Percentage per semester
        </p>
      </div>
      <span class="rounded-sm border border-brass-500/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-300">
        {{ semesters.length }} semesters
      </span>
    </header>

    <!-- column captions -->
    <div class="grid grid-cols-[1.75rem_1fr_6rem_6rem] items-center gap-2 border-b border-ink-900/15 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-500 sm:px-6">
      <span>#</span>
      <span>Semester</span>
      <span class="text-center">CGPA</span>
      <span class="text-right">Percentage</span>
    </div>

    <!-- rows -->
    <ul>
      <li
        v-for="(sem, i) in semesters"
        :key="sem.id"
        class="grid grid-cols-[1.75rem_1fr_6rem_6rem] items-center gap-2 border-b border-dashed border-ink-900/12 px-4 py-2.5 last:border-b-0 sm:px-6"
      >
        <span class="grid h-6 w-6 place-items-center rounded-sm bg-ink-900 font-mono text-[11px] font-semibold text-paper-50">
          {{ i + 1 }}
        </span>

        <span class="font-serif text-[15px] font-medium text-ink-900">{{ sem.label }}</span>

        <!-- CGPA input -->
        <div class="flex items-center justify-center gap-1">
          <input
            v-model.number="sem.cgpa"
            type="number"
            inputmode="decimal"
            :min="MIN_CGPA"
            :max="MAX_CGPA"
            step="0.01"
            placeholder="—"
            :aria-label="`CGPA for ${sem.label}`"
            class="print-flat-input w-16 rounded-[3px] bg-paper-100/70 px-1.5 py-1 text-center text-sm text-ink-900 placeholder:text-ink-500/40 focus:bg-paper-200 focus:outline-none focus:ring-1 focus:ring-brass-500/60"
            @blur="emit('normalize', sem)"
          />
          <span class="font-mono text-[11px] text-ink-500">/10</span>
        </div>

        <!-- derived percentage -->
        <span
          class="text-right font-mono text-sm font-semibold tabular-nums"
          :class="percentFor(sem.id) === null ? 'text-ink-500' : 'text-brass-600'"
        >
          {{ percentFor(sem.id) === null ? '—' : percentFor(sem.id)!.toFixed(2) + '%' }}
        </span>
      </li>
    </ul>
  </article>
</template>
