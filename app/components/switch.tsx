import {Switch} from "@headlessui/react";

interface ToggleSwitchProps {
    enabled:boolean
    setEnabled:(enabled:boolean) => void
}

export function ToggleSwitch({enabled, setEnabled}:ToggleSwitchProps) {
    return <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-fg/20' : 'bg-fg/10'} relative inline-flex h-[1.5em] w-[3em] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 ring-fg/20`}
    >
        <span
            className={`${enabled ? 'translate-x-[1.5em] bg-active/90' : 'translate-x-0 bg-fg-soft/80'}
            pointer-events-none inline-block h-[1.3em] w-[1.3em] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
    </Switch>
}
