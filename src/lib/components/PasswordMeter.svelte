<script lang="ts">
    import Progress from "./ui/progress/progress.svelte";
    import {passwordStrength} from 'check-password-strength'

//    const score: number[] = [0, 25, 50, 75, 100];
    export let password: string;

//"Too weak", "Weak", "Medium", "Strong"

    
    $: score = (function () {
        const level = passwordStrength(password);
        return level.id / 4 * 100;
    })()
    
    




</script>

<Progress value={score} color=""/>