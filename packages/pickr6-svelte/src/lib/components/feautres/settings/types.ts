import type { Icon as IconType } from '@lucide/svelte/icons';

export type SettingsCardRequiredProps = {
	title: string;
	icon: typeof IconType;
};
