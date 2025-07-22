<template>
    <section class="intro-section">
        <div class="intro-section-content">
            <div class="name-container">
                <div>Sacha</div>
                <div>David</div>
                <div class="role">Fullstack Developer</div>
            </div>
            <p class="intro-text">
                &#x1F44B; Hi! I'm  a creative multidisciplinary <strong>&lt;developer/&gt;</strong> & <strong>designer</strong> passionate about
                building intuitive software experiences.
            </p>
        </div>
        <div class="image-container">
            <SachaCartoonArmsCrossed class="character" />
        </div>
    </section>
</template>

<script setup lang="ts">
import SachaCartoonArmsCrossed from "../SachaCartoonArmsCrossed.vue";
</script>

<style scoped lang="scss">
// @use "@sacha/theme/src/styles/_media" as *;

.intro-section {
    color: $c-font-light;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-content: start;
    gap: $space-l;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    max-width: 1300px;
    margin: 0 auto;

    @include respond-to(md) {
        grid-template-columns: 1fr;
        grid-template-rows: max-content max-content;
        justify-items: center;
        text-align: center;
    }


    .intro-section-content {
        .name-container {
            display: flex;
            flex-direction: column;
            font-size: $font-headline;
            line-height: 1;
            font-weight: bold;
            white-space: nowrap;
            font-family: $font-family-heading;

            @include respond-to(md) {
                font-size: $font-headline-s;
            }


            >div:nth-child(2) {
                letter-spacing: 0.47rem;
                margin-top: -10px;

                @include respond-to(md) {
                    font-size: $font-headline-s;
                    letter-spacing: 0.3rem;
                    margin-top: -10px;
                }
            }

            .role {
                text-transform: uppercase;
                font-size: $font-l;
                letter-spacing: 0.28rem;
                color: $c-highlight;
                text-shadow: -1px -1px 0 $c-font-dark, 1px -1px 0 $c-font-dark,
                    -1px 1px 0 $c-font-dark, 1px 1px 0 $c-font-dark;
                margin-top: $space-m;

            @include respond-to(md) {
                font-size: $font-m;
                letter-spacing: 0.15rem;
            }
            }
        }

        .intro-text {
            max-width: 400px;
            line-height: 1.5;
            margin-top: $space-l;
            font-size: $font-l;

            @include respond-to(md) {
                font-size: $font-m;
            }
        }
    }

    .image-container {
        .character {
            max-height: 650px;
            width: 100%;
        }
    }

    .show-more {
        position: absolute;
        bottom: $space-s;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>