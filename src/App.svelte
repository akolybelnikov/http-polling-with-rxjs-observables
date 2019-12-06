<script lang="ts">
  import Page from "./pages/Page.svelte";

  export let title: string;
  export let subtitle: string;
</script>

<Page {title} {subtitle} />
