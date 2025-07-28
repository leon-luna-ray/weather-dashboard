<template>
    <header>
        <div class="container text-white flex items-center justify-between py-[1.25rem]">
            <div class="flex flex-col text-center">
                <div class="flex items-center gap-x-[3px]">
                    <IconCloud class="w-6 h-6" />
                    <p class="font-garamond font-[600] text-[2rem] leading-[100%]">Cloud9</p>
                </div>
                <p class="label-text">Weather App</p>
            </div>
            <button aria-label="Toggle menu" @click="ui.isMenuOpen = !ui.isMenuOpen">
                <IconClose v-if="ui.isMenuOpen" class="w-8 h-8" />
                <IconMenu v-else class="w-8 h-8" />
            </button>
        </div>
    </header>
</template>
<script setup>
import { useUiStore } from '@/stores/ui';

import IconCloud from '@/components/icons/IconCloud.vue';
import IconMenu from '@/components/icons/IconMenu.vue';
import IconClose from '@/components/icons/IconClose.vue';

const ui = useUiStore();
</script>