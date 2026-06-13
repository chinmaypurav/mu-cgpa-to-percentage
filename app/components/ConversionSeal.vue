<script setup lang="ts">
const props = defineProps<{
  percentage: number | null
  cgpa: number | null
}>()

// Two-decimal display, but keep the exact value available for the caption.
const pctDisplay = computed(() =>
  props.percentage === null ? '— —' : props.percentage.toFixed(2),
)
const cgpaDisplay = computed(() =>
  props.cgpa === null ? '—' : props.cgpa.toFixed(2),
)
// Re-trigger the stamp animation whenever the figure changes.
const stampKey = computed(() => props.percentage?.toFixed(2) ?? 'empty')
</script>

<template>
  <figure class="relative mx-auto flex w-full max-w-xs flex-col items-center">
    <!-- Brass seal -->
    <div class="seal-ring relative grid h-60 w-60 place-items-center rounded-full p-[6px] shadow-[0_18px_40px_-12px_rgba(10,17,36,0.7)]">
      <!-- inner disc -->
      <div class="relative grid h-full w-full place-items-center rounded-full bg-ink-950 text-paper-50">
        <!-- engraved ring of text -->
        <svg viewBox="0 0 200 200" class="absolute inset-0 h-full w-full text-brass-300/80">
          <defs>
            <path id="sealArc" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
          </defs>
          <text class="fill-current" style="font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 4.5px">
            <textPath href="#sealArc" startOffset="0%">
              UNIVERSITY OF MUMBAI · CBCS · CIRCULAR 1883/2017 ·
            </textPath>
          </text>
        </svg>

        <!-- dotted inner rule -->
        <div class="absolute inset-5 rounded-full border border-dashed border-brass-400/40" />

        <transition name="seal" mode="out-in">
          <div :key="stampKey" class="animate-stamp flex flex-col items-center">
            <span class="font-mono text-[10px] uppercase tracking-[0.32em] text-brass-300/80">Percentage</span>
            <div class="flex items-start font-mono font-semibold leading-none text-paper-50">
              <span class="text-5xl tabular-nums">{{ pctDisplay }}</span>
              <span class="mt-1 ml-0.5 text-xl text-brass-300">%</span>
            </div>
            <span class="mt-2 font-serif text-xs italic text-paper-200/70">
              CGPA {{ cgpaDisplay }}
            </span>
          </div>
        </transition>
      </div>
    </div>

    <figcaption class="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-ink-500">
      Conversion Seal · 7.1 × CGPA + 11
    </figcaption>
  </figure>
</template>

<style scoped>
.seal-enter-active,
.seal-leave-active {
  transition: opacity 0.18s ease;
}
.seal-enter-from,
.seal-leave-to {
  opacity: 0;
}
</style>
