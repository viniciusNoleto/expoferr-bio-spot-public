import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import { PRIMARY_COLOR_PALETTE } from '../shared/packages/constants/colors';

export const Expo = definePreset(Aura, {
  semantic: {
    primary: PRIMARY_COLOR_PALETTE,
  },
});
