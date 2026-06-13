<script setup lang="ts">
const props = defineProps<{
  cgpa: number | null
  percentage: number | null
}>()

const cgpaTerm = computed(() => (props.cgpa === null ? 'CGPA' : props.cgpa.toFixed(2)))
const product = computed(() =>
  props.cgpa === null ? null : (7.1 * props.cgpa).toFixed(2),
)
const result = computed(() =>
  props.percentage === null ? null : props.percentage.toFixed(2),
)
</script>

<template>
  <section class="print-plain relative overflow-hidden rounded-sm border border-brass-500/40 bg-ink-900 text-paper-50">
    <!-- ledger header bar -->
    <header class="flex items-center justify-between border-b border-brass-500/30 bg-ink-950/60 px-5 py-2.5">
      <h2 class="font-mono text-[11px] uppercase tracking-[0.3em] text-brass-300">
        Statutory Formula
      </h2>
      <span class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
        Circular No. 1883 / 2017
      </span>
    </header>

    <div class="px-5 py-6 sm:px-7">
      <!-- The formula, set like a chalkboard equation -->
      <p class="text-center font-serif text-2xl text-balance sm:text-[28px]">
        <span class="italic text-paper-200">Percentage</span>
        <span class="mx-2 text-brass-400">=</span>
        <span class="font-mono font-medium tabular-nums">7.1</span>
        <span class="mx-1.5 text-brass-400">×</span>
        <span
          class="font-mono font-medium tabular-nums transition-colors"
          :class="cgpa === null ? 'text-ink-500' : 'text-brass-300'"
        >{{ cgpaTerm }}</span>
        <span class="mx-2 text-brass-400">+</span>
        <span class="font-mono font-medium tabular-nums">11</span>
      </p>

      <!-- worked substitution, appears once data exists -->
      <transition name="reveal">
        <p
          v-if="result"
          class="mt-4 text-center font-mono text-sm tabular-nums text-paper-200/80"
        >
          = 7.1 × {{ cgpaTerm }} + 11
          = {{ product }} + 11
          = <span class="font-semibold text-brass-300">{{ result }}%</span>
        </p>
      </transition>

      <hr class="my-5 border-t border-dashed border-ink-700" />

      <p class="font-sans text-[13px] leading-relaxed text-paper-200/75 text-balance">
        Under the Choice Based Credit &amp; Grading System on a ten-point scale, the
        University of Mumbai prescribes a
        <span class="text-brass-300">single linear conversion</span> from the cumulative
        grade-point average to an equivalent percentage of marks — applied uniformly
        across all faculties and programmes.
      </p>

      <p class="mt-3 flex items-start gap-2 font-mono text-[11px] leading-relaxed text-ink-500">
        <span class="mt-px text-brass-400">※</span>
        Figures are rounded to two decimal places for display; the conversion itself is
        exact. This statement is indicative and does not replace an official transcript.
      </p>
    </div>
  </section>
</template>

<style scoped>
.reveal-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.reveal-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
</style>
