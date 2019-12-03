<script lang="ts">
  import Page from "./Page.svelte";

  export let title: string;
  export let subtitle: string;
</script>

<Page title = {title} subtitle={subtitle} />
