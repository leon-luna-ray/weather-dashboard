<template>
    <div class="current-panel">
        <h2><slot name="city"></slot></h2>
        <div class="current">
            <h3><slot name="current-temp"></slot></h3>
            <div class="img-wrap"><slot name="current-icon"></slot></div>
            <ul>
                <slot name="current-desc"></slot>
            </ul>
        </div>

    </div>
</template>