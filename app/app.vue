<script setup lang="ts">
const {
  semesterCount,
  activeSemesters,
  setSemesterCount,
  normalizeSemester,
  reset,
  semesterResults,
  countedSemesters,
  totalMarks,
  obtainedMarks,
  cgpa,
  percentage,
  hasData,
} = useCgpa()

const cgpaDisplay = computed(() => (cgpa.value === null ? '—' : cgpa.value.toFixed(2)))
const pctDisplay = computed(() =>
  percentage.value === null ? '—' : percentage.value.toFixed(2),
)
const marksDisplay = computed(() =>
  obtainedMarks.value === null || totalMarks.value === null
    ? '—'
    : `${obtainedMarks.value.toFixed(2)} / ${totalMarks.value.toFixed(0)}`,
)

const today = new Date().toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

function doPrint() {
  window.print()
}
</script>

<template>
  <div class="cover-stock min-h-screen text-paper-50">
    <!-- ───────── Print-only official statement ───────── -->
    <div class="print-only text-black">
      <p class="font-mono text-[10px] uppercase tracking-[0.3em]">University of Mumbai</p>
      <h1 class="font-serif text-2xl font-semibold">Statement of CGPA → Percentage Conversion</h1>
      <p class="mt-1 font-mono text-[11px]">
        Issued {{ today }} · Per Circular No. 1883 of 2017 (CBCS, 10-point scale) ·
        {{ semesterCount }}-semester programme
      </p>
      <hr class="my-4 border-black" />
      <p class="font-serif text-lg">
        Overall CGPA: <strong>{{ cgpaDisplay }}</strong> / 10 ·
        Equivalent Percentage of Marks: <strong>{{ pctDisplay }}%</strong>
      </p>
      <p class="mt-1 font-mono text-sm">Conversion: Percentage = 7.1 × {{ cgpaDisplay }} + 11 = {{ pctDisplay }}%</p>
      <p class="mt-4 font-mono text-[10px]">
        Indicative statement only; does not replace an official transcript.
      </p>
    </div>

    <!-- ───────── Masthead ───────── -->
    <header class="no-print border-b border-ink-700/60">
      <div class="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-5 py-7 sm:px-8">
        <div class="flex items-center gap-4">
          <!-- crest mark -->
          <div class="seal-ring grid h-12 w-12 shrink-0 place-items-center rounded-full p-[3px]">
            <div class="grid h-full w-full place-items-center rounded-full bg-ink-950">
              <span class="font-serif text-lg font-semibold text-brass-300">मुं</span>
            </div>
          </div>
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.34em] text-brass-300/90">
              University of Mumbai · Examination Section
            </p>
            <h1 class="font-serif text-2xl font-semibold leading-tight text-paper-50 sm:text-[28px]">
              CGPA → Percentage Converter
            </h1>
          </div>
        </div>

        <p class="max-w-xs font-sans text-[13px] leading-relaxed text-paper-200/65">
          Enter your CGPA per semester to read the equivalent percentage under
          <span class="text-brass-300">Circular&nbsp;1883/2017</span>.
        </p>
      </div>
    </header>

    <!-- ───────── Toolbar ───────── -->
    <div class="no-print border-b border-ink-800/70 bg-ink-950/40">
      <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <!-- 6 / 8 semester toggle -->
        <div class="flex items-center gap-3">
          <span class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">Programme length</span>
          <div class="inline-flex rounded-sm border border-ink-700 bg-ink-900 p-0.5">
            <button
              v-for="n in ([6, 8] as const)"
              :key="n"
              type="button"
              class="rounded-[3px] px-3.5 py-1 font-mono text-xs font-medium tracking-wide transition"
              :class="
                semesterCount === n
                  ? 'bg-brass-400 text-ink-950 shadow-sm'
                  : 'text-paper-200/70 hover:text-paper-50'
              "
              @click="setSemesterCount(n)"
            >
              {{ n }} sem
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-sm border border-ink-700 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-200/80 transition hover:border-stamp-500/60 hover:text-stamp-500"
            @click="reset"
          >
            Reset
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-sm bg-brass-400 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-950 transition hover:bg-brass-300"
            @click="doPrint"
          >
            <svg viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 6V2h8v4M4 12H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1M4 10h8v4H4z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Print statement
          </button>
        </div>
      </div>
    </div>

    <!-- ───────── Body ───────── -->
    <main class="mx-auto grid max-w-5xl items-start gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_20rem]">
      <!-- Left: per-semester ledger + formula -->
      <div class="space-y-6">
        <SemesterLedger
          :semesters="activeSemesters"
          :results="semesterResults"
          @normalize="normalizeSemester"
        />
        <FormulaPanel class="no-print" :cgpa="cgpa" :percentage="percentage" />
      </div>

      <!-- Right: overall conversion seal -->
      <aside class="no-print lg:sticky lg:top-6 lg:self-start">
        <div class="rounded-sm border border-brass-500/30 bg-ink-900/50 p-6">
          <ConversionSeal :percentage="percentage" :cgpa="cgpa" />

          <dl class="mt-6 grid grid-cols-2 gap-3 border-t border-ink-700/70 pt-4 text-center">
            <div>
              <dt class="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-500">Semesters</dt>
              <dd class="font-mono text-lg font-semibold tabular-nums text-paper-100">{{ countedSemesters || '—' }}</dd>
            </div>
            <div>
              <dt class="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-500">Overall CGPA</dt>
              <dd class="font-mono text-lg font-semibold tabular-nums text-paper-100">{{ cgpaDisplay }}</dd>
            </div>
            <div class="col-span-2 border-t border-ink-700/40 pt-3">
              <dt class="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-500">Obtained / Total marks</dt>
              <dd class="font-mono text-lg font-semibold tabular-nums text-brass-300">{{ marksDisplay }}</dd>
            </div>
          </dl>

          <p v-if="!hasData" class="mt-4 text-center font-serif text-xs italic text-ink-500">
            Enter a CGPA to draw the seal.
          </p>
        </div>
      </aside>
    </main>

    <!-- ───────── Colophon ───────── -->
    <footer class="no-print border-t border-ink-800/70">
      <div class="mx-auto flex max-w-5xl flex-wrap items-start justify-between gap-3 px-5 py-6 sm:px-8">
        <p class="max-w-3xl font-mono text-[10px] leading-relaxed tracking-[0.08em] text-ink-500">
          Conversion per University of Mumbai Circular No. 1883 of 2017 · ten-point CBCS grading system ·
          Percentage = 7.1 × CGPA + 11 · overall CGPA is the mean of the entered semester CGPAs.
          Unofficial worksheet — verify against your transcript.
        </p>
        <a
          href="https://github.com/chinmaypurav/mu-cgpa-to-percentage"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500 transition hover:text-brass-300"
        >
          <svg viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          View source
        </a>
      </div>
    </footer>
  </div>
</template>
