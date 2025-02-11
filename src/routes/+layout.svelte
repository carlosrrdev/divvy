<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="w-full min-h-dvh flex flex-col bg-slate-100 dark:bg-slate-900/50">
  <header class="p-6">
    <nav class="flex justify-between items-center container mx-auto">
      <a href="/">divvy</a>
      <a href="/login">Login</a>
    </nav>
  </header>
  <main class="flex-1 flex flex-col p-6">
    {@render children()}
  </main>
  <footer class="p-6">
    <div class="text-center container mx-auto">
      <small>Copyright &copy; 2025 - Carlos R. Rodriguez</small>
    </div>
  </footer>
</div>
